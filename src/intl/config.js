import manageTranslations from 'react-intl-translations-manager';

manageTranslations({
    messagesDirectory: 'src/intl/messages',
    translationsDirectory: 'src/intl/locales',
    languages: ['lv', 'ru'],
});
