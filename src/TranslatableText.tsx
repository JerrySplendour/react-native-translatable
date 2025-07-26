import React, { useEffect, useState } from 'react';
import { Text, TextProps, NativeModules, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import translate from 'translate-google-api';

// type for props passed to TranslatableText
type TranslatableTextProps = {
  lang?: string;
  children: React.ReactNode;
} & TextProps;

const TranslatableText: React.FC<TranslatableTextProps> = ({ lang, children, ...restProps }: TranslatableTextProps) => {
  const [translatedText, setTranslatedText] = useState<string | undefined>(undefined);

  const translate_to_lang = async (_lang:any, _children:any) => {
    try {
      let storedTranslation = await AsyncStorage.getItem(`translation_${_lang}_${_children.toString()}`);
      if (!storedTranslation) {
        const translationResult_ = await translate(_children.toString(), { to: _lang });
        const translationResult = translationResult_[0]
        setTranslatedText(translationResult);
        await AsyncStorage.setItem(`translation_${_lang}_${_children.toString()}`, translationResult);
      } else {
        setTranslatedText(storedTranslation);
      }
    } catch (error) {
      console.error('Error translating text:', error);
      setTranslatedText(_children.toString());  // Fallback to original text in case of error
    }
  }

  useEffect(() => {
    const fetchTranslation = async () => {
      let language = lang;

      if (!lang || lang === '') {
        // Fetch device language if no language is specified
        const deviceLanguage = Platform.OS === 'ios'
          ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13+
          : NativeModules.I18nManager.localeIdentifier;
        language = deviceLanguage.split('_')[0]; // Extract language code
      }
      translate_to_lang(language, children);
    };

    fetchTranslation();
  }, [lang, children]);

  return (
    <Text {...restProps}>
      {translatedText !== undefined ? translatedText : children}
    </Text>
  );
};




export default TranslatableText;