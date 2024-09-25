import { useEffect, useState } from 'react';
import { database } from '../../config/appwriteConfig'; // Import Appwrite config
import Link from 'next/link';

interface Developer {
  $id: string;
  name: string;
  email: string;
  github: string;
  bio: string;
}

const DevelopersList = () => {
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
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {developers.map((developer) => (
            <li key={developer.$id} className="p-4 border rounded-lg">
              <h2 className="text-xl font-semibold">{developer.name}</h2>
              <p>Email: {developer.email}</p>
              <p>Bio: {developer.bio}</p>
              <a
                href={`https://github.com/${developer.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                GitHub Profile
              </a>
              <div className="mt-2">
                <Link href={`/developers/${developer.$id}`}>
                  <a className="text-blue-500">View Profile</a>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DevelopersList;

