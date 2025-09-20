import '../styles/globals.css';
import Header from '../components/Header';
import { AuthProvider } from '../context/AuthContext';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <div>
        <Header />
        <main style={{ padding: 16 }}>
          <Component {...pageProps} />
        </main>
      </div>
    </AuthProvider>
  );
}
