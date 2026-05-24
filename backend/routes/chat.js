const express = require('express');
const axios = require('axios');
const router = express.Router();

const stressKeywords = [
  'anxious', 'anxiety', 'stressed', 'stress', 'overwhelmed',
  'panic', 'depressed', 'depression', 'hopeless', 'scared',
  'fear', 'worried', 'worry', 'sad', 'crying', 'alone',
  'helpless', 'tired', 'exhausted', 'burnout', 'suicide',
  'hurt', 'pain', 'empty', 'worthless', 'numb'
];

function detectStressLevel(message) {
  const lower = message.toLowerCase();
  const found = stressKeywords.filter(word => lower.includes(word));
  if (found.length === 0) return 'low';
  if (found.length <= 2) return 'medium';
  return 'high';
}

router.post('/', async (req, res) => {
  const { message, history } = req.body;

  const stressLevel = detectStressLevel(message);

  const systemPrompt = `You are a compassionate mental health support chatbot. 
Your role is to:
- Listen empathetically and validate feelings
- Never diagnose or replace professional help
- Gently suggest professional resources when stress is high
- Use calm, supportive, non-judgmental language
- Ask open-ended follow-up questions
- If someone mentions self-harm or suicide, ALWAYS provide crisis hotline numbers immediately

Current stress level detected: ${stressLevel}
If stress level is HIGH, prioritize recommending professional help.`;

  const geminiHistory = (history || []).map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));

  const contents = [
    ...geminiHistory,
    { role: 'user', parts: [{ text: message }] }
  ];

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        system_instruction: {
          parts: [{ text: systemPrompt }]
        },
        contents: contents,
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const reply = response.data.candidates[0].content.parts[0].text;

    res.json({
      reply,
      stressLevel,
      detectedKeywords: stressKeywords.filter(w =>
        message.toLowerCase().includes(w)
      )
    });

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'AI service error' });
  }
});

module.exports = router;const express = require('express');
const axios = require('axios');
const router = express.Router();

const stressKeywords = [
  'anxious', 'anxiety', 'stressed', 'stress', 'overwhelmed',
  'panic', 'depressed', 'depression', 'hopeless', 'scared',
  'fear', 'worried', 'worry', 'sad', 'crying', 'alone',
  'helpless', 'tired', 'exhausted', 'burnout', 'suicide',
  'hurt', 'pain', 'empty', 'worthless', 'numb'
];

function detectStressLevel(message) {
  const lower = message.toLowerCase();
  const found = stressKeywords.filter(word => lower.includes(word));
  if (found.length === 0) return 'low';
  if (found.length <= 2) return 'medium';
  return 'high';
}

router.post('/', async (req, res) => {
  const { message, history } = req.body;

  const stressLevel = detectStressLevel(message);

  const systemPrompt = `You are a compassionate mental health support chatbot. 
Your role is to:
- Listen empathetically and validate feelings
- Never diagnose or replace professional help
- Gently suggest professional resources when stress is high
- Use calm, supportive, non-judgmental language
- Ask open-ended follow-up questions
- If someone mentions self-harm or suicide, ALWAYS provide crisis hotline numbers immediately

Current stress level detected: ${stressLevel}
If stress level is HIGH, prioritize recommending professional help.`;

  const geminiHistory = (history || []).map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));

  const contents = [
    ...geminiHistory,
    { role: 'user', parts: [{ text: message }] }
  ];

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        system_instruction: {
          parts: [{ text: systemPrompt }]
        },
        contents: contents,
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const reply = response.data.candidates[0].content.parts[0].text;

    res.json({
      reply,
      stressLevel,
      detectedKeywords: stressKeywords.filter(w =>
        message.toLowerCase().includes(w)
      )
    });

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'AI service error' });
  }
});

module.exports = router;