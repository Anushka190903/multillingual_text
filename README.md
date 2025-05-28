🌐 Multilingual Text Translator with File Upload and Synonym Enhancer
An intelligent translation tool built using Python and Tkinter, offering multilingual text translation, file input support (TXT, PDF, DOCX), speech synthesis, and synonym enhancement.

🚀 Features
🔤 Automatic Language Detection using langdetect

🌍 Translation Support for over 100 languages via Google Translate API

📁 File Upload Support (TXT, PDF, DOCX)

🔈 Text-to-Speech Output using gTTS and pygame

📚 Synonym Enhancer using WordNet from NLTK (for English)

🖥️ User-Friendly GUI built with tkinter

🌐 Responsive Web Interface (optional) based on the provided HTML for web deployment (static prototype)

🖼️ Screenshot of the interface
![Interface](

🛠️ Installation
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

python
Copy
Edit
import nltk
nltk.download('wordnet')
nltk.download('omw-1.4')
📂 File Structure
hih.py – Main Python application with GUI and logic

hih.html – Optional static web interface design (HTML/CSS/JS)

inter.jpg – Interface screenshot

🧠 How It Works
Input Text or Upload a File (PDF, DOCX, TXT)

Detect the language automatically or manually select source/target languages.

Translate the text using Google Translate API.

Listen to translated text using gTTS.

Retrieve synonyms (only for English outputs).

🔄 Example
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

📄 License
MIT License
