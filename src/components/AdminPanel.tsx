import { useState } from 'react';
import { Editor } from './Editor';
import { FAQ, Language, SUPPORTED_LANGUAGES } from '../types/faq';
import { faqStorage } from '../lib/faqStorage';

interface AdminPanelProps {
  faqs: FAQ[];
  onFAQUpdate: () => void;
}

export function AdminPanel({ faqs, onFAQUpdate }: AdminPanelProps) {
  const [selectedFAQ, setSelectedFAQ] = useState<FAQ | null>(null);
  const [editLang, setEditLang] = useState<Language>('en');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSave = async () => {
    if (!selectedFAQ) {
      // Create new FAQ
      await faqStorage.create({
        question,
        answer,
        translations: {}
      });

      onFAQUpdate();
      setQuestion('');
      setAnswer('');
    } else if (editLang === 'en') {
      // Update main FAQ
      await faqStorage.update(selectedFAQ.id, { question, answer });
      onFAQUpdate();
    } else {
      // Update translation
      const translations = {
        ...selectedFAQ.translations,
        [editLang]: { question, answer }
      };

      await faqStorage.update(selectedFAQ.id, { translations });
      onFAQUpdate();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">FAQ Administration</h1>
        
        <div className="flex gap-4 mb-4">
          <select
            value={selectedFAQ?.id || ''}
            onChange={(e) => {
              const faq = faqs.find((f) => f.id === e.target.value);
              setSelectedFAQ(faq || null);
              if (faq) {
                setQuestion(faq.question);
                setAnswer(faq.answer);
              } else {
                setQuestion('');
                setAnswer('');
              }
            }}
            className="border rounded p-2"
          >
            <option value="">New FAQ</option>
            {faqs.map((faq) => (
              <option key={faq.id} value={faq.id}>
                {faq.question}
              </option>
            ))}
          </select>

          <select
            value={editLang}
            onChange={(e) => {
              const lang = e.target.value as Language;
              setEditLang(lang);
              if (selectedFAQ) {
                if (lang === 'en') {
                  setQuestion(selectedFAQ.question);
                  setAnswer(selectedFAQ.answer);
                } else {
                  const translation = selectedFAQ.translations[lang];
                  setQuestion(translation?.question || '');
                  setAnswer(translation?.answer || '');
                }
              }
            }}
            className="border rounded p-2"
          >
            {Object.entries(SUPPORTED_LANGUAGES).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question
            </label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Answer
            </label>
            <Editor content={answer} onChange={setAnswer} />
          </div>

          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}