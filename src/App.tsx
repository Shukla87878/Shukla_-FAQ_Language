import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { FAQ, Language } from './types/faq';
import { faqStorage } from './lib/faqStorage';
import { FAQList } from './components/FAQList';
import { AdminPanel } from './components/AdminPanel';
import { FileQuestion, Settings } from 'lucide-react';

function App() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [currentLang, setCurrentLang] = useState<Language>('en');

  const fetchFAQs = async () => {
    const data = await faqStorage.getAll();
    setFaqs(data);
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link
                  to="/"
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-gray-700"
                >
                  <FileQuestion className="w-5 h-5 mr-2" />
                  FAQs
                </Link>
                <Link
                  to="/admin"
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-gray-700"
                >
                  <Settings className="w-5 h-5 mr-2" />
                  Admin
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="py-10">
          <Routes>
            <Route
              path="/"
              element={
                <FAQList
                  faqs={faqs}
                  currentLang={currentLang}
                  onLanguageChange={setCurrentLang}
                />
              }
            />
            <Route
              path="/admin"
              element={<AdminPanel faqs={faqs} onFAQUpdate={fetchFAQs} />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App