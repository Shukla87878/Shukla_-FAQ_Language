import { useState } from 'react';
import { ChevronDown, ChevronUp, Globe } from 'lucide-react';
import { FAQ, Language, SUPPORTED_LANGUAGES } from '../types/faq';

interface FAQListProps {
  faqs: FAQ[];
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export function FAQList({ faqs, currentLang, onLanguageChange }: FAQListProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Frequently Asked Questions</h1>
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5" />
          <select
            value={currentLang}
            onChange={(e) => onLanguageChange(e.target.value as Language)}
            className="border rounded p-1"
          >
            {Object.entries(SUPPORTED_LANGUAGES).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const translation = currentLang === 'en' ? faq : faq.translations[currentLang];

          return (
            <div key={faq.id} className="border rounded-lg">
              <button
                className="w-full p-4 flex justify-between items-center hover:bg-gray-50"
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span className="font-medium text-left">
                  {translation?.question || faq.question}
                </span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              {isOpen && (
                <div
                  className="p-4 pt-0 prose max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: translation?.answer || faq.answer,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}