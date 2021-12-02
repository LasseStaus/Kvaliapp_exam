import React from 'react';
import {StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import EventsScreen from './EventsScreen';
const HomeScreen = props => {
       const userInfo = useSelector((state) => state.user?.loggedInUser );
        React.useEffect(() => {
         console.log('Loggedinuser', userInfo);
      }, [userInfo]); 
       return (
        <EventsScreen></EventsScreen>

 );
}

const styles = StyleSheet.create({
 
});

export default HomeScreen;