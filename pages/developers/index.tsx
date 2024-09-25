import { useEffect, useState } from 'react';
import { database } from '../../config/appwriteConfig'; 
import DeveloperList from './components/DeveloperList';

interface Developer {
  $id: string;
  name: string;
  email: string;
  github: string;
  bio: string;
}

const DevelopersPage = () => {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all developers from the Appwrite database
  const fetchDevelopers = async () => {
    try {
      const response = await database.listDocuments(
        '66f3fec30023174c7911', 
        '66f3ff33003de50e7552'  
      );

      // Map response documents to Developer type
      const developerData: Developer[] = response.documents.map(doc => ({
        $id: doc.$id,
        name: doc.name,
        email: doc.email,
        github: doc.github,
        bio: doc.bio,
      }));

      setDevelopers(developerData);
    } catch (err) {
      setError('Failed to fetch developers.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevelopers();
  }, []);

  if (loading) {
    return <p>Loading developers...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Registered Developers</h1>
      {developers.length === 0 ? (
        <p>No developers found.</p>
      ) : (
        <DeveloperList developers={developers} />
      )}
    </div>
  );
};

export default DevelopersPage;


