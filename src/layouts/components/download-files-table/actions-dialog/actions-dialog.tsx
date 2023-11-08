import { useState } from "react";

// primereact components
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import { FileData } from "layouts/layout.types";
import "./actions-dialog.css";

interface ActionsDialogProps {
  displayModal: boolean;
  setDisplayModal: (displayModal: boolean) => void;
  selectedFile: FileData | null;
}

const ActionsDialog: React.FC<ActionsDialogProps> = ({
  displayModal,
  setDisplayModal,
  selectedFile,
}) => {
  const [privateKey, setPrivateKey] = useState("");

  const handleFileDownload = () => {
    return;
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
            <label htmlFor="privateKey" className="actions-key-label">
              Private Key:
            </label>
            <InputText
              id="privateKey"
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
              placeholder="Enter your 256-bit key"
            />
          </div>
        </div>
      )}
    </Dialog>
  );
};

export default ActionsDialog;
