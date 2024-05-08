import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const prompt = req.query.prompt;

  console.log('GOT HERE');
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt missing' });
  }

  if (prompt.length > 100) {
    return res.status(400).json({ error: 'Prompt too long' });
  }

  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Create story with the following prompt: kid is homeless.`,
    max_tokens: 500,
    temperature: 1,
    presence_penalty: 0,
    frequency_penalty: 0
  });

  const quote = completion.data.choices[0].text;
  console.log(quote);
  res.status(200).json({ quote });
}
