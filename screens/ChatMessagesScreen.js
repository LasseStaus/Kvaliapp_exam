import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Image, TextInput } from 'react-native';
import { ChatRooms } from './../dummy-data/DummyData';
import ChatMessage from './../components/ChatMessage';
import { useDispatch, useSelector } from 'react-redux';
import { newChatMessage } from '../store/actions/ChatActions';
import { signup } from '../store/actions/UserActions'; // Test
import Message from '../models/Message';

const ChatMessagesScreen = props => {
    const dispatch = useDispatch();

    const { id } = props.route.params;
    // console.log(id);
    const [value, onChangeText] = useState('Write message');
// console.log(ChatRooms);
    
    //const chatMessages = ChatRooms.find(room => room.chatRoomId === id).messages;
    const chatMessages = useSelector(state => state.chat.chatRooms).find(room => room.chatRoomId === id).messages;
    const loggedInUser = useSelector(state => state.user.loggedInUser);
    

    const handleSend = () => {
        const message = new Message('',value, new Date(), loggedInUser);
        dispatch(newChatMessage(id, message));
        //dispatch(newChatMessage(id, value));
        //console.log("value " + value);
    };

    return (
    <View style={styles.container}>
            
            <View style={styles.messages}>
                <FlatList data={chatMessages} renderItem={itemData => (
                    <ChatMessage chatmessage={itemData.item} image={require('./../assets/ac99082f65d5c636e14e70785817899e.png')}></ChatMessage> 
                )} keyExtractor={item => item.messageId}></FlatList>
            </View>

            <View style={styles.inputView}>
                <Image
                    style={styles.tinyLogo}
                    source={require('./../assets/6d38ab105ed32e0c25e4f82e1e9ccd2a.png')}/>
                
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => onChangeText(text)}
                    value={value}/>

                <Button title="Send" onPress={handleSend}></Button>
            </View>
    </View>
 );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    messages: {
        flex: 1
    },
    textInput: {
        flex: 1,
        height: 40, 
        backgroundColor: 'lightgray', 
        marginLeft: 10,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginBottom: 10
    },
    inputView: {
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 5,
        
    },
    tinyLogo: {
        
        marginTop: -5
    },
});

export default ChatMessagesScreen;