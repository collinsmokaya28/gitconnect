import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppwrite } from 'your-appwrite-context'; // Adjust the import based on your context setup

const PostDetail = () => {
  const router = useRouter();
  const { id } = router.query; // Get post ID from the URL
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const appwrite = useAppwrite();

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const response = await appwrite.database.getDocument('posts_collection_id', id); // Replace with your collection ID
          setPost(response);
        } catch (error) {
          console.error('Failed to fetch post:', error);
        }
      };

      fetchPost();
    }
  }, [id, appwrite]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment) return;

    try {
      await appwrite.database.updateDocument('posts_collection_id', id, {
        comments: [...(post.comments || []), comment],
      });
      setPost({ ...post, comments: [...(post.comments || []), comment] });
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
