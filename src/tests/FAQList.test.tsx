import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FAQList } from '../components/FAQList';
import { FAQ, Language } from '../types/faq';

const mockFAQs: FAQ[] = [
  {
    id: '1',
    question: 'What is this?',
    answer: 'This is a test FAQ.',
    created_at: '2024-02-25T00:00:00Z',
    updated_at: '2024-02-25T00:00:00Z',
    translations: {
      hi: {
        question: 'यह क्या है?',
        answer: 'यह एक परीक्षण FAQ है।',
      },
    },
  },
];

describe('FAQList', () => {
  it('renders FAQs in selected language', () => {
    const onLanguageChange = (lang: Language) => {};
    
    // Test English
    render(
      <FAQList
        faqs={mockFAQs}
        currentLang="en"
        onLanguageChange={onLanguageChange}
      />
    );
    expect(screen.getByText('What is this?')).toBeDefined();
    
    // Test Hindi
    render(
      <FAQList
        faqs={mockFAQs}
        currentLang="hi"
        onLanguageChange={onLanguageChange}
      />
    );
    expect(screen.getByText('यह क्या है?')).toBeDefined();
  });

  it('toggles FAQ answers', () => {
    const onLanguageChange = (lang: Language) => {};
    
    render(
      <FAQList
        faqs={mockFAQs}
        currentLang="en"
        onLanguageChange={onLanguageChange}
      />
    );
    
    // Answer should be hidden initially
    expect(screen.queryByText('This is a test FAQ.')).toBeNull();
    
    // Click to show answer
    fireEvent.click(screen.getByText('What is this?'));
    expect(screen.getByText('This is a test FAQ.')).toBeDefined();
    
    // Click again to hide
    fireEvent.click(screen.getByText('What is this?'));
    expect(screen.queryByText('This is a test FAQ.')).toBeNull();
  });
});