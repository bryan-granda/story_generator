import fs from 'fs';

export async function GET(req, res) {
  const file = req.url.split('?file=')[1];
  const filepath = 'public/' + file + '.csv';

  if (!fs.existsSync(filepath)) {
    console.error('File not found: ', filepath);
    return Response.json({ error: 'File not found' });
  }

  try {
    const fileContent = fs.readFileSync(filepath, 'utf8');
    return Response.json(fileContent.split(', '));
  } catch (error) {
    console.error('Error reading file: ', error);
    return Response.json({ error });
  }
}
