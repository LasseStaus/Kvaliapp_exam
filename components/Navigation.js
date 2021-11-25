import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatStackNavigator from './ChatStackNavigator';
import HomeScreen from './../screens/HomeScreen';
import DiscoverScreen from './../screens/DiscoverScreen';
import MenuScreen from './../screens/MenuScreen';
import { HeaderShownContext } from '@react-navigation/elements';
import SignupScreen from './../screens/SignupScreen';
import LoginScreen from './../screens/LoginScreen';
import { useSelector } from 'react-redux';
import { useFonts } from 'expo-font';

const Navigation = props => {
    
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();
    const loggedInUser = useSelector(state => state.user.loggedInUser);




    const [loaded] = useFonts({TekoMedium: require('../assets/fonts/Teko-Medium.ttf'), TekoLight: require('../assets/fonts/Teko-Light.ttf')} );
        if (!loaded) {return null;}

    return (
    <NavigationContainer>
        {loggedInUser !== undefined ? (
        
        <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Discover" component={DiscoverScreen} />
        <Tab.Screen name="ChatOuter" component={ChatStackNavigator} />
        <Tab.Screen name="Menu" component={MenuScreen} />
        </Tab.Navigator>

    ) : (

        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
    
    )}
    </NavigationContainer>
 );
}

const styles = StyleSheet.create({
 
});

export default Navigation;