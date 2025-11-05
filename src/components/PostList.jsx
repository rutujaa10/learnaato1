import { useState, useEffect } from 'react';
import { ArrowUpDown } from 'lucide-react';
import PostCard from './PostCard';
import { postsAPI } from '../api/api';

function PostList({ onPostClick, searchQuery, searchResults }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('latest');

  useEffect(() => {
    fetchPosts();
  }, [sortBy]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await postsAPI.getAll(sortBy);
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpvote = async (postId) => {
    try {
      const updatedPost = await postsAPI.upvote(postId);
      setPosts((prev) =>
        prev.map((post) => (post._id === postId ? updatedPost : post))
      );
    } catch (error) {
      console.error('Error upvoting post:', error);
    }
  };

  const displayPosts = searchQuery ? searchResults : posts;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-gray-400 text-lg">Loading discussions...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          {searchQuery ? `Search Results for "${searchQuery}"` : 'All Discussions'}
        </h2>
        {!searchQuery && (
          <button
            onClick={() => setSortBy(sortBy === 'latest' ? 'votes' : 'latest')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-all"
          >
            <ArrowUpDown size={18} />
            Sort by {sortBy === 'latest' ? 'Votes' : 'Latest'}
          </button>
        )}
      </div>

      {displayPosts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">
            {searchQuery ? 'No discussions found.' : 'No discussions yet. Be the first to post!'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {displayPosts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              onClick={() => onPostClick(post._id)}
              onUpvote={handleUpvote}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default PostList;
