import React, { useEffect, useState } from 'react';
import { Text, TextProps, NativeModules, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import translate from 'translate-google-api';

// type for props passed to ReturnTranslation
type ReturnTranslationProps = {
  lang?: string;
  text: string;
};

const ReturnTranslation: React.FC<ReturnTranslationProps> = async ({ lang, text }: ReturnTranslationProps) => {
  let translatedText = undefined;
  let _lang = lang;

  if (!lang || lang === '') {
    // Fetch device language if no language is specified
    const deviceLanguage = Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13+
      : NativeModules.I18nManager.localeIdentifier;
    _lang = deviceLanguage.split('_')[0]; // Extract language code
  }
  try {
    let storedTranslation = await AsyncStorage.getItem(`translation_${_lang}_${text.toString()}`);
    if (!storedTranslation) {
      const translationResult_ = await translate(text.toString(), { to: _lang });
      const translationResult = translationResult_[0]
      translatedText = translationResult;
      await AsyncStorage.setItem(`translation_${_lang}_${text.toString()}`, translationResult);
    } else {
      translatedText = storedTranslation;
    }
  } catch (error) {
    console.error('Error translating text:', error);
    translatedText = text.toString();  // Fallback to original text in case of error
  }



  return translatedText !== undefined ? translatedText : text;
};




export default ReturnTranslation;