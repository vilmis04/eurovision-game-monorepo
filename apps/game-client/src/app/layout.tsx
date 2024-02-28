import './global.css';

export const metadata = {
  title: 'Vote For The Winners',
  description: 'Eurovision guessing game',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
