import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatStackNavigator from './components/ChatStackNavigator';
import HomeScreen from './screens/HomeScreen';
import DiscoverScreen from './screens/DiscoverScreen';
import MenuScreen from './screens/MenuScreen';
import { HeaderShownContext } from '@react-navigation/elements';

import { createStore, combineReducers } from 'redux';
import ChatReducer from './store/reducers/ChatReducer';
import { Provider } from 'react-redux';

export default function App() {

  const rootReducer = combineReducers({
    chat: ChatReducer,
    //user: UserReducer,
    //posts: PostReducer
  });

  const store = createStore(rootReducer);

const Tab = createBottomTabNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Discover" component={DiscoverScreen} />
          <Tab.Screen name="ChatOuter" component={ChatStackNavigator} />
          <Tab.Screen name="Menu" component={MenuScreen} />
        </Tab.Navigator>
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
