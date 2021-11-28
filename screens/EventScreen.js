import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import defaultStyles from './../GeneralStyles';;

const EventScreen = props => {
   
   const { id } = props.route.params;
   const singleEvent = useSelector(state => state.event.events).find(singleEvent => singleEvent.eventId === id); // state is defined // event: EventReducer in app.js // Initialstate events: []
/*    console.log(singleEvent.eventName); */
   // const chatMessages = useSelector(state => state.chat.chatRooms).find(room => room.chatRoomId === id).messages;

   return (

      <View style={styles.container}>
          <Image
          style={styles.tinyLogo}
          // source={props.event.imageUrl}/>
          source={require('./../assets/6d38ab105ed32e0c25e4f82e1e9ccd2a.png')}/>
          <Text> {singleEvent.eventName} </Text>
      </View>
      
      
 
 );
}

const styles = StyleSheet.create({
   container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
   },
   
});

export default EventScreen;