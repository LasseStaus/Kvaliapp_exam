import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupOnboardStackNavigator from './SignupOnboardStackNavigator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatStackNavigator from './ChatStackNavigator';
import EventStackNavigator from './EventStackNavigator';
import HomeScreen from './../screens/HomeScreen';
import DiscoverScreen from './../screens/DiscoverScreen';
import MenuScreen from './../screens/MenuScreen';
import { HeaderShownContext } from '@react-navigation/elements';
import SignupScreen from './../screens/SignupScreen';
import LoginScreen from './../screens/LoginScreen';
import { useSelector } from 'react-redux';
import { useFonts } from 'expo-font';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { renderNode } from 'react-native-elements/dist/helpers';

const Navigation = props => {
    
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();
    const loggedInUser = useSelector(state => state.user.loggedInUser);
        const isValid = useSelector(state => state.user.isValid);



    const [loaded] = useFonts({TekoMedium: require('../assets/fonts/Teko-Medium.ttf'), TekoLight: require('../assets/fonts/Teko-Light.ttf')} );
        if (!loaded) {return null;}

    return (
    <NavigationContainer>
        { isValid !== false && loggedInUser !== undefined  ? (
          
        
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'DiscoverOuter') {
              iconName = focused ? 'search' : 'search-outline';
            }else if (route.name === 'ChatOuter') {
                iconName = focused ? 'ios-chatbubbles' : 'ios-chatbubbles-outline';
              } else if (route.name === 'Menu') {
                iconName = focused ? 'menu' : 'menu-outline';
              } 
              else if (route.name === 'Menu') {
                iconName = focused ? 'menu' : 'menu-outline';
              } 
                
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#5050A5',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { 
     
            backgroundColor: 'white',
            },
            tabBarLabelStyle: {
                fontFamily: "TekoMedium",
              textTransform: 'uppercase',
              fontWeight: 'bold'
            },
            headerTitleStyle: {

            },
            headerStyle: {
             
            }
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
 
        <Tab.Screen name="DiscoverOuter" component={EventStackNavigator} options={{ title: 'DISCOVER', headerShown: false }} />
        <Tab.Screen name="ChatOuter" component={ChatStackNavigator}options={{ title: 'CHAT' , headerShown: false }}  />
        <Tab.Screen name="Menu" component={MenuScreen} />
        </Tab.Navigator>

    ) : (

        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SIGNUPOUTER" component={SignupOnboardStackNavigator} options={{ title: 'SIGNUP' , headerShown: false }} />

        </Stack.Navigator>
    
    )}
    </NavigationContainer>
 );
}

const styles = StyleSheet.create({
  
 
});

export default Navigation;