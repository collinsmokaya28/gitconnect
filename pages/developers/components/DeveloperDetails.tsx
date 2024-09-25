// pages/developers/components/DeveloperDetails.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { database } from '../../../config/appwriteConfig'; // Adjust the path if necessary
import axios from 'axios';

interface Developer {
  $id: string;
  name: string;
  email: string;
  bio: string;
  github: string;
  education: string;
  experience: string;
}

const DeveloperDetails = () => {
  const router = useRouter();
  const { id } = router.query; // Get developer id from URL
  const [developer, setDeveloper] = useState<Developer | null>(null);
  const [repos, setRepos] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch developer's personal details from Appwrite
  const fetchDeveloper = async () => {
    if (typeof id !== 'string') return; // Ensure id is a string
    setLoading(true);
    try {
      const response = await database.getDocument(
        '66f3fec30023174c7911', 
        '66f3ff33003de50e7552', 
        id
      );

      const developerData: Developer = {
        $id: response.$id,
        name: response.name,
        email: response.email,
        bio: response.bio,
        github: response.github,
        education: response.education,
        experience: response.experience,
      };

      setDeveloper(developerData);
    } catch (err) {
      setError('Failed to fetch developer details.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch GitHub repositories using GitHub API
  const fetchRepos = async (githubUsername: string) => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${githubUsername}/repos`
      );
      setRepos(response.data);
    } catch (err) {
      setError('Failed to fetch GitHub repositories.');
    }
  };

  useEffect(() => {
    if (id) {
      fetchDeveloper();
    }
  }, [id]);

  useEffect(() => {
    if (developer?.github) {
      fetchRepos(developer.github);
    }
  }, [developer]);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!developer) {
    return <p>No developer found.</p>; // Handle case where developer is null
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{developer.name}'s Profile</h1>
      <div className="mb-4">
        <h2 className="text-2xl font-semibold">Personal Details</h2>
        <p><strong>Email:</strong> {developer.email}</p>
        <p><strong>Bio:</strong> {developer.bio}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-2xl font-semibold">Education</h2>
        <p>{developer.education}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-2xl font-semibold">Work Experience</h2>
        <p>{developer.experience}</p>
      </div>
      <div>
        <h2 className="text-2xl font-semibold">GitHub Repositories</h2>
        {repos.length > 0 ? (
          <ul className="list-disc ml-6">
            {repos.map((repo) => (
              <li key={repo.id}>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                  {repo.name}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No repositories found for this user.</p>
        )}
      </div>
    </div>
  );
};

export default DeveloperDetails;
