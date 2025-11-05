import { useState, useEffect } from 'react';
import {
  ArrowUp,
  MessageSquare,
  CheckCircle,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { postsAPI, aiAPI } from '../api/api';

function PostDetail({ postId, onBack }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [replyAuthor, setReplyAuthor] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [summary, setSummary] = useState('');
  const [loadingSummary, setLoadingSummary] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const data = await postsAPI.getById(postId);
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpvote = async () => {
    try {
      const updatedPost = await postsAPI.upvote(postId);
      setPost(updatedPost);
    } catch (error) {
      console.error('Error upvoting post:', error);
    }
  };

  const handleMarkAsAnswered = async () => {
    try {
      const updatedPost = await postsAPI.markAsAnswered(postId);
      setPost(updatedPost);
    } catch (error) {
      console.error('Error marking as answered:', error);
    }
  };

  const handleSubmitReply = async (e) => {
    e.preventDefault();
    if (!replyAuthor.trim() || !replyContent.trim()) return;

    try {
      setSubmitting(true);
      const updatedPost = await postsAPI.addReply(postId, {
        author: replyAuthor,
        content: replyContent,
      });
      setPost(updatedPost);
      setReplyAuthor('');
      setReplyContent('');
    } catch (error) {
      console.error('Error adding reply:', error);
      alert('Failed to add reply');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGetSummary = async () => {
    try {
      setLoadingSummary(true);
      const { summary: summaryText } = await aiAPI.summarize(postId);
      setSummary(summaryText);
    } catch (error) {
      console.error('Error getting summary:', error);
      alert('Failed to get summary');
    } finally {
      setLoadingSummary(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-gray-400 text-lg">Loading discussion...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-lg">Post not found</p>
        <button
          onClick={onBack}
          className="mt-4 text-primary hover:underline"
        >
          Back to Discussions
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Discussions
      </button>

      <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-6">
        <div className="flex gap-6">
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={handleUpvote}
              className="flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-gray-700 transition-all group"
            >
              <ArrowUp
                className="text-gray-400 group-hover:text-primary transition-colors"
                size={28}
              />
              <span className="text-xl font-bold text-white">
                {post.upvotes}
              </span>
            </button>
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="text-3xl font-bold text-white">{post.title}</h1>
              {post.isAnswered && (
                <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
              )}
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>

            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              <span className="font-medium text-primary">{post.author}</span>
              <span>•</span>
              <span>{formatDate(post.createdAt)}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <MessageSquare size={16} />
                <span>{post.replies?.length || 0} replies</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleMarkAsAnswered}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all"
              >
                {post.isAnswered ? 'Unmark as Answered' : 'Mark as Answered'}
              </button>
              <button
                onClick={handleGetSummary}
                disabled={loadingSummary || post.replies.length === 0}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles size={18} className="inline mr-2" />
                {loadingSummary ? 'Generating...' : 'AI Summary'}
              </button>
            </div>

            {summary && (
              <div className="mt-4 p-4 bg-gradient-to-r from-primary/10 to-blue-900/10 rounded-lg border border-primary/30">
                <div className="flex items-start gap-3">
                  <Sparkles className="text-primary flex-shrink-0 mt-1" size={18} />
                  <div>
                    <h4 className="text-white font-semibold mb-1">
                      Discussion Summary
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {summary}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-6">
        <h2 className="text-2xl font-bold text-white mb-6">
          {post.replies?.length || 0} Replies
        </h2>

        <div className="space-y-6 mb-8">
          {post.replies?.map((reply, index) => (
            <div
              key={index}
              className="border-l-4 border-primary pl-6 py-2"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="font-semibold text-primary">
                  {reply.author}
                </span>
                <span className="text-gray-500 text-sm">
                  {formatDate(reply.createdAt)}
                </span>
              </div>
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {reply.content}
              </p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmitReply} className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Add Your Reply</h3>

          <div>
            <input
              type="text"
              value={replyAuthor}
              onChange={(e) => setReplyAuthor(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all"
              required
            />
          </div>

          <div>
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Write your reply..."
              rows={4}
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all resize-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-blue-600 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {submitting ? 'Posting...' : 'Post Reply'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostDetail;
