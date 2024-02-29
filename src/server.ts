import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { encryptData, saveDataToFile, inputData, decryptData } from './util';
import { promises as fs } from 'fs';
import path from 'path';
import cors from 'cors';

const app = express();
const PORT: number = 3001;
// Middlwears //
app.use(cors());
app.use(bodyParser.json());

app.post('/add', async (req: Request, res: Response) => {
  const { label, username, password } = req.body;

  const data: inputData = {
    label,
    encryptedUsername: encryptData(username),
    encryptedPassword: encryptData(password),
  };

  try {
    await saveDataToFile(data);
    res.status(200).send('Data Saved Successfully');
  } catch (error: any) {
    res.status(500).send(`Error saving the data: ${error.message}`);
  }
});

app.post('/search', async (req: Request, res: Response) => {
  const { label } = req.body;

  if (!label) {
    res.status(400).send('Label is Required');
  }

  const filePath = './data/data.json';

  try {
    const data = await fs.readFile(filePath, { encoding: 'utf-8' });
    const passwords: inputData[] = JSON.parse(data);

    // Find the entry with the given label
    const entry = passwords.find((entry) => entry.label === label);

    if (!entry) {
      return res.status(404).send('Label not found');
    }

    // Decrypt the username and paswword
    const decryptedUsername = decryptData(entry.encryptedUsername);
    const decryptedPassword = decryptData(entry.encryptedPassword);

    // Return the decrypted username and password
    res.json({
      username: decryptedUsername,
      password: decryptedPassword,
    });
  } catch (error) {
    res
      .status(500)
      .send(
        `Error retriving the data: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});