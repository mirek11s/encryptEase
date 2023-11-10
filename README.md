# 🔐 EncryptEase: Advanced File Encryption & Management

Welcome to EncryptEase, a cutting-edge web application tailored for secure file encryption and management. Developed using React, TypeScript, and Vite, this application is integrated with Firebase Cloud Functions, Authentication, Cloud Database, and Storage to ensure a high-security user experience.

## Core Features

- **Secure User Authentication:** Register and log in with confidence to access your dedicated encryption dashboard.
- **Selective File Encryption:** Upload files and choose from three sophisticated encryption algorithms - AES, Camellia, or the unique EncryptEase Special (a custom algorithm).
- **High-Level Security:** Employ 256-Bit encryption, necessitating a private key provided by you for the encryption process.
- **Supported File Formats:** Strictly accepts .txt, .pdf, .doc, .docx, .odt, and .pages file formats to maintain consistency and security.
- **File Management and Visibility:** Effortlessly view and handle your encrypted files within a user-friendly interface.
- **Decryption and Secure Download:** Decrypt and download your files securely to your device by inputting your private encryption key.

## Client-Side Application

Located in the `src` folder, the client-side code is the heart of the application. Start the app using `npm run dev`. Please note, a `.env` file, crucial for configuration, is not included in the repository. Contact the repository maintainer to acquire this file.

## Backend Functionalities

The backend logic, encompassing cloud functions for file encryption and user authentication, resides in the `functions` folder.

## Enhanced ESLint Configuration

The ESLint setup is extendable for a production environment to include type-aware lint rules. This enhancement ensures adherence to TypeScript best practices and maintains high code quality.

## Quick Start Guide

To embark on your EncryptEase journey:

1. Clone the repository.
2. Obtain the `.env` file for necessary environment configurations.
3. Execute `npm install` to install dependencies.
4. Launch the application with `npm run dev`.

EncryptEase merges modern web technologies with stringent encryption standards, providing a powerful tool for safeguarding sensitive documents. It's an ideal platform for individuals and businesses alike, looking to secure various document formats with ease and reliability.
