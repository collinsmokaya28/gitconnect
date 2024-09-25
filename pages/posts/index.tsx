import { useEffect, useState } from 'react';
import { useAppwrite } from '../../context/AppwriteContext'; 
import Link from 'next/link'; // Import Link for navigation

interface Post {
  $id: string;
  title: string;
  content: string;
  likes?: number;
  dislikes?: number;
  comments?: string[];
}

const PostsFeed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const appwrite = useAppwrite();

  useEffect(() => {
    const fetchPosts = async () => {
      if (appwrite?.database) {
        try {
          const response = await appwrite.database.listDocuments('66f3fec30023174c7911', '66f3ff33003de50e7552');
          
          // Transform response.documents (Document[]) into Post[]
          const postsData: Post[] = response.documents.map((doc: any) => ({
            $id: doc.$id,
            title: doc.title || 'Untitled',  // Handle case where title might not exist
            content: doc.content || 'No content',  // Handle case where content might not exist
            likes: doc.likes || 0,
            dislikes: doc.dislikes || 0,
            comments: doc.comments || [],
          }));

          setPosts(postsData);  // Set the transformed data
        } catch (error) {
          console.error('Failed to fetch posts', error);
        }
      }
    };

    fetchPosts();
  }, [appwrite]);

  const handleLike = async (postId: string) => {
    const post = posts.find((p) => p.$id === postId);
    if (appwrite?.database && post) {
      try {
        await appwrite.database.updateDocument('66f3fec30023174c7911', '66f3ff33003de50e7552', postId, {
          likes: (post.likes || 0) + 1,
        });
        setPosts(posts.map((p) => (p.$id === postId ? { ...p, likes: (p.likes || 0) + 1 } : p)));
      } catch (error) {
        console.error('Failed to like post', error);
      }
    }
  };

  const handleDislike = async (postId: string) => {
    const post = posts.find((p) => p.$id === postId);
    if (appwrite?.database && post) {
      try {
        await appwrite.database.updateDocument('66f3fec30023174c7911', '66f3ff33003de50e7552', postId, {
          dislikes: (post.dislikes || 0) + 1,
        });
        setPosts(posts.map((p) => (p.$id === postId ? { ...p, dislikes: (p.dislikes || 0) + 1 } : p)));
      } catch (error) {
        console.error('Failed to dislike post', error);
      }
    }
  };

  const handleComment = async (postId: string, comment: string) => {
    const post = posts.find((p) => p.$id === postId);
    if (appwrite?.database && post) {
      try {
        await appwrite.database.updateDocument('66f3fec30023174c7911', '66f3ff33003de50e7552', postId, {
          comments: [...(post.comments || []), comment],
        });
        setPosts(posts.map((p) => (p.$id === postId ? { ...p, comments: [...(p.comments || []), comment] } : p)));
      } catch (error) {
        console.error('Failed to add comment', error);
      }
    }
  };

  return (
    <div>
      <h1>Posts Feed</h1>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <div key={post.$id} className="post">
            <Link href={`/posts/${post.$id}`}>
              <h2>{post.title}</h2>
            </Link>
            <p>{post.content}</p>
            <p>Likes: {post.likes || 0} Dislikes: {post.dislikes || 0}</p>
            <button onClick={() => handleLike(post.$id)}>Like</button>
            <button onClick={() => handleDislike(post.$id)}>Dislike</button>
            <div>
              <h3>Comments</h3>
              <ul>
                {(post.comments || []).map((comment, index) => (
                  <li key={index}>{comment}</li>
                ))}
              </ul>
              <input
                type="text"
                placeholder="Add a comment"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                    handleComment(post.$id, e.currentTarget.value);
                    e.currentTarget.value = ''; // Clear the input
                  }
                }}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PostsFeed;



