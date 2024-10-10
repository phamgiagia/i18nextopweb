const fs = require('fs').promises;
const path = require('path');
const { translate } = require('@vitalets/google-translate-api');

async function addTranslationKey(category, key, enValue) {
    const localesDir = path.join(__dirname, '');

    try {
        // Get all JSON files in the directory
        const files = await fs.readdir(localesDir);
        const jsonFiles = files.filter(file => path.extname(file) === '.json');

        for (const file of jsonFiles) {
            const filePath = path.join(localesDir, file);
            const content = await fs.readFile(filePath, 'utf8');
            const translations = JSON.parse(content);

            // Add new key to the specified category
            if (!translations[category]) translations[category] = {};

            if (file === 'en.json') {
                translations[category][key] = enValue;
            } else {
                // Translate the English value to the target language
                const targetLang = path.parse(file).name; // e.g., 'fr' from 'fr.json'
                const { text } = await translate(enValue, { to: targetLang });
                translations[category][key] = text;
            }

            // Write updated translations back to file
            await fs.writeFile(filePath, JSON.stringify(translations, null, 2));
        }

        console.log(`Successfully added new key '${category}.${key}' to all translation files.`);
    } catch (error) {
        console.error('Error adding new translation key:', error);
    }
}

// Get command line arguments
const args = process.argv.slice(2);
if (args.length !== 3) {
    console.log('Usage: node addTranslationKey.js <category> <key> <enValue>');
    process.exit(1);
}

const [category, key, enValue] = args;

// Call the function with command line arguments
addTranslationKey(category, key, enValue);