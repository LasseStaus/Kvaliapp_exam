import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ChatRoom = props => {
    const navigation = useNavigation(); 

    const lastPos = props.chatroom.messages.length-1;
    let lastMessageText, displayTime = '';
    if (lastPos > -1) {
        lastMessageText = props.chatroom.messages[lastPos].messageText;
        const lastTime = props.chatroom.messages[lastPos].messageTimestamp;

        // Should only do this if on the same date as today...
        displayTime = lastTime.getHours() + ":" +lastTime.getMinutes();
    }
    return (
    <TouchableOpacity onPress={() => navigation.navigate("ChatMessages", {id: props.chatroom.chatRoomId})}>
        <View style={styles.chatRoom}>
        
            <View style={styles.imageView}>

            <Image  style={styles.messageImage} source={require('../assets/imgs/default-user-img.png')}  />
            </View>
            <View style={styles.textView}>
                <Text style={styles.text}>{props.chatroom.chatRoomName}</Text>
                <Text ellipsizeMode='tail' numberOfLines={1}>{lastMessageText}</Text>
            </View>
            <View style={styles.dotView}>
                <View style={styles.dot}></View>
                <Text>{displayTime}</Text>
            </View>
        </View>
    </TouchableOpacity>
 );
}

const styles = StyleSheet.create({
    chatRoom: {
  
        flexDirection: 'row',
        height: 80,
 
        justifyContent:'flex-start',
        width: 390,
        backgroundColor: "grey",
        borderWidth: 5,
        marginBottom:5,
        marginTop:5,
        
    },
    messageImage: {
     
        width: 90, 
        height: 80, 
        borderRadius: 50,
        alignSelf:'center',
        justifyContent:'center',
        resizeMode: "contain",
           },

    textView: {
        justifyContent:'space-between',
        flexDirection: 'column',
        paddingTop: 15,
        paddingBottom:15,
    
    },
    message: {
        
    },
    text: {
         fontWeight: "bold",
    },
    dotView: {
    
        
    },
    imageView: {

    },
    dot: {
     height: 12,
     width: 12,
     backgroundColor: '#5050A5',
     borderRadius: 100 / 2,
   },
    tinyLogo: {
     width: 50,
     height: 50,
   },
 });
export default ChatRoom;