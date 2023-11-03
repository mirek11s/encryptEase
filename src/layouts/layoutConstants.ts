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
  { label: "AES", value: "AES" },
  { label: "Camellia", value: "camellia" },
  { label: "EncryptEase", value: "encryptEase" },
  { label: "Serpent", value: "serpent" },
  { label: "Twofish", value: "twofish" },
];
