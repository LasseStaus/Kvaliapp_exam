import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Events from '../components/Events';

import {fetchEvents } from './../store/actions/EventAction';
import defaultStyles from './../GeneralStyles';

const EventsScreen = props => {

   const events = useSelector(state => state.event.events); // state is defined // event: EventReducer in app.js // Initialstate events: []
   
   const dispatch = useDispatch(); // helps to dispatch an action

   React.useEffect(() => { // peform side effects inside funtion
    /*   console.log("fetching events"); */
      dispatch(fetchEvents()); // fetch events from EventsActions.js
   }, []);

   

   return (
      <View style={styles.container} >

{/*LINE SEPERATOR // MAYBE IT SHOULD BE IN EVENT.JS COMPONENT INSTEAD*/}

   <View style={{flexDirection: 'row', marginTop: 30, alignItems: 'center'}}>
    <View style={{flex: 0.8, height: 1, backgroundColor: 'rgba(0, 0, 0, 0.51)'}} />
    <View>
    <Text style={{width: 100, textAlign: 'center', fontSize: 12, fontWeight: 'bold', color:  'rgba(0, 0, 0, 0.51)'}}>1st of April</Text>
    </View>
    <View style={{flex: 9, height: 1, backgroundColor:  'rgba(0, 0, 0, 0.51)'}} />
    </View>
   {/*LINE SEPERATOR END // MAYBE IT SHOULD BE IN EVENT.JS COMPONENT INSTEAD*/}
       
          <View>
          <FlatList
            data={events}
            renderItem={itemData => (
                <Events event={itemData.item}></Events>
            )}
            keyExtractor={item => item.eventId}
        />
        
        </View>

        
      </View>

      
 );
}

const styles = StyleSheet.create({
   container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
   },

   flatListWrapper: {
      width: 300,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: 'red',
   },
   
});

export default EventsScreen;