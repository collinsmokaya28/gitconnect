import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppwrite } from '../../context/AppwriteContext';

interface Post {
  $id: string;
  title: string;
  content: string;
  comments?: string[];
}

const PostDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<Post | null>(null);
  const [comment, setComment] = useState('');
  const appwrite = useAppwrite();

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return; // Ensure id is available

      if (!appwrite || !appwrite.database) {
        console.error('Appwrite instance or database is not initialized');
        return;
      }

      try {
        const response = await appwrite.database.getDocument(
          '66f3fec30023174c7911', // databaseID
          '66f3ff33003de50e7552', // collectionID
          id as string             // documentId
        );

        // Transform the response to match Post interface
        const postData: Post = {
          $id: response.$id,
          title: response.title || 'Untitled', // Provide default title if missing
          content: response.content || 'No content', // Provide default content if missing
          comments: response.comments || [],
        };

        setPost(postData);
      } catch (error) {
        console.error('Failed to fetch post:', error);
      }
    };

    fetchPost();
  }, [id, appwrite]);

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment || !appwrite || !appwrite.database || !post) return;

    try {
      const updatedComments = [...(post.comments || []), comment];
      await appwrite.database.updateDocument(
        '66f3fec30023174c7911',   // databaseID
        '66f3ff33003de50e7552',   // collectionID
        id as string,             // documentId
        { comments: updatedComments } // data
      );

      setPost({ ...post, comments: updatedComments });
      setComment(''); // Clear the comment input
    } catch (error) {
      console.error('Failed to add comment:', error);
      alert('Error adding comment.');
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <h2>Comments</h2>
      <ul>
        {(post.comments || []).map((c, index) => (
          <li key={index}>{c}</li>
        ))}
      </ul>
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostDetail;




