export type Algorithm =
  | "aes-256-cbc"
  | "aes-192-cbc"
  | "aes-128-cbc"
  | "camellia-256-cbc"
  | "camellia-192-cbc"
  | "camellia-128-cbc";

export interface UploadedFileProps {
  name: string;
  type: string;
  data: number[];
}
