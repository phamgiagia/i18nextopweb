const fs = require('fs').promises;
const path = require('path');

async function addTranslationKey(category, key, enValue, frValue) {
    const localesDir = path.join(__dirname, '');
    const enFilePath = path.join(localesDir, 'en.json');
    const frFilePath = path.join(localesDir, 'fr.json');

    try {
        // Read existing translation files
        const [enContent, frContent] = await Promise.all([
            fs.readFile(enFilePath, 'utf8'),
            fs.readFile(frFilePath, 'utf8')
        ]);

        // Parse JSON content
        const enTranslations = JSON.parse(enContent);
        const frTranslations = JSON.parse(frContent);

        // Add new key to the specified category
        if (!enTranslations[category]) enTranslations[category] = {};
        if (!frTranslations[category]) frTranslations[category] = {};

        enTranslations[category][key] = enValue;
        frTranslations[category][key] = frValue;

        // Write updated translations back to files
        await Promise.all([
            fs.writeFile(enFilePath, JSON.stringify(enTranslations, null, 2)),
            fs.writeFile(frFilePath, JSON.stringify(frTranslations, null, 2))
        ]);

        console.log(`Successfully added new key '${category}.${key}' to translation files.`);
    } catch (error) {
        console.error('Error adding new translation key:', error);
    }
}

// Get command line arguments
const args = process.argv.slice(2);

if (args.length !== 4) {
    console.log('Usage: node addTranslationKey.js <category> <key> <enValue> <frValue>');
    process.exit(1);
}

const [category, key, enValue, frValue] = args;

// Call the function with command line arguments
addTranslationKey(category, key, enValue, frValue);
// node addTranslationKey.cjs common greeting "Hello" "Bonjour"
// node v2.cjs common greeting "Happy"