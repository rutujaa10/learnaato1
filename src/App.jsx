import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import CreatePost from './components/CreatePost';
import { postsAPI } from './api/api';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleNavigate = (view) => {
    setCurrentView(view);
    setSelectedPostId(null);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handlePostClick = (postId) => {
    setSelectedPostId(postId);
    setCurrentView('detail');
  };

  const handlePostCreated = () => {
    setCurrentView('home');
  };

  const handleSearch = async (query) => {
    try {
      const results = await postsAPI.search(query);
      setSearchResults(results);
      setSearchQuery(query);
      setCurrentView('home');
    } catch (error) {
      console.error('Error searching posts:', error);
    }
  };

  return (
    <div className="min-h-screen bg-midnight">
      <Header onNavigate={handleNavigate} currentView={currentView} />

      {currentView === 'home' && !searchQuery && (
        <Hero onSearch={handleSearch} onNavigate={handleNavigate} />
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'home' && (
          <PostList
            onPostClick={handlePostClick}
            searchQuery={searchQuery}
            searchResults={searchResults}
          />
        )}

        {currentView === 'detail' && selectedPostId && (
          <PostDetail
            postId={selectedPostId}
            onBack={() => handleNavigate('home')}
          />
        )}

        {currentView === 'create' && (
          <CreatePost
            onPostCreated={handlePostCreated}
            onBack={() => handleNavigate('home')}
          />
        )}
      </main>

      <footer className="bg-midnight border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-500">
            Learnato Connect - Empowering Learning Through Conversation
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
