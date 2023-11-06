import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { TFunction } from "i18next";

// primereact components
import { Toast } from "primereact/toast";
import {
  FileUpload,
  FileUploadHeaderTemplateOptions,
  FileUploadSelectEvent,
} from "primereact/fileupload";

import { ProgressSpinner } from "primereact/progressspinner";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";

// firebase
import { User } from "firebase/auth";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../../firebase";

import {
  chooseOptions,
  uploadOptions,
  cancelOptions,
  allowedExtensions,
} from "layouts/layoutConstants";
import { toastDisplay } from "layouts/layoutUtils";
import { CustomFile } from "./upload.types";
import "./custom-file-upload.css";

interface CustomFileUploadProps {
  t: TFunction<"translation", undefined>;
  selectedAlgo: string | null;
  encryptionKey: string;
  user: User | null;
}

const CustomFileUpload: React.FC<CustomFileUploadProps> = ({
  t,
  selectedAlgo,
  encryptionKey,
  user,
}) => {
  const toast = useRef<Toast>(null);
  const [totalSize, setTotalSize] = useState(0);
  const fileUploadRef = useRef<FileUpload>(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const uploadUserFiles = httpsCallable(functions, "uploadUserFiles");

  const onSelect = (e: FileUploadSelectEvent) => {
    const files = e.files as CustomFile[];

    let newTotalSize = totalSize;

    for (let i = 0; i < files.length; i++) {
      const fileExtension = files[i].name.slice(
        ((files[i].name.lastIndexOf(".") - 1) >>> 0) + 2
      );
      if (!allowedExtensions.includes("." + fileExtension)) {
        const toastDetails = `${files[i].name} ${t(
          "error-file-not-supported"
        )}`;
        return toastDisplay(toast, toastDetails, "error", "Error");
      }
      newTotalSize += files[i].size || 0;
    }

    // 10MB in bytes
    if (newTotalSize > 10000000) {
      toastDisplay(toast, t("error-file-size-exceeded"), "error", "Error");
      if (fileUploadRef.current) {
        fileUploadRef.current.clear();
      }
      setTotalSize(0);
      return;
    }

    setTotalSize(newTotalSize);
  };

  const onTemplateRemove = (file: File, callback: () => void) => {
    setTotalSize(totalSize - file.size);
    callback();
  };

  const handleClear = () => {
    setTotalSize(0);
  };

  const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;
    const maxFileSize = 10000000; // 10 MB
    const value = (totalSize / maxFileSize) * 100; // Calculate percentage
    const formatedValue =
      fileUploadRef && fileUploadRef.current
        ? fileUploadRef.current.formatSize(totalSize)
        : "0 B";

    return (
      <div
        className={className}
        style={{
          backgroundColor: "transparent",
          display: "d-flex",
          alignItems: "center",
        }}
      >
        {chooseButton}
        {isFileUploaded ? (
          <ProgressSpinner
            style={{ width: "40px", height: "40px", margin: 0 }}
            strokeWidth="4"
          />
        ) : (
          uploadButton
        )}
        {isFileUploaded ? (
          <ProgressSpinner
            style={{ width: "40px", height: "40px", margin: 0 }}
            strokeWidth="4"
          />
        ) : (
          cancelButton
        )}
        <div className="d-flex align-items-center gap-3 ml-auto">
          <span>{formatedValue} / 10 MB</span>
          <ProgressBar
            value={value}
            showValue={false}
            style={{ width: "10rem", height: "12px" }}
          />
        </div>
      </div>
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const itemTemplate = (inFile: object, props: any) => {
    const file = inFile as CustomFile;

    return (
      <div className="d-flex align-items-center flex-wrap">
        <div className="d-flex align-items-center" style={{ width: "40%" }}>
          <i
            className="pi pi-file"
            style={{
              fontSize: "2rem",
            }}
          />
          <span className="flex flex-column text-left ml-3 file-name-container">
            <span className="file-name">{file.name}</span>
            <small>{new Date().toLocaleDateString()}</small>
          </span>
        </div>
        <Tag
          value={props.formatSize}
          severity="warning"
          className="px-3 py-2 mx-3"
        />
        {isFileUploaded ? (
          <ProgressSpinner
            style={{ width: "40px", height: "40px", margin: 0 }}
            className="ml-auto"
            strokeWidth="4"
          />
        ) : (
          <Button
            type="button"
            icon="pi pi-times"
            className="p-button-outlined p-button-rounded custom-upload-btn p-button-danger ml-auto"
            onClick={() => onTemplateRemove(file, props.onRemove)}
          />
        )}
      </div>
    );
  };

  const emptyTemplate = () => {
    return (
      <div className="d-flex align-items-center flex-column">
        <i
          className="pi pi-file mt-3 p-5"
          style={{
            fontSize: "5em",
            borderRadius: "50%",
            backgroundColor: "var(--surface-b)",
            color: "var(--surface-d)",
          }}
        />
        <span
          style={{ fontSize: "1.2em", color: "var(--text-color-secondary)" }}
          className="my-5"
        >
          {t("dropzone-placeholder")}
        </span>
      </div>
    );
  };

  const uploadHandler = async (event: { files: File[] }) => {
    setIsFileUploaded(true);
    try {
      if (!selectedAlgo) {
        return toastDisplay(toast, t("algo-not-selected"), "error", "Error");
      }

      if (!encryptionKey) {
        return toastDisplay(
          toast,
          "Ecryption key not provided.",
          "error",
          "Error"
        );
      }

      // Prepare file data
      const filesPromises = event.files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        return {
          name: file.name,
          type: file.type,
          data: Array.from(new Uint8Array(arrayBuffer)),
        };
      });

      const filesData = await Promise.all(filesPromises);

      // Prepare the request body
      const requestBody = {
        files: filesData,
        algorithm: selectedAlgo,
        userId: user?.uid,
        encryptionKey: encryptionKey,
      };

      await uploadUserFiles({ ...requestBody });

      fileUploadRef.current?.clear(); // This will clear the files from the component
      handleClear(); // This resets the total size back to 0

      toastDisplay(toast, t("success-upload"), "success", "Success");
    } catch (error) {
      toastDisplay(toast, t("error-upload"), "error", "Error");
    } finally {
      setIsFileUploaded(false);
    }
  };

  return (
    <>
      <Toast ref={toast} />

      <FileUpload
        ref={fileUploadRef}
        name="files[]"
        url="/api/upload"
        multiple
        accept=".txt,.pdf,.doc,.docx,.odt,.pages"
        maxFileSize={10000000} // 10 MB
        onSelect={onSelect}
        onError={handleClear}
        onClear={handleClear}
        headerTemplate={headerTemplate}
        itemTemplate={itemTemplate}
        emptyTemplate={emptyTemplate}
        chooseOptions={chooseOptions}
        uploadOptions={uploadOptions}
        cancelOptions={cancelOptions}
        customUpload={true}
        uploadHandler={uploadHandler}
      />
      <div className="term-condition">
        <Link to="/terms">{t("tos")}</Link>
      </div>
    </>
  );
};

export default CustomFileUpload;
