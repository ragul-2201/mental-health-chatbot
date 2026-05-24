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

  const messages = [
    ...(history || []),
    { role: 'user', content: message }
  ];

  try {
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: systemPrompt,
        messages: messages
      },
      {
        headers: {
          'x-api-key': process.env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json'
        }
      }
    );

    const reply = response.data.content[0].text;

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