import openAI from 'openai';
const openai = new openAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req, res) {
  const data = await req.json();

  let prompt = [];
  for (let key in data) {
    /* Skip empty values */
    if (key !== '' && data[key] !== '') prompt.push({ role: 'user', content: `${key} = ${data[key]}` });
  }

  console.log('Prompt1:', prompt);
  /* Check if prompt is missing */
  if (!prompt) return Response.json({ error: 'Prompt missing' });

  /* Check if prompt is too long */
  if (prompt.length > 1000) return Response.json({ error: 'Prompt too long' });

  prompt.unshift({ role: 'user', content: 'Create a short drama story with a minimum of 300 words using the following traits' });

  console.log('Prompt:', prompt);
  /* Send prompt to OpenAI */
  const completion = await openai.chat.completions.create({
    messages: prompt,
    model: 'gpt-3.5-turbo'
  });

  const story = completion.choices[0].message.content;
  console.log('Story:', story);

  return Response.json(story);
}
