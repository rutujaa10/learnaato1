import { ArrowUp, MessageSquare, CheckCircle } from 'lucide-react';

function PostCard({ post, onClick, onUpvote }) {
  const handleUpvote = (e) => {
    e.stopPropagation();
    onUpvote(post._id);
  };

  const formatDate = (date) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffMs = now - postDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return postDate.toLocaleDateString();
  };

  return (
    <div
      onClick={onClick}
      className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-primary transition-all cursor-pointer hover:shadow-lg hover:shadow-primary/20"
    >
      <div className="flex gap-4">
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={handleUpvote}
            className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-700 transition-all group"
          >
            <ArrowUp
              className="text-gray-400 group-hover:text-primary transition-colors"
              size={24}
            />
            <span className="text-lg font-semibold text-white">
              {post.upvotes}
            </span>
          </button>
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className="text-xl font-semibold text-white hover:text-primary transition-colors">
              {post.title}
            </h3>
            {post.isAnswered && (
              <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
            )}
          </div>

          <p className="text-gray-400 mb-4 line-clamp-2">{post.content}</p>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="font-medium text-primary">{post.author}</span>
            <span>•</span>
            <span>{formatDate(post.createdAt)}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <MessageSquare size={16} />
              <span>{post.replies?.length || 0} replies</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
