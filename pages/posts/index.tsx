import { useEffect, useState } from 'react';
import { useAppwrite } from '../../context/AppwriteContext'; 
import Link from 'next/link'; // Import Link for navigation

const PostsFeed = () => {
  const [posts, setPosts] = useState([]);
  const appwrite = useAppwrite();

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

  const handleLike = async (postId) => {
    const post = posts.find((p) => p.$id === postId);
    await appwrite.database.updateDocument('66f3ff33003de50e7552', postId, {
      likes: post.likes + 1,
    });
    setPosts(posts.map((p) => (p.$id === postId ? { ...p, likes: p.likes + 1 } : p)));
  };

  const handleDislike = async (postId) => {
    const post = posts.find((p) => p.$id === postId);
    await appwrite.database.updateDocument('66f3ff33003de50e7552', postId, {
      dislikes: post.dislikes + 1,
    });
    setPosts(posts.map((p) => (p.$id === postId ? { ...p, dislikes: p.dislikes + 1 } : p)));
  };

  const handleComment = async (postId, comment) => {
    const post = posts.find((p) => p.$id === postId);
    await appwrite.database.updateDocument('66f3ff33003de50e7552', postId, {
      comments: [...post.comments, comment],
    });
    setPosts(posts.map((p) => (p.$id === postId ? { ...p, comments: [...p.comments, comment] } : p)));
  };

  return (
    <div>
      <h1>Posts Feed</h1>
      {posts.map((post) => (
        <div key={post.$id} className="post">
          <Link href={`/posts/${post.$id}`}>
            <h2>{post.title}</h2>
          </Link>
          <p>{post.content}</p>
          <p>Likes: {post.likes} Dislikes: {post.dislikes}</p>
          <button onClick={() => handleLike(post.$id)}>Like</button>
          <button onClick={() => handleDislike(post.$id)}>Dislike</button>
          <div>
            <h3>Comments</h3>
            <ul>
              {post.comments.map((comment, index) => (
                <li key={index}>{comment}</li>
              ))}
            </ul>
            <input
              type="text"
              placeholder="Add a comment"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleComment(post.$id, e.target.value);
                  e.target.value = ''; // Clear the input
                }
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostsFeed;

