import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ChatRoom = (props) => {
 /*   let image;
    image = <Image
    style={styles.tinyLogo}
    source={ props.imageUrl } /> */

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
                <Image
                    style={styles.tinyLogo}
                    //IMG FROM DB
                    //source={props.chatroom.imageUrl}

                    //HARDCODED IMG
                     source={{
                        uri: 'https://pbs.twimg.com/profile_images/882154870014439424/hVdbTvdZ_400x400.jpg',
                      }} 
                   
                                                  />
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
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 20,
        paddingRight: 20
    },
    textView: {
        paddingLeft: 5,
        paddingRight: 5,
        width: '80%'
    },
    message: {
        
    },
    text: {
         fontWeight: "bold",
    },
    dotView: {
         marginLeft: 'auto'
        
    },
    imageView: {
        marginTop: -10
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
     borderRadius: 100,
   },
 });
export default ChatRoom;