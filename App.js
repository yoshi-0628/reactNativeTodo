import React, { useState } from 'react';
import { Provider as PaperProvider, DefaultTheme, DarkTheme } from 'react-native-paper';
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'


const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    backdrop: '#3498db',
  },
  dark: false
};

const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#272727'
  },
  dark: true
}

export default function App(props) {
  const [darkFlg, setDarkFlg] = useState(false);
  return (
    <PaperProvider theme={darkFlg ? darkTheme : theme}>
      <Header nav={() => setDarkFlg(!darkFlg)} flg={darkFlg} />
      <HomeScreen />
    </PaperProvider>
  );
}