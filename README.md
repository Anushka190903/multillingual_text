## 🌐 Multilingual Text Translator with File Upload and Synonym Enhancer(By Python)
An intelligent translation tool built using Python and Tkinter, offering multilingual text translation, file input support (TXT, PDF, DOCX), speech synthesis, and synonym enhancement.

## 🚀 Features
🔤 Automatic Language Detection using langdetect

🌍 Translation Support for over 100 languages via Google Translate API

📁 File Upload Support (TXT, PDF, DOCX)

🔈 Text-to-Speech Output using gTTS and pygame

📚 Synonym Enhancer using WordNet from NLTK (for English)

🖥️ User-Friendly GUI built with tkinter

## 🌐 Responsive Web Interface (optional) based on the provided HTML for web deployment (static prototype)

## 🖼️ Screenshot of the interface
![Interface](https://raw.githubusercontent.com/Anushka190903/multillingual_text/refs/heads/main/inter.jpg)

## 🛠️ Installation
Python Requirements
bash
Copy
Edit
pip install googletrans==4.0.0-rc1
pip install langdetect
pip install gtts
pip install nltk
pip install PyPDF2
pip install python-docx
pip install pygame
Also run:

## python
Copy
Edit
import nltk
nltk.download('wordnet')
nltk.download('omw-1.4')
📂 File Structure
hih.py – Main Python application with GUI and logic

hih.html – Optional static web interface design (HTML/CSS/JS)

inter.jpg – Interface screenshot

## 🧠 How It Works
Input Text or Upload a File (PDF, DOCX, TXT)

Detect the language automatically or manually select source/target languages.

Translate the text using Google Translate API.

Listen to translated text using gTTS.

Retrieve synonyms (only for English outputs).

## 🔄 Example
Input:
pgsql
Copy
Edit
Hello my name is Anu
Output (Hindi):
Copy
Edit
हेलो मेरा नाम अनु है
❗ Notes
Internet connection is required for translation and speech synthesis.

Synonyms are only supported when the target language is English.

PDF and DOCX support requires proper formatting for accurate text extraction.

📌 TODO
Improve synonym support for other languages.

Integrate web interface with backend functionality.

Add translation history and export options.

## Multilingual Text Translator (React Frontend)
A beautifully styled React-based frontend for a multilingual translation app that allows users to translate text, upload documents, detect languages, speak translations, and explore English synonyms.

## ✨ Features
🧠 AI-powered Language Detection

🌍 Text Translation across 100+ languages

📁 File Upload Support: .txt, .pdf, .docx

🔊 Text-to-Speech for translated text

📚 Synonym Explorer for English words

## 💅 Responsive UI with modern gradients and animated interactions

## 🖥️ Tech Stack
React (intended final structure)

HTML5/CSS3/JavaScript (prototype in current state)

APIs:

MyMemory Translation API

LibreTranslate (Fallback)

DetectLanguage API (planned)

## 🚧 Current Status
The UI is currently written in static HTML (hih.html) but is designed for conversion to a full React application. It includes modular structure hints, interactive controls, and styled components, ready for integration with a backend API.

## 📁 File Structure (Planned React)
bash
Copy
Edit
/src
  /components
    Translator.jsx
    LanguageSelector.jsx
    FileUploader.jsx
    SynonymExplorer.jsx
  /styles
    App.css
App.jsx
index.jsx
🧪 Getting Started (after React conversion)
bash
Copy
Edit
npx create-react-app translator-app
cd translator-app
# Copy HTML elements into JSX components under /src/components
npm install axios
npm start
🖼️ UI Preview

## 🔧 To-Do
Convert hih.html into modular React components

Hook up APIs to dynamic inputs

Add voice selection in TTS

## Build backend (optional: Flask/FastAPI for translation proxy and file handling)
## ![Interface](https://raw.githubusercontent.com/Anushka190903/multillingual_text/refs/heads/main/inter2.jpg)
