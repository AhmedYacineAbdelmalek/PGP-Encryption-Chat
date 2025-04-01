# PGP Encrypted Chat

## University  Assignment
This project was developed as part of a university assignment focused on applied cryptography and secure communications. It demonstrates the practical implementation of PGP encryption in a modern web application.

## Overview
This React-based application allows users to send and receive encrypted messages using PGP (Pretty Good Privacy) encryption. It features a user-friendly interface with a sidebar for user selection, a dashboard for managing keys and messages, and functionalities for key generation, message encryption, and digital signing.etty Good Privacy) encryption. It features a user-friendly interface with a sidebar for user selection, a dashboard for managing keys and messages, and functionalities for key generation, message encryption, and digital signing.

## Features
- **User Management**: Select from predefined user identities in a stylish sidebar
- **Key Manager**: Generate and manage RSA 2048-bit public/private key pairs- **Key Manager**: Generate and manage RSA 2048-bit public/private key pairs
- **Message Encryption**: Encrypt messages using recipients' public keystion**: Encrypt messages using recipients' public keys
- **Digital Signatures**: Cryptographically sign messages to verify sender identity- **Digital Signatures**: Cryptographically sign messages to verify sender identity
- **Message Decryption**: Decrypt messages using private keys protected by passphrasesption**: Decrypt messages using private keys protected by passphrases
- **Passphrase Storage**: Securely view and use saved passphrasesly view and use saved passphrases
- **Modern UI**: Sleek interface with dark/light theme toggleface with dark/light theme toggle

## Getting Starteded

### Prerequisiteserequisites
- Node.js (version 14 or higher)
- npm (Node package manager)(Node package manager)

### Installationstallation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/pgp-encrypted-chat.gitcom/yourusername/pgp-encrypted-chat.git
   ```
2. Navigate to the project directory: the project directory:
   ```
   cd pgp-encrypted-chat   cd pgp-encrypted-chat
   ```
3. Install the dependencies:
   ``````
   npm installstall
   ``````

### Running the Application### Running the Application
To start the application in development mode, run:the application in development mode, run:
```
npm start
```

If you encounter OpenSSL issues with newer Node.js versions (v20+), use:OpenSSL issues with newer Node.js versions (v20+), use:
```
export NODE_OPTIONS=--openssl-legacy-provider
npm start
```

This will launch the app in your default web browser at `http://localhost:3000`.http://localhost:3000`.

### Usage
1. **Select a User**: Choose a user identity from the sidebar
2. **Generate Keys**: Create a key pair by entering a passphrase in the Key Manager2. **Generate Keys**: Create a key pair by entering a passphrase in the Key Manager
3. **Select a Recipient**: Choose another user with a generated key pairt a Recipient**: Choose another user with a generated key pair
4. **Compose Messages**: Write your message, encrypt it with the recipient's public key, and optionally sign it with your private keyic key, and optionally sign it with your private key






This project is licensed under the MIT License. See the LICENSE file for details.## LicenseDeveloped at UNIVERSITY of ALGIERS 1. The implementation applies theoretical cryptographic concepts in a practical web application context.## Academic Context- Secure handling of private keys with passphrases- Digital signatures and identity verification- Key pair generation and management- Asymmetric encryption principlesThis project demonstrates several important cryptographic concepts:## Educational Purpose- `src/theme.js`: Custom Material-UI theme configuration- `src/styles/`: CSS styles for application components- `src/data/`: Mock user data for demonstration- `src/services/`: Cryptographic helper functions using OpenPGP.js- `src/components/`: React components for the application UI- `public/`: Contains the main HTML file and favicon## Code Structure- **Styling**: Custom styling with emotion/styled and CSS- **Encryption**: OpenPGP.js v5.3.0 implementation of the PGP standard- **UI Framework**: Material-UI v5 with custom theming- **Frontend**: React 17 with functional components and hooks## Technical Implementation5. **Send & Receive**: Send encrypted messages and decrypt received messages using your private key5. **Send & Receive**: Send encrypted messages and decrypt received messages using your private key.


