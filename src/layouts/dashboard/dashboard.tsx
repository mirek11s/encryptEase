// src/layouts/dashboard/dashboard.tsx
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "layouts/components/navbar/navbar";

// primereact components
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

// custom components
import CustomFileUpload from "layouts/components/custom-file-uploader/custom-file-upload";
// import { UploadedFilesTable } from 'layouts/components/uploaded-files-table/uploaded-files-table';

import { algorithmOptions } from "layouts/layoutConstants";

const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  const [selectedAlgo, setSelectedAlgo] = useState("");

  return (
    <div className="container-fluid">
      <Navbar />
      <div className="container mt-5">
        <h2 className="mb-4">{t("dashboard-header")}</h2>
        <Dropdown
          options={algorithmOptions}
          value={selectedAlgo}
          onChange={(e: DropdownChangeEvent) => setSelectedAlgo(e.value)}
          placeholder={t("dropdown--encrypt-placeholder")}
          className="w-full md:w-14rem mb-3"
        />

        <CustomFileUpload t={t} selectedAlgo={selectedAlgo} />

        {/* <UploadedFilesTable /> */}
      </div>
    </div>
  );
};

export default Dashboard;
