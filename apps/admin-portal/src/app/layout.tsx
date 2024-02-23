import './global.css';

export const metadata = {
  title: 'Admin: Vote For The Winners',
  description: 'Administration portal to manage the game',
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
