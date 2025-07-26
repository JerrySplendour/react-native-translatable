# react-native-translatable

A React Native package for easily translating text components.

## Installation

Install the package from npm:

```sh
npm install react-native-translatable


```
or yarn:

```sh
yarn add react-native-translatable


```


## Usage

```javascript
import React from 'react';
import { View } from 'react-native';
import { TranslatableText } from 'react-native-translatable';

const App = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TranslatableText lang="fr">Hello World</TranslatableText> //expected output: Bonjour le monde
      <TranslatableText lang="es">Hello World</TranslatableText> //expected output: Hola mundo
    </View>
  );
};

export default App;
```


## Props

-	lang: Optional. Language code for translation.
-	Other props: All other props are passed through to the underlying Text component.



## License

This project is licensed under the MIT License - see the LICENSE file for details.