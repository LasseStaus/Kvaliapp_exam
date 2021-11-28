import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from './../screens/ChatScreen';
import ChatMessagesScreen from './../screens/ChatMessagesScreen';

const Stack = createNativeStackNavigator();

export default function ChatStackNavigator() {
    return (
        <Stack.Navigator >
            <Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'Chat' }} />
            <Stack.Screen name="ChatMessages" component={ChatMessagesScreen}
                options={{ title: 'Chat Messages' }} />
        </Stack.Navigator>
    )
};