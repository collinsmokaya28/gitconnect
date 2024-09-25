import { Client, Account, Databases } from 'appwrite';

const client = new Client();
client.setEndpoint('https://cloud.appwrite.io/v1').setProject('66f3faf700240551a191');

export const account = new Account(client);
export const database = new Databases(client);
