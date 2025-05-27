import React, { useState, useEffect } from 'react';

const MultilingualTranslator = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('auto');
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [isTranslating, setIsTranslating] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [synonyms, setSynonyms] = useState([]);

  // Language codes mapping
  const languages = {
    'af': 'Afrikaans', 'sq': 'Albanian', 'ar': 'Arabic', 'hy': 'Armenian', 'az': 'Azerbaijani',
    'eu': 'Basque', 'be': 'Belarusian', 'bn': 'Bengali', 'bg': 'Bulgarian', 'ca': 'Catalan',
    'zh': 'Chinese', 'hr': 'Croatian', 'cs': 'Czech', 'da': 'Danish', 'nl': 'Dutch',
    'en': 'English', 'et': 'Estonian', 'fi': 'Finnish', 'fr': 'French', 'gl': 'Galician',
    'ka': 'Georgian', 'de': 'German', 'el': 'Greek', 'gu': 'Gujarati', 'ht': 'Haitian Creole',
    'he': 'Hebrew', 'hi': 'Hindi', 'hu': 'Hungarian', 'is': 'Icelandic', 'id': 'Indonesian',
    'ga': 'Irish', 'it': 'Italian', 'ja': 'Japanese', 'kn': 'Kannada', 'kk': 'Kazakh',
    'ko': 'Korean', 'la': 'Latin', 'lv': 'Latvian', 'lt': 'Lithuanian', 'mk': 'Macedonian',
    'ms': 'Malay', 'mt': 'Maltese', 'no': 'Norwegian', 'fa': 'Persian', 'pl': 'Polish',
    'pt': 'Portuguese', 'ro': 'Romanian', 'ru': 'Russian', 'sr': 'Serbian', 'sk': 'Slovak',
    'sl': 'Slovenian', 'es': 'Spanish', 'sw': 'Swahili', 'sv': 'Swedish', 'ta': 'Tamil',
    'te': 'Telugu', 'th': 'Thai', 'tr': 'Turkish', 'uk': 'Ukrainian', 'ur': 'Urdu',
    'vi': 'Vietnamese', 'cy': 'Welsh', 'yi': 'Yiddish'
  };

  // Enhanced language to voice mapping
  const languageVoiceMapping = {
    'en': ['en-US', 'en-GB', 'en-AU', 'en-CA'],
    'es': ['es-ES', 'es-MX', 'es-AR', 'es-US'],
    'fr': ['fr-FR', 'fr-CA', 'fr-CH'],
    'de': ['de-DE', 'de-AT', 'de-CH'],
    'it': ['it-IT', 'it-CH'],
    'pt': ['pt-BR', 'pt-PT'],
    'ru': ['ru-RU'],
    'ja': ['ja-JP'],
    'ko': ['ko-KR'],
    'zh': ['zh-CN', 'zh-TW', 'zh-HK'],
    'ar': ['ar-SA', 'ar-EG', 'ar-AE'],
    'hi': ['hi-IN'],
    'nl': ['nl-NL', 'nl-BE'],
    'sv': ['sv-SE'],
    'no': ['nb-NO', 'nn-NO'],
    'da': ['da-DK'],
    'fi': ['fi-FI'],
    'pl': ['pl-PL'],
    'tr': ['tr-TR'],
    'he': ['he-IL'],
    'th': ['th-TH'],
    'vi': ['vi-VN'],
    'uk': ['uk-UA'],
    'cs': ['cs-CZ'],
    'hu': ['hu-HU'],
    'ro': ['ro-RO'],
    'sk': ['sk-SK'],
    'bg': ['bg-BG'],
    'hr': ['hr-HR'],
    'sl': ['sl-SI'],
    'et': ['et-EE'],
    'lv': ['lv-LV'],
    'lt': ['lt-LT'],
    'mt': ['mt-MT'],
    'ga': ['ga-IE'],
    'cy': ['cy-GB'],
    'is': ['is-IS'],
    'mk': ['mk-MK'],
    'sq': ['sq-AL'],
    'eu': ['eu-ES'],
    'gl': ['gl-ES'],
    'ca': ['ca-ES'],
    'af': ['af-ZA'],
    'sw': ['sw-KE', 'sw-TZ'],
    'ms': ['ms-MY'],
    'id': ['id-ID'],
    'tl': ['tl-PH'],
    'bn': ['bn-IN', 'bn-BD'],
    'gu': ['gu-IN'],
    'kn': ['kn-IN'],
    'ta': ['ta-IN', 'ta-LK'],
    'te': ['te-IN'],
    'ur': ['ur-PK', 'ur-IN'],
    'fa': ['fa-IR'],
    'el': ['el-GR'],
    'be': ['be-BY'],
    'ka': ['ka-GE'],
    'hy': ['hy-AM'],
    'az': ['az-AZ'],
    'kk': ['kk-KZ']
  };

  // Sample synonyms database
  const synonymsDatabase = {
    'good': ['excellent', 'great', 'wonderful', 'fine', 'nice'],
    'bad': ['awful', 'terrible', 'horrible', 'poor', 'dreadful'],
    'big': ['large', 'huge', 'enormous', 'giant', 'massive'],
    'small': ['tiny', 'little', 'miniature', 'petite', 'compact'],
    'happy': ['joyful', 'cheerful', 'delighted', 'pleased', 'content'],
    'sad': ['unhappy', 'sorrowful', 'melancholy', 'dejected', 'gloomy'],
    'fast': ['quick', 'rapid', 'swift', 'speedy', 'hasty'],
    'slow': ['sluggish', 'gradual', 'leisurely', 'delayed', 'unhurried'],
    'beautiful': ['gorgeous', 'stunning', 'lovely', 'attractive', 'pretty'],
    'ugly': ['hideous', 'unattractive', 'unsightly', 'repulsive', 'grotesque']
  };

  // Show message with auto-remove
  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  // Handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      let text = '';
      
      if (file.type === 'text/plain') {
        text = await file.text();
      } else {
        showMessage('Only TXT files are supported in this demo. Please copy and paste your text.', 'error');
        return;
      }
      
      setInputText(text);
      showMessage('File uploaded successfully!', 'success');
    } catch (error) {
      showMessage('Error reading file: ' + error.message, 'error');
    }
  };

  // Fallback language detection
  const fallbackLanguageDetection = (text) => {
    const commonWords = {
      'en': ['the', 'and', 'is', 'in', 'to', 'of', 'a', 'that', 'it', 'with'],
      'es': ['el', 'la', 'de', 'que', 'y', 'en', 'un', 'es', 'se', 'no'],
      'fr': ['le', 'de', 'et', 'à', 'un', 'il', 'être', 'en', 'avoir', 'que'],
      'de': ['der', 'die', 'und', 'in', 'den', 'von', 'zu', 'das', 'mit', 'sich'],
      'it': ['il', 'di', 'che', 'e', 'la', 'per', 'un', 'in', 'con', 'del'],
      'pt': ['o', 'de', 'a', 'e', 'do', 'da', 'em', 'um', 'para', 'é'],
      'ru': ['в', 'и', 'не', 'на', 'я', 'быть', 'он', 'с', 'что', 'а'],
      'zh': ['的', '一', '是', '在', '不', '了', '有', '和', '人', '这'],
      'ja': ['の', 'に', 'は', 'を', 'た', 'が', 'で', 'て', 'と', 'し'],
      'ar': ['في', 'من', 'إلى', 'على', 'هذا', 'هذه', 'التي', 'الذي', 'كان', 'كانت']
    };

    const words = text.toLowerCase().split(/\s+/);
    let bestMatch = 'en';
    let maxScore = 0;

    for (const [lang, commonWordsArray] of Object.entries(commonWords)) {
      const score = words.filter(word => commonWordsArray.includes(word)).length;
      if (score > maxScore) {
        maxScore = score;
        bestMatch = lang;
      }
    }

    // Additional pattern checks
    if (text.match(/[а-яё]/i)) bestMatch = 'ru';
    else if (text.match(/[α-ωΑ-Ω]/)) bestMatch = 'el';
    else if (text.match(/[أ-ي]/)) bestMatch = 'ar';
    else if (text.match(/[あ-んア-ンひらがなカタカナ]/)) bestMatch = 'ja';
    else if (text.match(/[一-龯]/)) bestMatch = 'zh';

    setSourceLanguage(bestMatch);
    showMessage(`Detected language: ${languages[bestMatch]}`, 'success');
  };

  // Detect language
  const detectLanguage = async () => {
    if (!inputText.trim()) {
      showMessage('Please enter some text to detect language.', 'error');
      return;
    }

    try {
      fallbackLanguageDetection(inputText);
    } catch (error) {
      showMessage('Language detection failed.', 'error');
    }
  };

  // Translate text
  const translateText = async () => {
    if (!inputText.trim()) {
      showMessage('Please enter text to translate.', 'error');
      return;
    }

    if (sourceLanguage === targetLanguage) {
      setOutputText(inputText);
      showMessage('Source and target languages are the same.', 'success');
      return;
    }

    setIsTranslating(true);

    try {
      const langPair = sourceLanguage === 'auto' ? `auto|${targetLanguage}` : `${sourceLanguage}|${targetLanguage}`;
      const encodedText = encodeURIComponent(inputText);
      const apiUrl = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=${langPair}`;
      
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      if (data.responseStatus === 200 && data.responseData) {
        let translatedText = data.responseData.translatedText;
        translatedText = translatedText.replace(/^\[.*?\]\s*/, '');
        
        setOutputText(translatedText);
        showMessage('Translation completed successfully!', 'success');
        setSynonyms([]);
      } else {
        throw new Error(data.responseDetails || 'Translation service error');
      }
      
    } catch (error) {
      showMessage('Translation failed. Please check your internet connection and try again.', 'error');
      console.error('Translation error:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  // Enhanced speech function with multi-language support
  const speakText = () => {
    if (!outputText.trim()) {
      showMessage('No text to speak.', 'error');
      return;
    }

    if ('speechSynthesis' in window) {
      // Stop any ongoing speech
      speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(outputText);
      
      // Get available voices
      const voices = speechSynthesis.getVoices();
      
      // Find the best voice for the target language
      const findBestVoice = () => {
        const targetLangCodes = languageVoiceMapping[targetLanguage] || [targetLanguage];
        
        for (const langCode of targetLangCodes) {
          // Try exact match first
          let voice = voices.find(v => v.lang === langCode);
          if (voice) return voice;
          
          // Try partial match (e.g., 'en' matches 'en-US')
          voice = voices.find(v => v.lang.startsWith(langCode.split('-')[0]));
          if (voice) return voice;
        }
        
        // Try language code without region
        const baseLang = targetLanguage.split('-')[0];
        let voice = voices.find(v => v.lang.startsWith(baseLang));
        if (voice) return voice;
        
        // Fallback to default voice
        return voices.find(v => v.default) || voices[0];
      };

      const selectedVoice = findBestVoice();
      
      if (selectedVoice) {
        utterance.voice = selectedVoice;
        utterance.lang = selectedVoice.lang;
        showMessage(`Speaking in ${selectedVoice.name} (${selectedVoice.lang})`, 'success');
      } else {
        utterance.lang = targetLanguage;
        showMessage(`Speaking in ${languages[targetLanguage] || targetLanguage}`, 'success');
      }
      
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      // Add error handling
      utterance.onerror = (event) => {
        showMessage('Speech synthesis error: ' + event.error, 'error');
      };
      
      utterance.onend = () => {
        showMessage('Speech completed', 'success');
      };
      
      speechSynthesis.speak(utterance);
    } else {
      showMessage('Speech synthesis not supported in this browser.', 'error');
    }
  };

  // Find synonyms
  const findSynonyms = () => {
    if (!outputText.trim()) {
      showMessage('No translated text to analyze.', 'error');
      return;
    }

    if (targetLanguage !== 'en') {
      showMessage('Synonyms are currently only supported for English text.', 'error');
      return;
    }

    const words = outputText.toLowerCase().match(/\b\w+\b/g) || [];
    const foundSynonyms = [];

    words.forEach(word => {
      if (synonymsDatabase[word]) {
        foundSynonyms.push({
          word: word.charAt(0).toUpperCase() + word.slice(1),
          synonyms: synonymsDatabase[word]
        });
      }
    });

    setSynonyms(foundSynonyms);

    if (foundSynonyms.length === 0) {
      showMessage('No synonyms found for the words in this text.', 'error');
    } else {
      showMessage('Synonyms found and displayed!', 'success');
    }
  };

  // Load voices when component mounts
  useEffect(() => {
    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        speechSynthesis.getVoices();
      };
      
      loadVoices();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 p-5">
      <div className="max-w-6xl mx-auto bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 text-center">
          <h1 className="text-4xl font-light mb-2">Multilingual Text Translator</h1>
          <p className="text-lg opacity-90">Translate text, upload files, and discover synonyms with AI-powered language detection</p>
        </div>

        {/* Message Display */}
        {message.text && (
          <div className={`m-6 p-4 rounded-lg ${
            message.type === 'error' 
              ? 'bg-red-50 text-red-700 border border-red-200' 
              : 'bg-green-50 text-green-700 border border-green-200'
          }`}>
            {message.text}
          </div>
        )}

        {/* Main Content */}
        <div className="p-8 grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Input Text</h2>
            
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full h-48 p-4 border-2 border-gray-200 rounded-xl resize-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
              placeholder="Enter text to translate or upload a file..."
            />

            <div className="mt-4">
              <input
                type="file"
                id="fileInput"
                accept=".txt"
                onChange={handleFileUpload}
                className="hidden"
              />
              <label
                htmlFor="fileInput"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
              >
                📁 Upload File (TXT)
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Source Language</label>
                <select
                  value={sourceLanguage}
                  onChange={(e) => setSourceLanguage(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                >
                  <option value="auto">Auto Detect</option>
                  {Object.entries(languages).map(([code, name]) => (
                    <option key={code} value={code}>{name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Language</label>
                <select
                  value={targetLanguage}
                  onChange={(e) => setTargetLanguage(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                >
                  {Object.entries(languages).map(([code, name]) => (
                    <option key={code} value={code}>{name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={detectLanguage}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
              >
                🔍 Detect Language
              </button>
              <button
                onClick={translateText}
                disabled={isTranslating}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isTranslating ? '🔄 Translating...' : '🌐 Translate'}
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Translated Text</h2>
            
            <textarea
              value={outputText}
              readOnly
              className="w-full h-48 p-4 border-2 border-gray-200 rounded-xl resize-none bg-gray-50"
              placeholder="Translation will appear here..."
            />

            <div className="flex gap-3 mt-6">
              <button
                onClick={speakText}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
              >
                🔊 Speak
              </button>
              <button
                onClick={findSynonyms}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
              >
                📚 Find Synonyms
              </button>
            </div>
          </div>
        </div>

        {/* Synonyms Section */}
        <div className="mx-8 mb-8 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Synonyms & Word Alternatives</h2>
          <div className="max-h-64 overflow-y-auto bg-gray-50 rounded-xl p-4">
            {synonyms.length === 0 ? (
              <p className="text-center text-gray-500 italic">Synonyms will appear here after translation...</p>
            ) : (
              <div className="space-y-4">
                {synonyms.map((item, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="font-semibold text-indigo-600 mb-2">{item.word}</div>
                    <div className="text-gray-600 text-sm">{item.synonyms.join(', ')}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultilingualTranslator;