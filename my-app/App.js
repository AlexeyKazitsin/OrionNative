import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CatalogScreen from './screens/CatalogScreen';
import AstronautScreen from './screens/AstronautScreen';
import {store} from './toolkit';
import {Provider} from 'react-redux'

const Stack = createNativeStackNavigator();

// для работы с редакс тулкитом надо обернуть апп.js в провайдер

export default function App() {
  return (
    <Provider store={store}> 
      <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen name='Астронавты' component={CatalogScreen} />
              <Stack.Screen name='Астронавт' component={AstronautScreen} />
          </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});