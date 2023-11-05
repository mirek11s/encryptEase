export const PROJECT_NAME = "EncryptEase";

export const chooseOptions = {
  icon: "pi pi-fw pi-images",
  iconOnly: true,
  className: "custom-choose-btn p-button-rounded p-button-outlined",
};

export const uploadOptions = {
  icon: "pi pi-fw pi-cloud-upload",
  iconOnly: true,
  className:
    "custom-upload-btn p-button-success p-button-rounded p-button-outlined",
};

export const cancelOptions = {
  icon: "pi pi-fw pi-times",
  iconOnly: true,
  className:
    "custom-cancel-btn p-button-danger p-button-rounded p-button-outlined",
};

export const allowedExtensions = [
  ".txt",
  ".pdf",
  ".doc",
  ".docx",
  ".odt",
  ".pages",
];

export const algorithmOptions = [
  { label: "AES-256-CBC", value: "aes-256-cbc" },
  { label: "AES-192-CBC", value: "aes-192-cbc" },
  { label: "AES-128-CBC", value: "aes-128-cbc" },
  { label: "Camellia-256-CBC", value: "camellia-256-cbc" },
  { label: "Camellia-192-CBC", value: "camellia-192-cbc" },
  { label: "Camellia-128-CBC", value: "camellia-128-cbc" },
  { label: "EncryptEase", value: "encryptEase" },
  { label: "Serpent", value: "serpent" },
  { label: "Twofish", value: "twofish" },
  // Note: Serpent and Twofish are not natively supported by Node.js's crypto module
];
