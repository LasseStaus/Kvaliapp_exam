import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupScreen from '../screens/SignupScreen';
import OnboardUserinfoScreen from '../screens/OnboardUserinfoScreen';
import NotificationScreen from '../screens/NotificationScreen'
import AppTutorialScreen1 from '../screens/appTutorialScreen1';
import AppTutorialScreen2 from '../screens/appTutorialScreen2';
import AppTutorialScreen3 from '../screens/appTutorialScreen3';
import TermsAndConditionsScreen from '../screens/termsAndConditions';

const Stack = createNativeStackNavigator();

export default function SignupOnboardStackNavigator() {
    return (
        <Stack.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'home'
                            : 'home-outline';
                    } else if (route.name === 'DiscoverOuter') {
                        iconName = focused ? 'search' : 'search-outline';
                    } else if (route.name === 'ChatOuter') {
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
            <Stack.Screen name="SIGNUP" component={SignupScreen} />
            <Stack.Screen name="Terms" component={TermsAndConditionsScreen} />
            <Stack.Screen name="OnboardUserinfoScreen" component={OnboardUserinfoScreen} />
            <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
            <Stack.Screen name="AppTutorialScreen1" component={AppTutorialScreen1} options={{ headerShown: false }} />
            <Stack.Screen name="AppTutorialScreen2" component={AppTutorialScreen2} options={{ headerShown: false }} />
            <Stack.Screen name="AppTutorialScreen3" component={AppTutorialScreen3} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
};