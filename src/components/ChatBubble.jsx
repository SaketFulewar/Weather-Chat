export default function ChatBubble({ message, isUser }) {
  // Handle typing indicator
  if (typeof message === 'object' && message.isTyping) {
    return (
      <div className="flex justify-start">
        <div className="bg-gray-100 border border-gray-200 rounded-lg rounded-bl-none px-4 py-3 shadow-sm">
          <div className="flex space-x-1 items-center">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  // Get message properties
  const messageText = typeof message === 'object' ? message.message : message;
  const isError = typeof message === 'object' && message.isError;
  const isStreaming = typeof message === 'object' && message.isStreaming;

  // Sanitize and highlight weather keywords
  const formatMessage = (text) => {
    if (!text) return '';

    // Clean up the text - remove extra quotes and escape sequences
    let cleanText = text
      .replace(/\\n/g, '\n')
      .replace(/""/g, '"')
      .replace(/^"|"$/g, '')
      .replace(/\*\*/g, '')
      .replace(/\\\//g, '/')
      .replace(/"/g, '')  // <-- removes all double quotes
      .trim();
  

    // Weather keywords with their highlight colors
    const weatherKeywords = {
      'thunderstorm': 'bg-purple-100 text-purple-700 border-purple-200',
      'rain': 'bg-blue-100 text-blue-700 border-blue-200',
      'drizzle': 'bg-blue-100 text-blue-700 border-blue-200',
      'snow': 'bg-gray-100 text-gray-700 border-gray-200',
      'sunny': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'cloudy': 'bg-gray-100 text-gray-700 border-gray-200',
      'fog': 'bg-gray-100 text-gray-700 border-gray-200',
      'clear': 'bg-cyan-100 text-cyan-700 border-cyan-200',
      '°C': 'bg-orange-100 text-orange-700 border-orange-200',
      '°F': 'bg-orange-100 text-orange-700 border-orange-200',
      'temperature': 'bg-red-100 text-red-700 border-red-200',
      'humidity': 'bg-teal-100 text-teal-700 border-teal-200',
      'wind': 'bg-green-100 text-green-700 border-green-200',
      'km/h': 'bg-green-100 text-green-700 border-green-200',
      'pressure': 'bg-indigo-100 text-indigo-700 border-indigo-200',
      'visibility': 'bg-cyan-100 text-cyan-700 border-cyan-200'
    };

    // Split text into lines
    const lines = cleanText.split('\n');

    return lines.map((line, lineIndex) => {
      if (!line.trim()) return <div key={lineIndex} className="h-2" />;

      // Split line into words and highlight keywords
      const words = line.split(' ');
      const processedWords = words.map((word, wordIndex) => {
        const cleanWord = word.toLowerCase().replace(/[.,!?;:]$/, '');
        const matchedKeyword = Object.keys(weatherKeywords).find(keyword =>
          cleanWord === keyword.toLowerCase() || word.includes(keyword)
        );

        if (matchedKeyword) {
          return (
            <span
              key={`${lineIndex}-${wordIndex}`}
              className={`inline-block px-2 py-0.5 mx-0.5 rounded-md text-xs font-medium border ${weatherKeywords[matchedKeyword]}`}
            >
              {word}
            </span>
          );
        }

        return word + ' ';
      });

      return (
        <div key={lineIndex} className="my-1 leading-relaxed">
          {processedWords}
        </div>
      );
    });
  };

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div className="flex items-start gap-3 max-w-3xl">

        {!isUser && (
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
          </div>
        )}

        <div
          className={`px-4 py-3 rounded-2xl shadow-sm break-words leading-relaxed
            ${isUser
              ? "bg-blue-600 text-white rounded-br-md ml-auto"
              : isError
                ? "bg-red-50 text-red-700 border border-red-200 rounded-bl-md"
                : "bg-gray-50 text-gray-800 border border-gray-200 rounded-bl-md"
            }`}
        >
          {messageText ? formatMessage(messageText) : ''}
          {isStreaming && (
            <span className="inline-block w-0.5 h-5 bg-current animate-pulse ml-1 align-bottom">|</span>
          )}
        </div>

        {isUser && (
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}