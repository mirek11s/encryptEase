import React, { useRef, useState } from "react";
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
import {
  chooseOptions,
  uploadOptions,
  cancelOptions,
} from "layouts/layoutConstants";
import "./custom-file-upload.css";

interface CustomFile extends File {
  objectURL?: string;
}

const CustomFileUpload: React.FC = () => {
  const toast = useRef<Toast>(null);
  const [totalSize, setTotalSize] = useState(0);
  const fileUploadRef = useRef<FileUpload>(null);

  const onTemplateSelect = (e: FileUploadSelectEvent) => {
    const files = e.files as CustomFile[];
    const allowedExtensions = [
      ".txt",
      ".pdf",
      ".doc",
      ".docx",
      ".odt",
      ".pages",
    ];

    let newTotalSize = totalSize;

    for (let i = 0; i < files.length; i++) {
      const fileExtension = files[i].name.slice(
        ((files[i].name.lastIndexOf(".") - 1) >>> 0) + 2
      );
      if (!allowedExtensions.includes("." + fileExtension)) {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: `${files[i].name} is not a supported file type`,
        });
        return;
      }
      newTotalSize += files[i].size || 0;
    }
    setTotalSize(newTotalSize);
  };

  const onTemplateUpload = (e: FileUploadUploadEvent) => {
    let _totalSize = 0;

    e.files.forEach((file) => {
      _totalSize += file.size || 0;
    });

    setTotalSize(_totalSize);
    toast.current?.show({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded",
    });
  };

  const onTemplateRemove = (file: File, callback: () => void) => {
    setTotalSize(totalSize - file.size);
    callback();
  };

  const onTemplateClear = () => {
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
          <span>{formatedValue} / 1 MB</span>
          <ProgressBar
            value={value}
            showValue={false}
            style={{ width: "10rem", height: "12px" }}
          ></ProgressBar>
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
          className="p-button-outlined p-button-rounded p-button-danger ml-auto"
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
          Drag and Drop Files Here
        </span>
      </div>
    );
  };

  return (
    <>
      <Toast ref={toast} />

      <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
      <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
      <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

      <FileUpload
        ref={fileUploadRef}
        name="demo[]"
        url="/api/upload"
        multiple
        accept=".txt,.pdf,.doc,.docx,.odt,.pages"
        maxFileSize={10000000} // 10 MB
        onUpload={onTemplateUpload}
        onSelect={onTemplateSelect}
        onError={onTemplateClear}
        onClear={onTemplateClear}
        headerTemplate={headerTemplate}
        itemTemplate={itemTemplate}
        emptyTemplate={emptyTemplate}
        chooseOptions={chooseOptions}
        uploadOptions={uploadOptions}
        cancelOptions={cancelOptions}
      />
    </>
  );
};

export default CustomFileUpload;
