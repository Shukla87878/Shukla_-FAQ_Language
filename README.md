# Multilingual FAQ System

A modern FAQ system built with React, TypeScript, and Supabase, featuring multi-language support and a WYSIWYG editor.

## Features

- 🌐 Multi-language support (English, Hindi, Bengali)
- 📝 Rich text editor for FAQ answers
- 🔒 Secure authentication and authorization
- 💾 Efficient caching with Supabase
- 🎨 Beautiful and responsive UI
- ✅ Comprehensive test coverage

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up Supabase:
   - Click the "Connect to Supabase" button in the top right
   - Copy the environment variables to your `.env` file

4. Start the development server:
   ```bash
   npm run dev
   ```

## API Usage

The system provides a REST API through Supabase's auto-generated endpoints:

```typescript
// Fetch FAQs in English (default)
const { data: faqs } = await supabase.from('faqs').select('*');

// Fetch and display in a different language
const { data: faqs } = await supabase.from('faqs').select('*');
const hindi_faqs = faqs.map(faq => ({
  ...faq,
  question: faq.translations.hi?.question || faq.question,
  answer: faq.translations.hi?.answer || faq.answer,
}));
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Testing

Run the test suite:

```bash
npm run test
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.