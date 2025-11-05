import { GoogleGenerativeAI } from '@google/generative-ai';
import Post from '../models/Post.js';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getSimilarQuestions = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ message: 'Query is required' });
    }

    const posts = await Post.find().sort({ createdAt: -1 }).limit(20);

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Given this question: "${query}"

    And these existing discussions:
    ${posts.map((p, i) => `${i + 1}. ${p.title}`).join('\n')}

    Suggest 3-5 most similar or related questions from the list above. Return only the numbers of the matching questions, comma-separated.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const indices = text.match(/\d+/g)?.map(n => parseInt(n) - 1) || [];
    const similarPosts = indices
      .filter(i => i >= 0 && i < posts.length)
      .map(i => posts[i]);

    res.status(200).json(similarPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const summarizeDiscussion = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Summarize this discussion in 2-3 sentences:

    Question: ${post.title}
    Content: ${post.content}

    Replies:
    ${post.replies.map((r, i) => `${i + 1}. ${r.content}`).join('\n')}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();

    res.status(200).json({ summary });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAISuggestion = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: 'Question is required' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `As an educational AI assistant, provide a helpful and concise answer to this question: "${question}"

    Keep the answer clear, educational, and under 150 words.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const suggestion = response.text();

    res.status(200).json({ suggestion });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
