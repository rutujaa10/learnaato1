import { MessageCircle } from 'lucide-react';

function Header({ onNavigate, currentView }) {
  return (
    <header className="bg-midnight border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div className="bg-primary p-2 rounded-lg group-hover:scale-110 transition-transform">
              <MessageCircle className="text-white" size={24} />
            </div>
            <h1 className="text-xl font-bold text-white">
              Learnato <span className="text-primary">Connect</span>
            </h1>
          </div>

          <nav className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('home')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                currentView === 'home'
                  ? 'bg-primary text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              Discussions
            </button>
            <button
              onClick={() => onNavigate('create')}
              className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-blue-600 transition-all hover:scale-105"
            >
              New Post
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
