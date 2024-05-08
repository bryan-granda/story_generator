import './index.scss';

export const metadata = {
  title: 'Story Generator',
  description: 'Generate a story with the help of ChatGPT-3.5 Turbo.'
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
