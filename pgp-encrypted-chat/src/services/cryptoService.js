import * as openpgp from 'openpgp';

/**
 * Generates a PGP key pair based on user info and passphrase
 */
export const generateKeyPair = async (name, email, passphrase) => {
  try {
    const { privateKey, publicKey } = await openpgp.generateKey({
      type: 'rsa',
      rsaBits: 2048,
      userIDs: [{ name, email }],
      passphrase
    });

    return {
      privateKey,
      publicKey,
      success: true
    };
  } catch (error) {
    console.error('Error generating key pair:', error);
    return {
      error: error.message,
      success: false
    };
  }
};

/**
 * Encrypts a message for a recipient using their public key
 */
export const encryptMessage = async (message, publicKeyArmored, sign = false, privateKeyArmored = null, passphrase = '') => {
  try {
    const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });
    
    let options = {
      message: await openpgp.createMessage({ text: message }),
      encryptionKeys: publicKey
    };
    
    // Add signing if requested
    if (sign && privateKeyArmored) {
      const privateKey = await openpgp.decryptKey({
        privateKey: await openpgp.readPrivateKey({ armoredKey: privateKeyArmored }),
        passphrase
      });
      options.signingKeys = privateKey;
    }
    
    const encrypted = await openpgp.encrypt(options);
    return {
      encryptedMessage: encrypted,
      success: true
    };
  } catch (error) {
    console.error('Error encrypting message:', error);
    return {
      error: error.message,
      success: false
    };
  }
};

/**
 * Decrypts a message using private key
 */
export const decryptMessage = async (encryptedMessage, privateKeyArmored, passphrase, senderPublicKey = null) => {
    try {
      const privateKey = await openpgp.decryptKey({
        privateKey: await openpgp.readPrivateKey({ armoredKey: privateKeyArmored }),
        passphrase
      });
  
      const message = await openpgp.readMessage({
        armoredMessage: encryptedMessage
      });
  
      const decryptOptions = {
        message,
        decryptionKeys: privateKey
      };
  
      // If sender's public key is provided, use it for verification
      if (senderPublicKey) {
        decryptOptions.verificationKeys = await openpgp.readKey({ armoredKey: senderPublicKey });
      }
  
      const { data, signatures } = await openpgp.decrypt(decryptOptions);
  
      // Check if message was signed
      let verified = false;
      if (signatures.length > 0) {
        verified = await signatures[0].verified;
      }
  
      return {
        decryptedMessage: data,
        verified,
        success: true
      };
    } catch (error) {
      console.error('Error decrypting message:', error);
      return {
        error: error.message,
        success: false
      };
    }
  };


export const signMessage = async (message, privateKeyArmored, passphrase) => {
    const privateKey = await openpgp.readPrivateKey({ armoredKey: privateKeyArmored });
    await privateKey.decrypt(passphrase);
    const { signature } = await openpgp.sign({
        message: await openpgp.createMessage({ text: message }),
        signingKeys: privateKey,
    });
    return signature;
};

export const verifySignature = async (message, signature, publicKeyArmored) => {
    const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });
    const { verified } = await openpgp.verify({
        message: await openpgp.createMessage({ text: message }),
        signature: await openpgp.readSignature({ armoredSignature: signature }),
        verificationKeys: publicKey,
    });
    return verified;
};