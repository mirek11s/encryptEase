import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

// primereact components
import { Toast } from "primereact/toast";
import {
  FileUpload,
  FileUploadHeaderTemplateOptions,
  FileUploadUploadEvent,
  FileUploadSelectEvent,
} from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { Tag } from "primereact/tag";
import { AppwriteUserResponse } from "utils/util.types";
import { TFunction } from "i18next";
import {
  chooseOptions,
  uploadOptions,
  cancelOptions,
  allowedExtensions,
} from "layouts/layoutConstants";
import { CustomFile } from "./upload.types";
import "./custom-file-upload.css";

interface CustomFileUploadProps {
  t: TFunction<"translation", undefined>;
  selectedAlgo: string | null;
  user: AppwriteUserResponse | null;
}

const CustomFileUpload: React.FC<CustomFileUploadProps> = ({
  t,
  selectedAlgo,
}) => {
  const toast = useRef<Toast>(null);
  const [totalSize, setTotalSize] = useState(0);
  const fileUploadRef = useRef<FileUpload>(null);

  const onSelect = (e: FileUploadSelectEvent) => {
    const files = e.files as CustomFile[];

    let newTotalSize = totalSize;

    for (let i = 0; i < files.length; i++) {
      const fileExtension = files[i].name.slice(
        ((files[i].name.lastIndexOf(".") - 1) >>> 0) + 2
      );
      if (!allowedExtensions.includes("." + fileExtension)) {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: `${files[i].name} ${t("error-file-not-supported")}`,
        });
        return;
      }
      newTotalSize += files[i].size || 0;
    }
    setTotalSize(newTotalSize);
  };

  const onUpload = (e: FileUploadUploadEvent) => {
    if (selectedAlgo) {
      let _totalSize = 0;

      e.files.forEach((file) => {
        _totalSize += file.size || 0;
      });

      setTotalSize(_totalSize);
      toast.current?.show({
        severity: "info",
        summary: "Success",
        detail: t("success-upload"),
      });
    } else {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: t("error-no-algorithm"),
      });
      e.files = [];
    }
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
        {uploadButton}
        {cancelButton}
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
        <Button
          type="button"
          icon="pi pi-times"
          className="p-button-outlined p-button-rounded custom-upload-btn p-button-danger ml-auto"
          onClick={() => onTemplateRemove(file, props.onRemove)}
        />
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
    try {
      const filesPromises = event.files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        return {
          name: file.name,
          type: file.type,
          data: Array.from(new Uint8Array(arrayBuffer)),
        };
      });

      // const filesData = await Promise.all(filesPromises);

      // const data = {
      //   files: filesData,
      //   encryptionKey: "mysecretkey12345",
      //   algorithm: selectedAlgo,
      //   fileName: "lulu1",
      //   userId: user?.$id,
      // };

      // try {
      //   const execution = await functions.createExecution(
      //     "6546c70c605fb007c8bf",
      //     JSON.stringify(data),
      //     false,
      //     "/uploads",
      //     "POST",
      //     { "Content-Type": "application/json" }
      //   );
      //   console.log(execution);
      // } catch (err) {
      //   console.error(err);
      // }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: t("error-upload"),
      });
    }
  };

  return (
    <>
      <Toast ref={toast} />

      <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
      <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
      <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

      <FileUpload
        ref={fileUploadRef}
        name="files[]"
        url="/api/upload"
        multiple
        accept=".txt,.pdf,.doc,.docx,.odt,.pages"
        maxFileSize={10000000} // 10 MB
        onUpload={onUpload}
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
