const API_BASE_URL = 'http://localhost:5000/api';

export const postsAPI = {
  getAll: async (sort = 'latest') => {
    const response = await fetch(`${API_BASE_URL}/posts?sort=${sort}`);
    if (!response.ok) throw new Error('Failed to fetch posts');
    return response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`);
    if (!response.ok) throw new Error('Failed to fetch post');
    return response.json();
  },

  create: async (postData) => {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData)
    });
    if (!response.ok) throw new Error('Failed to create post');
    return response.json();
  },

  addReply: async (postId, replyData) => {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/reply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(replyData)
    });
    if (!response.ok) throw new Error('Failed to add reply');
    return response.json();
  },

  upvote: async (postId) => {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/upvote`, {
      method: 'POST'
    });
    if (!response.ok) throw new Error('Failed to upvote');
    return response.json();
  },

  markAsAnswered: async (postId) => {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/answer`, {
      method: 'POST'
    });
    if (!response.ok) throw new Error('Failed to mark as answered');
    return response.json();
  },

  search: async (query) => {
    const response = await fetch(`${API_BASE_URL}/posts/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to search posts');
    return response.json();
  }
};

export const aiAPI = {
  getSimilar: async (query) => {
    const response = await fetch(`${API_BASE_URL}/ai/similar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });
    if (!response.ok) throw new Error('Failed to get similar questions');
    return response.json();
  },

  summarize: async (postId) => {
    const response = await fetch(`${API_BASE_URL}/ai/summarize/${postId}`);
    if (!response.ok) throw new Error('Failed to summarize discussion');
    return response.json();
  },

  getSuggestion: async (question) => {
    const response = await fetch(`${API_BASE_URL}/ai/suggest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    });
    if (!response.ok) throw new Error('Failed to get AI suggestion');
    return response.json();
  }
};
