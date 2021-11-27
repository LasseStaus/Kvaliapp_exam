import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupScreen from '../screens/SignupScreen';
import OnboardUserinfoScreen from '../screens/OnboardUserinfoScreen';
import NotificationScreen from '../screens/NotificationScreen'
import AppTutorialScreen1 from '../screens/appTutorialScreen1';
import AppTutorialScreen2 from '../screens/appTutorialScreen2';
import AppTutorialScreen3 from '../screens/appTutorialScreen3';

const Stack = createNativeStackNavigator();

export default function SignupOnboardStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SIGNUP" component={SignupScreen}  />
            <Stack.Screen name="OnboardUserinfoScreen" component={OnboardUserinfoScreen}  />
            <Stack.Screen name="NotificationScreen" component={NotificationScreen}  />
            <Stack.Screen name="AppTutorialScreen1" component={AppTutorialScreen1} options={{ headerShown: false }} />
            <Stack.Screen name="AppTutorialScreen2" component={AppTutorialScreen2} options={{ headerShown: false }} />
            <Stack.Screen name="AppTutorialScreen3" component={AppTutorialScreen3} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
};