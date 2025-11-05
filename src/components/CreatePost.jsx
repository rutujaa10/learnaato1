import { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { postsAPI, aiAPI } from '../api/api';

function CreatePost({ onPostCreated, onBack }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !author.trim()) return;

    try {
      setLoading(true);
      await postsAPI.create({ title, content, author });
      setTitle('');
      setContent('');
      setAuthor('');
      setAiSuggestion('');
      onPostCreated();
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  const handleGetAISuggestion = async () => {
    if (!title.trim()) {
      alert('Please enter a question title first');
      return;
    }

    try {
      setLoadingAI(true);
      const { suggestion } = await aiAPI.getSuggestion(title);
      setAiSuggestion(suggestion);
    } catch (error) {
      console.error('Error getting AI suggestion:', error);
      alert('Failed to get AI suggestion');
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-white">Create New Discussion</h2>
        <button
          onClick={onBack}
          className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
        >
          Back to Discussions
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-300 font-medium mb-2">
            Your Name
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 font-medium mb-2">
            Question Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What's your question?"
            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 font-medium mb-2">
            Details
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Provide more details about your question..."
            rows={8}
            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all resize-none"
            required
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-blue-600 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <Send size={20} />
            {loading ? 'Posting...' : 'Post Question'}
          </button>

          <button
            type="button"
            onClick={handleGetAISuggestion}
            disabled={loadingAI}
            className="px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <Sparkles size={20} className="inline mr-2" />
            {loadingAI ? 'Thinking...' : 'Get AI Help'}
          </button>
        </div>
      </form>

      {aiSuggestion && (
        <div className="mt-6 p-6 bg-gradient-to-r from-primary/10 to-blue-900/10 rounded-lg border border-primary/30">
          <div className="flex items-start gap-3">
            <Sparkles className="text-primary flex-shrink-0 mt-1" size={20} />
            <div>
              <h3 className="text-white font-semibold mb-2">AI Assistant Suggestion</h3>
              <p className="text-gray-300 leading-relaxed">{aiSuggestion}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreatePost;
