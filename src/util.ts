import { promises as fs } from 'fs';
import CryptoJs from 'crypto-js';
import dotenv from 'dotenv';

export interface inputData {
  label: string;
  encryptedUsername: string;
  encryptedPassword: string;
}

export const encryptData = (text: string): string => {
  dotenv.config();
  const secretKey: string = process.env.SECRET_KEY || '';
  return CryptoJs.AES.encrypt(text, secretKey).toString();
};

export const saveDataToFile = async (data: inputData): Promise<void> => {
  const filePath = './data/data.json';
  try {
    let fileData: inputData[];
    try {
      const existingData = await fs.readFile(filePath, { encoding: 'utf8' });
      fileData = JSON.parse(existingData);
    } catch (error) {
      fileData = []; // Initialize as an empty object if file reading fails
    }

    // updating the data object
    fileData.push(data);
    // Write the data into the json file
    await fs.writeFile(filePath, JSON.stringify(fileData, null, 2));
  } catch (error) {
    throw new Error('Failed to write to file');
  }
};

export const decryptData = (cipherText: string): string => {
  dotenv.config();
  const secretKey: string = process.env.SECRET_KEY || '';
  const bytes = CryptoJs.AES.decrypt(cipherText, secretKey);
  return bytes.toString(CryptoJs.enc.Utf8);
};
