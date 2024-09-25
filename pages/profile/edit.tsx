import { useState, useEffect } from 'react';
import { useAppwrite } from '../../context/AppwriteContext';
import { useRouter } from 'next/router';

const EditProfile = () => {
  const [profileData, setProfileData] = useState({ name: '', email: '' }); // Add more fields as necessary
  const appwrite = useAppwrite();
  const router = useRouter();
  const userId = '66f40b64000d7cd4eeac'; 

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!appwrite?.database) return; 

      try {
        const response = await appwrite.database.getDocument('profiles_collection_id', userId);
        setProfileData(response);
      } catch (error) {
        console.error('Failed to fetch profile data:', error);
      }
    };

    fetchProfileData();
  }, [appwrite, userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!appwrite?.database) return; // Check if appwrite is not null

    try {
      await appwrite.database.updateDocument('profiles_collection_id', userId, profileData);
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
        <input type="text" name="name" value={profileData.name} onChange={handleChange} required />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={profileData.email} onChange={handleChange} required />
      </label>
      {/* Add more fields as necessary */}
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default EditProfile;
