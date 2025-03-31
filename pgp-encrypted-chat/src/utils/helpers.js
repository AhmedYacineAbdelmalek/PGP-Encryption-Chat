// src/utils/helpers.js

export const isValidPassphrase = (passphrase) => {
    return passphrase && passphrase.length >= 8; // Ensure passphrase is at least 8 characters
};

export const formatMessage = (message) => {
    return message.trim(); // Trim whitespace from the message
};

export const generateRandomId = () => {
    return Math.random().toString(36).substr(2, 9); // Generate a random ID for messages
};