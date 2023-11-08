import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import { TFunction } from "i18next";

// firebase
import { User } from "firebase/auth";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../../firebase";

// primereact components
import { Toast } from "primereact/toast";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { ProgressBar } from "primereact/progressbar";

import { FileData, FirebaseFileDataResponse } from "layouts/layout.types";
import { toastDisplay } from "layouts/layoutUtils";
import ActionsDialog from "./actions-dialog/actions-dialog";
import "./download-files-table.css";

interface DownloadFilesTableProps {
  t: TFunction<"translation", undefined>;
  user: User | null;
}

const DownloadFilesTable: React.FC<DownloadFilesTableProps> = ({ t, user }) => {
  const toast = useRef<Toast>(null);

  const [files, setFiles] = useState<FileData[]>();
  const [isFilesLoading, setIsFilesLoading] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);

  const { uid: userId } = user || {};

  const getUserFilesMetadata = httpsCallable(functions, "getUserFilesMetadata");

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        if (!userId) return;
        const response = await getUserFilesMetadata();
        const { data } = response as FirebaseFileDataResponse;

        // format the date of upload from firebase
        const filesDataWithFormattedDate = data.filesMetadata.map((file) => ({
          ...file,
          dateOfUpload: moment(
            new Date(file.dateOfUpload._seconds * 1000)
          ).format("HH:mm, DD/MM/YY"),
        }));

        setFiles(filesDataWithFormattedDate);
      } catch (error) {
        toastDisplay(toast, t("error-fetching-files"), "error", "Error");
      } finally {
        setIsFilesLoading(false);
      }
    };

    fetchFiles();
  }, [userId]);

  const handleToggleModal = (file: FileData) => {
    setSelectedFile(file);
    setDisplayModal(!displayModal);
  };

  const actionBodyTemplate = (rowData: FileData) => {
    return (
      <Button
        icon="pi pi-download"
        className="p-button-rounded p-button-help"
        style={{ borderRadius: "50%" }}
        onClick={() => handleToggleModal(rowData)}
      />
    );
  };

  const columns = [
    { field: "fileName", header: t("file-name") },
    { field: "algorithm", header: t("algorithm") },
    { field: "dateOfUpload", header: t("date-of-upload") },
    { field: "fileId", header: t("file-id") },
    { field: "actions", header: t("actions"), body: actionBodyTemplate },
  ];

  return (
    <>
      {isFilesLoading ? (
        <ProgressBar mode="indeterminate" style={{ height: "6px" }} />
      ) : (
        <DataTable value={files}>
          {columns.map((col) => (
            <Column
              key={col.header}
              field={col.field}
              header={col.header}
              body={col.body}
            />
          ))}
        </DataTable>
      )}
      <Toast ref={toast} />

      <ActionsDialog
        displayModal={displayModal}
        setDisplayModal={setDisplayModal}
        selectedFile={selectedFile}
      />
    </>
  );
};

export default DownloadFilesTable;
