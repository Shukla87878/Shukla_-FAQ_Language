import { FAQ, Language } from '../types/faq';

// In-memory storage for FAQs
let faqs: FAQ[] = [
  {
    id: '1',
    question: 'What is this FAQ system?',
    answer: 'This is a multilingual FAQ system that supports multiple languages including English, Hindi, and Bengali.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    translations: {
      hi: {
        question: 'यह FAQ सिस्टम क्या है?',
        answer: 'यह एक बहुभाषी FAQ सिस्टम है जो अंग्रेजी, हिंदी और बंगाली सहित कई भाषाओं का समर्थन करता है।'
      },
      bn: {
        question: 'এই FAQ সিস্টেম কি?',
        answer: 'এটি একটি বহুভাষিক FAQ সিস্টেম যা ইংরেজি, হিন্দি এবং বাংলা সহ একাধিক ভাষা সমর্থন করে।'
      }
    }
  }
];

export const faqStorage = {
  getAll: async (): Promise<FAQ[]> => {
    return faqs;
  },

  create: async (faq: Omit<FAQ, 'id' | 'created_at' | 'updated_at'>): Promise<FAQ> => {
    const newFaq: FAQ = {
      ...faq,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    faqs = [...faqs, newFaq];
    return newFaq;
  },

  update: async (id: string, faq: Partial<FAQ>): Promise<FAQ | null> => {
    const index = faqs.findIndex(f => f.id === id);
    if (index === -1) return null;

    const updatedFaq: FAQ = {
      ...faqs[index],
      ...faq,
      id,
      updated_at: new Date().toISOString()
    };
    faqs[index] = updatedFaq;
    return updatedFaq;
  }
};