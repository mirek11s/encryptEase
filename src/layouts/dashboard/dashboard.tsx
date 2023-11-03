// src/layouts/dashboard/dashboard.tsx
import React from "react";
import Navbar from "layouts/components/navbar/navbar";

// primereact components
import { Dropdown } from "primereact/dropdown";

// custom components
import CustomFileUpload from "layouts/components/custom-file-uploader/custom-file-upload";
// import { UploadedFilesTable } from 'layouts/components/uploaded-files-table/uploaded-files-table';

const Dashboard: React.FC = () => {
  const algorithms = [
    { label: "AES", value: "AES" },
    { label: "Serpent", value: "Serpent" },
    // Add more algorithms as needed
  ];

  return (
    <div className="container-fluid">
      <Navbar />
      <div className="container mt-5">
        <h2 className="mb-4">Upload Dashboard</h2>
        <Dropdown
          options={algorithms}
          placeholder="Select an algorithm"
          className="mb-3"
        />

        <CustomFileUpload />

        {/* <UploadedFilesTable /> */}
      </div>
    </div>
  );
};

export default Dashboard;
