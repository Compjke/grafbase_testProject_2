import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import './globals.css'

export const metadata = {
  title: "Test project#2",
  description: "Showcase and discover remarable developer project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NavBar/>
        <main>
        {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}
