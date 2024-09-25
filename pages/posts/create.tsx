import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppwrite } from '../../context/AppwriteContext';

const CreatePost = () => {
  const router = useRouter();
  const appwrite = useAppwrite();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if appwrite is initialized
    if (!appwrite || !appwrite.database) {
      setError('Appwrite instance is not initialized.');
      return;
    }

    try {
      await appwrite.database.createDocument(
        '66f3fec30023174c7911', // databaseId
        '66f3ff33003de50e7552', // collectionId
        'unique()', // documentId (use 'unique()' for auto-generated IDs)
        {
          title,
          content,
        }
      );
      router.push('/posts'); // Redirect after successful creation
    } catch (err) {
      console.error('Failed to create post:', err);
      setError('Failed to create post. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Create Post</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="mb-4">
        <div>
          <label className="block mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
