import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// primereact components
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { ToggleButton, ToggleButtonChangeEvent } from "primereact/togglebutton";

// layouts
import CustomFileUpload from "layouts/components/custom-file-uploader/custom-file-upload";
import DownloadFilesTable from "layouts/components/download-files-table/download-files-table";
import Navbar from "layouts/components/navbar/navbar";

import { useAuth } from "utils/use-auth";
import { useIsMobile } from "utils/use-is-mobile";

import { algorithmOptions } from "layouts/layoutConstants";

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const isMobile = useIsMobile();

  const [isUploadOn, setIsUploadOn] = useState(true);
  const [selectedAlgo, setSelectedAlgo] = useState("");
  const [encryptionKey, setEncryptionKey] = useState("");

  const handleChangeDashboard = (e: ToggleButtonChangeEvent) => {
    setIsUploadOn(e.value);
    setSelectedAlgo("");
    setEncryptionKey("");
  };

  const TermsLink = useMemo(() => {
    return (
      <div className="term-condition">
        <Link to="/terms">{t("tos")}</Link>
      </div>
    );
  }, [t]);

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
              onChange={(e) => setSelectedAlgo(e.value)}
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
              checked={isUploadOn}
              onChange={handleChangeDashboard}
              className={`w-full ${
                isUploadOn ? "p-button-info" : "p-button-help"
              }`}
              onLabel={t("upload-encrypt")}
              offLabel={t("download-decrypt")}
            />
          </div>
          <small>{t("note-msg-dashboard")}</small>
        </div>

        {isUploadOn ? (
          <>
            <CustomFileUpload
              t={t}
              selectedAlgo={selectedAlgo}
              encryptionKey={encryptionKey}
              user={user}
            />
            {TermsLink}
          </>
        ) : (
          <>
            <DownloadFilesTable t={t} user={user} />
            {TermsLink}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
