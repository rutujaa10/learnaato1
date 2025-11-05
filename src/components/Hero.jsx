import { Search } from 'lucide-react';

function Hero({ onSearch, onNavigate }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const query = e.target.search.value.trim();
    if (query) {
      onSearch(query);
    }
  };

  return (
    <div className="bg-gradient-to-br from-midnight to-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Welcome to Learnato Connect
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Ask. Learn. Share. Grow Together.
        </p>
        <p className="text-gray-400 mb-10">
          Empowering Learning Through Conversation.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <button
            onClick={() => onNavigate('home')}
            className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-blue-600 transition-all hover:scale-105"
          >
            Start Exploring Discussions
          </button>
          <button
            onClick={() => onNavigate('create')}
            className="px-8 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all hover:scale-105"
          >
            Create a New Post
          </button>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              name="search"
              placeholder="Search discussions..."
              className="w-full px-6 py-4 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-all"
            >
              <Search size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Hero;
