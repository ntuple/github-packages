import clientSideLang from 'next-translate/clientSideLang';

export const getLanguage = () => (clientSideLang ? clientSideLang() : 'en');

export const localizedString = (string, lang) => {
  return string.replace(/__locale__/g, lang);
};
