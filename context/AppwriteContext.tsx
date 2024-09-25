import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Client, Account, Databases } from 'appwrite';

const AppwriteContext = createContext<{
  client: Client | null;
  account: Account | null;
  database: Databases | null;
} | null>(null);

export const AppwriteProvider = ({ children }: {children: ReactNode}) => {
  const [client, setClient] = useState<Client | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  const [database, setDatabase] = useState<Databases | null>(null);

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
