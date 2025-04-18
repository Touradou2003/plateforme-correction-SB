const axios = require('axios');
require('dotenv').config();

const API_URL   = process.env.OLLAMA_API_URL;
const MODEL     = process.env.OLLAMA_MODEL_NAME;

async function correct(submission) {
  // 1. Composer le prompt : ici on demande une note sur 20 et un feedback.
  const userPrompt = `
You are an expert grader of database exercises.
Please evaluate the student's submission file at path "${submission.fichier}"
for exercise ID "${submission.sujet}".
Return your answer in this exact format:
Note: <number>/20
Feedback: <detailed feedback>
`;

  // 2. Appel à l’API Ollama (endpoint chat completions)
  const response = await axios.post(
    `${API_URL}/v1/chat/completions`,
    {
      model: MODEL,
      messages: [
        { role: 'system', content: 'You are a helpful grading assistant.' },
        { role: 'user',   content: userPrompt.trim() }
      ]
    }
  );

  // 3. Récupérer le contenu textuel
  const content = response.data.choices?.[0]?.message?.content || '';
  const lines   = content.split('\n').map(l => l.trim()).filter(Boolean);

  // 4. Extraire la note et le feedback
  let note = 0;
  let feedbackLines = [];
  for (let line of lines) {
    if (/^Note:/i.test(line)) {
      const m = line.match(/(\d+(\.\d+)?)/);
      if (m) note = parseFloat(m[1]);
    } else if (/^Feedback:/i.test(line)) {
      feedbackLines.push(line.replace(/^Feedback:/i, '').trim());
    } else {
      feedbackLines.push(line);
    }
  }

  const feedback = feedbackLines.join(' ');
  return { note, feedback };
}

module.exports = { correct };
