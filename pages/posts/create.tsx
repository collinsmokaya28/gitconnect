import { useState, useEffect } from 'react';
import { useAppwrite } from '../../context/AppwriteContext'; 
import { useRouter } from 'next/router';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]); // State to hold existing posts
  const appwrite = useAppwrite();
  const router = useRouter();

  // Fetch existing posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await appwrite.database.listDocuments('66f3ff33003de50e7552'); 
        setPosts(response.documents);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, [appwrite]);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      await appwrite.database.createDocument('66f3ff33003de50e7552', 'unique()', {
        title,
        content,
        authorId: 'your_user_id', // Replace with the current user's ID
        likes: 0,
        dislikes: 0,
        comments: [],
      });
      alert('Post created successfully!');
      router.push('/posts'); // Redirect to the posts feed
    } catch (error) {
      console.error('Failed to create post:', error);
      alert('Error creating post.');
    }
  };

  const handleDeletePost = async (postId) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        await appwrite.database.deleteDocument('posts_collection_id', postId);
        alert('Post deleted successfully!');
        setPosts(posts.filter(post => post.$id !== postId)); // Update state to remove the deleted post
      } catch (error) {
        console.error('Failed to delete post:', error);
        alert('Error deleting post.');
      }
    }
  };

  return (
    <div>
      <h1>Create a New Post</h1>
      <form onSubmit={handleCreatePost}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Content:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </label>
        <button type="submit">Create Post</button>
      </form>

      <h2>Existing Posts</h2>
      {posts.map((post) => (
        <div key={post.$id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <button onClick={() => handleDeletePost(post.$id)}>Delete Post</button>
        </div>
      ))}
    </div>
  );
};

export default CreatePost;
