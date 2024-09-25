import { createContext, useContext, useEffect, useState } from 'react';
import { Client, Account, Databases } from 'appwrite';

const AppwriteContext = createContext(null);

export const AppwriteProvider = ({ children }) => {
  const [client, setClient] = useState(null);
  const [account, setAccount] = useState(null);
  const [database, setDatabase] = useState(null);

  useEffect(() => {
    const initAppwrite = () => {
      const client = new Client();
      client
        .setEndpoint('https://cloud.appwrite.io/v1') 
        .setProject('66f3faf700240551a191'); 

      const account = new Account(client);
      const database = new Databases(client);

      setClient(client);
      setAccount(account);
      setDatabase(database);
    };

    initAppwrite();
  }, []);

  return (
    <AppwriteContext.Provider value={{ client, account, database }}>
      {children}
    </AppwriteContext.Provider>
  );
};

// Create a custom hook to use the Appwrite context
export const useAppwrite = () => {
  return useContext(AppwriteContext);
};
