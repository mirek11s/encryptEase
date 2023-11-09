export interface CustomFile extends File {
  objectURL?: string;
}

interface FirebaseDateFormat {
  id: string;
  algorithm: string;
  fileId: string;
  fileName: string;
  dateOfUpload: {
    _seconds: number;
    _nanoseconds: number;
  };
  iv: string;
}

export interface FileData {
  id: string;
  algorithm: string;
  fileId: string;
  fileName: string;
  dateOfUpload: string;
  iv: string;
}

export interface FirebaseFileDataResponse {
  data: {
    success: boolean;
    filesMetadata: FirebaseDateFormat[];
  };
}
