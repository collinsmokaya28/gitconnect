import { useState, useEffect } from 'react';
import { useAppwrite } from '../../context/AppwriteContext';
import { useRouter } from 'next/router';

interface UserProfile {
  name: string;
  email: string;
}

const EditProfile = () => {
  const [profileData, setProfileData] = useState<UserProfile>({ name: '', email: '' });
  const appwrite = useAppwrite();
  const router = useRouter();
  const userId = '66f40b64000d7cd4eeac'; // User ID
  const databaseId = '66f3fec30023174c7911'; // Database ID
  const collectionId = '66f3ff33003de50e7552'; // Collection ID

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!appwrite?.database) return;

      try {
        // Correctly fetch the document with all required arguments
        const response = await appwrite.database.getDocument(databaseId, collectionId, userId);
        
        // Map response to UserProfile type
        const userProfile: UserProfile = {
          name: response.name || '', // Ensure default values
          email: response.email || '',
        };

        setProfileData(userProfile);
      } catch (error) {
        console.error('Failed to fetch profile data:', error);
      }
    };

    fetchProfileData();
  }, [appwrite, userId, collectionId, databaseId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!appwrite?.database) return;

    try {
      // Update document with databaseId, collectionId, userId, and profileData
      await appwrite.database.updateDocument(
        databaseId,  // Database ID
        collectionId, // Collection ID
        userId,      // Document ID
        profileData  // Data to update
      );
      alert('Profile updated successfully!');
      router.push('/profile'); // Redirect to the profile page
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Error updating profile.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={profileData.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={profileData.email}
          onChange={handleChange}
          required
        />
      </label>
      {/* Add more fields as necessary */}
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default EditProfile;




