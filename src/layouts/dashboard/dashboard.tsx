// src/layouts/dashboard/dashboard.tsx
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// primereact components
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { ToggleButton } from "primereact/togglebutton";

// layouts
import CustomFileUpload from "layouts/components/custom-file-uploader/custom-file-upload";
import Navbar from "layouts/components/navbar/navbar";

import { useAuth } from "utils/use-auth";
import { useIsMobile } from "utils/use-is-mobile";
// import { UploadedFilesTable } from 'layouts/components/uploaded-files-table/uploaded-files-table';

import { algorithmOptions } from "layouts/layoutConstants";

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const isMobile = useIsMobile();

  const [checked, setChecked] = useState(false);
  const [selectedAlgo, setSelectedAlgo] = useState("");
  const [encryptionKey, setEncryptionKey] = useState("");

  return (
    <div className="container-fluid">
      <Navbar />
      <div className="container mt-5">
        <h2 className="mb-4">{t("dashboard-header")}</h2>
        <div className="row mb-3">
          <div
            className={`${
              isMobile ? "col-12" : "col-10"
            } flex justify-content-between`}
          >
            <Dropdown
              options={algorithmOptions}
              value={selectedAlgo}
              onChange={(e: DropdownChangeEvent) => setSelectedAlgo(e.value)}
              placeholder={t("dropdown--encrypt-placeholder")}
              className="w-full md:w-14rem"
            />

            <InputText
              id="userEncryptKey"
              placeholder={t("encryption-key-placeholder")}
              className="ml-2 w-full"
              value={encryptionKey}
              onChange={(e) => setEncryptionKey(e.target.value)}
            />
          </div>
          <div
            className={`${
              isMobile ? "col-12" : "col-2"
            } flex justify-content-end`}
          >
            <ToggleButton
              checked={checked}
              onChange={(e) => setChecked(e.value)}
              className="w-full"
            />
          </div>
        </div>

        <CustomFileUpload
          t={t}
          selectedAlgo={selectedAlgo}
          encryptionKey={encryptionKey}
          user={user}
        />

        {/* <UploadedFilesTable /> */}
      </div>
    </div>
  );
};

export default Dashboard;
