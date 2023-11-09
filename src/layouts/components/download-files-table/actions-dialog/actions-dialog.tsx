import { useState } from "react";
import { useTranslation } from "react-i18next";

// primereact components
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import { FileData } from "layouts/layout.types";
import { toastDisplay } from "layouts/layoutUtils";
import "./actions-dialog.css";

interface ActionsDialogProps {
  displayModal: boolean;
  setDisplayModal: (displayModal: boolean) => void;
  selectedFile: FileData | null;
  userId: string;
  toast: React.RefObject<Toast>;
}

const ActionsDialog: React.FC<ActionsDialogProps> = ({
  displayModal,
  setDisplayModal,
  selectedFile,
  userId,
  toast,
}) => {
  const { t } = useTranslation("translation");

  const [encryptionKey, setEncryptionkey] = useState("");

  const cleanUp = () => {
    setEncryptionkey("");
    setDisplayModal(false);
  };

  /**
   * This function sends a POST request to the function's endpoint with the
   * necessary data. It then receives the file as a blob, creates a URL for it,
   * and triggers the download automatically. After the download link is clicked,
   * it revokes the URL to free up resources and removes the anchor element from
   * the document.
   */
  const handleFileDownload = async () => {
    if (encryptionKey && userId && selectedFile) {
      try {
        const response = await fetch(
          "https://us-central1-encryptease.cloudfunctions.net/downloadUserFiles",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: {
                encryptionKey,
                fileId: selectedFile.fileId,
                userId,
              },
            }),
          }
        );

        if (!response.ok) {
          toastDisplay(
            toast,
            `Server error: ${response.status}`,
            "error",
            "Error"
          );
        }

        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = selectedFile.fileName || "download";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(downloadUrl);
        document.body.removeChild(a);

        cleanUp();
      } catch (error) {
        toastDisplay(toast, t("error-fetching-files"), "error", "Error");
      }
    }
  };

  const dialogFooter = (
    <div className="flex justify-content-between">
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-outlined p-button-help actions-footer-buttons"
        onClick={() => setDisplayModal(false)}
      />
      <Button
        label="Download"
        icon="pi pi-download"
        onClick={handleFileDownload}
        className="p-button-help actions-footer-buttons"
      />
    </div>
  );

  return (
    <Dialog
      header="File Details"
      visible={displayModal}
      style={{ width: "50vw" }}
      footer={dialogFooter}
      onHide={() => setDisplayModal(false)}
    >
      {selectedFile && (
        <div>
          <p className="actions-file-info">
            <strong>File Name:</strong> {selectedFile.fileName}
          </p>
          <div className="field flex flex-column">
            <label htmlFor="encryptionKey" className="actions-key-label">
              Private Key:
            </label>
            <InputText
              id="encryptionKey"
              value={encryptionKey}
              onChange={(e) => setEncryptionkey(e.target.value)}
              placeholder="Enter your 32-byte hex, 256-bit encryption key"
            />
          </div>
        </div>
      )}
    </Dialog>
  );
};

export default ActionsDialog;
