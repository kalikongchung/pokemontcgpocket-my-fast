const fs = require('fs').promises;
const path = require('path');
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

const API_TOKEN = 'eS6UhZC954_QKNdIv19kNkD4fxS2-r4Jc_yra607';
const ACCOUNT_ID = '957ee08bc711090f295102f2916c2c22';
const MODEL = '@cf/meta/m2m100-1.2b';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function run(text, targetLanguage) {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/run/${MODEL}`,
    {
      headers: { 
        Authorization: `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        text: text,
        target_lang: targetLanguage
      }),
    }
  );
  const result = await response.json();
  console.log('API Response:', JSON.stringify(result, null, 2));
  return result;
}

async function translateValue(value, targetLanguage) {
  const response = await run(value, targetLanguage);
  
  if (!response.success || !response.result || !response.result.translated_text) {
    console.error('Unexpected API response:', response);
    throw new Error('Unexpected API response format');
  }

  return response.result.translated_text.trim();
}

async function translateSection(section, targetLanguage) {
  if (Array.isArray(section)) {
    const translatedArray = [];
    for (const item of section) {
      if (typeof item === 'string') {
        translatedArray.push(await translateValue(item, targetLanguage));
      } else if (typeof item === 'object' && item !== null) {
        translatedArray.push(await translateSection(item, targetLanguage));
      } else {
        translatedArray.push(item);
      }
    }
    return translatedArray;
  }

  if (typeof section === 'object' && section !== null) {
    const translatedObject = {};
    for (const [key, value] of Object.entries(section)) {
      if (typeof value === 'string') {
        translatedObject[key] = await translateValue(value, targetLanguage);
      } else if (typeof value === 'object' && value !== null) {
        translatedObject[key] = await translateSection(value, targetLanguage);
      } else {
        translatedObject[key] = value;
      }
    }
    return translatedObject;
  }

  return section;
}

async function translateJsonOptimized(sourceJson, targetLanguage) {
  const translatedJson = {};

  for (const [key, value] of Object.entries(sourceJson)) {
    if (key === 'LanguageSwitcher') {
      // Don't translate the LanguageSwitcher object
      translatedJson[key] = value;
    } else if (key === 'FAQ') {
      // Special handling for FAQ section
      translatedJson[key] = await translateFAQSection(value, targetLanguage);
    } else if (typeof value === 'object' && value !== null) {
      // Translate entire sections
      translatedJson[key] = await translateSection(value, targetLanguage);
    } else {
      // For any top-level strings, translate individually
      translatedJson[key] = typeof value === 'string' ? await translateValue(value, targetLanguage) : value;
    }
  }

  return translatedJson;
}

async function translateFAQSection(faqSection, targetLanguage) {
  const translatedFAQ = { ...faqSection };
  
  // Translate title and subtitle
  translatedFAQ.title = await translateValue(faqSection.title, targetLanguage);
  translatedFAQ.subtitle = await translateValue(faqSection.subtitle, targetLanguage);

  // Keep original faqList structure, only translate values
  translatedFAQ.faqList = faqSection.faqList;

  // Translate individual question-answer pairs
  for (const [key, value] of Object.entries(faqSection)) {
    if (key !== 'title' && key !== 'subtitle' && key !== 'faqList') {
      translatedFAQ[key] = await translateValue(value, targetLanguage);
    }
  }

  return translatedFAQ;
}

if (isMainThread) {
  async function translateAllLanguages() {
    // const languages = ['ar','da','de','fr','pl','sv','tr']
    const languages = [ 'es', 'it', 'pt', 'nl', 'ru', 'ja', 'ko', 'zh','hi','fi']
    // const languages = ['de', 'fr', 'es', 'it', 'pt', 'nl', 'pl', 'ru', 'ja', 'ko', 'zh', 'ar', 'hi', 'tr', 'sv', 'da', 'fi'];
    const sourceJson = JSON.parse(await fs.readFile(path.join(__dirname, 'messages', 'en.json'), 'utf-8'));

    const workerPromises = languages.map(lang => {
      return new Promise((resolve, reject) => {
        const worker = new Worker(__filename, {
          workerData: { lang, sourceJson }
        });

        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
          if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
        });
      });
    });

    try {
      await Promise.all(workerPromises);
      console.log('All translations completed successfully.');
    } catch (error) {
      console.error('Error in translation process:', error);
    }
  }

  translateAllLanguages().catch(console.error);
} else {
  // Worker thread code
  async function workerTranslate() {
    const { lang, sourceJson } = workerData;
    try {
      console.log(`Translating to ${lang}...`);
      const translatedJson = await translateJsonOptimized(sourceJson, lang);
      await fs.writeFile(path.join(__dirname, 'messages', `${lang}.json`), JSON.stringify(translatedJson, null, 2));
      console.log(`${lang}.json created successfully.`);
      parentPort.postMessage(`Translation to ${lang} completed`);
    } catch (error) {
      console.error(`Error translating to ${lang}:`, error);
      parentPort.postMessage(`Error translating to ${lang}: ${error.message}`);
    }
  }

  workerTranslate().catch(error => {
    console.error('Worker error:', error);
    parentPort.postMessage(`Worker error: ${error.message}`);
  });
}