import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import Controller from './Controller';
import { useFonts } from 'expo-font';
// import { LogBox } from 'react-native';
// LogBox.ignoreAllLogs()



export default function App() {
  const [fontsLoaded] = useFonts({
    'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-SemiBold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
  });


  if (!fontsLoaded) {
    return <View />;
  } else {
  return (
    <Provider store={store}>
       <Controller />
    </Provider>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
