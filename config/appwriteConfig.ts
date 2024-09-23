import { Client, Account, Databases } from 'appwrite';

const client = new Client();
client.setEndpoint('YOUR_APPWRITE_ENDPOINT').setProject('YOUR_PROJECT_ID');

export const account = new Account(client);
export const database = new Databases(client);
