import 'react-native-gesture-handler';

import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes';
import AppProvider from './hooks';

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="dark-content" backgroundColor="#f2f2f2" />
    <AppProvider>
      <View style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
        <Routes />
      </View>
    </AppProvider>
  </NavigationContainer>
);

export default App;
