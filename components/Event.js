import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import TimeIcon from './TimeIcon';
import LocationIcon from './LocationIcon';
import InformationIcon from './InfoIcon';


const Events = props => {
    const navigation = useNavigation(); 
    console.log(props.event.eventId);
    let image = props.event.imageUrl
    return (

    <View>

  
        
      
        <TouchableOpacity onPress={() => navigation.navigate("Event", {id: props.event.eventId})}>

      

        <View style={styles.flatListWrapper}>
            
        <Image
         style={styles.iconsLike}
         // source={props.event.imageUrl}/>
         source={require('./../assets/imgs/rating.png')}/> 
        
        <View style={styles.Box}/>

        <LinearGradient
        // Background Linear Gradient
        colors={['rgba(0,0,0,0.8)', 'black']}
        style={styles.background}
      />
       
            <View style={styles.imageView} >
                <Image
                    style={styles.tinyLogo}
                    // source={props.event.imageUrl}/>
                    source={require('./../assets/imgs/eventbackground1.png')}/>
            
            </View>
            
            <Text style={styles.text}>{props.event.eventName}</Text>
            <Text style={styles.textSmall}>{props.event.eventType}</Text>
            <View style={styles.timeLocationWrap}>
            <View style={styles.flexRow}><Text style={styles.textTime}>{props.event.eventTime}</Text></View>
            <View style={styles.flexRow}><Text style={styles.textLocation}>{props.event.eventLocation}</Text></View>
      

       </View>
        </View>

        <View style={styles.iconView} >
                <Image
                    style={styles.iconsTime}
                    // source={props.event.imageUrl}/>
                    source={require('./../assets/imgs/alarmclock.png')}/>
            
            </View>

            <View style={styles.iconView}>
                <Image
                    style={styles.iconsLocation}
                    // source={props.event.imageUrl}/>
                    source={require('./../assets/imgs/marker.png')}/>
            
            </View>

        
        
    </TouchableOpacity>
    </View>
    
 );
}

const styles = StyleSheet.create({

    flexRow: {
        flexDirection: 'column',
    },

    Box: {
        backgroundColor: 'rgba(80, 80, 165, 1)',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderRadius: 0,
        width: 37,
        height: 37,
        position: 'absolute',
        marginLeft: 280,
/*         alignSelf: 'flex-end',*/        
        zIndex: 9,
    },  

    icons: {
        width: 10,
        height: 10,
    },

    iconsLike: {
        marginTop: 12,
        marginLeft: 292,
        width: 13.5,
        height: 13,
        position: 'absolute',
        zIndex: 10,
    },

    iconsTime: {
        marginTop: -36,
        marginLeft: 12,
        width: 10,
        height: 10,
        position: 'absolute',
    },

    iconsLocation: {
        marginTop: -20,
        marginLeft: 12,
        width: 10,
        height: 15,
        position: 'absolute',
    },

    iconView: {
        flex: 1,
    },
    event: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        
    },

    background: {
        
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            width: 337,
            height: 175,
            borderRadius: 5,
            borderBottomRightRadius: 5,
            borderBottomLeftRadius: 5,
            

        },

    flatListWrapper: {
        width: 337,
        height: 175,
        borderRadius: 5,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        marginTop: 20,
        backgroundColor: 'white',

        
        
     },
    textView: {
        paddingLeft: 5,
        paddingRight: 5,
        width: '80%',
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 20,
    },
    message: {
        
    },
    text: {
        fontFamily: 'TekoMedium',
         color: 'snow',
         fontSize: 26,
         position: 'absolute',
         marginTop: 90,
         margin: 11,
    },

    textSmall: {
        color: 'rgba(255, 255, 255, 1)',
        fontSize: 12,
        position: 'relative',
        marginTop: -55,
        margin: 12,
        fontWeight: 'bold',
    },

    textTime: {
        color: 'rgba(255, 255, 255, 1)',
        fontSize: 12,
        position: 'relative',
        marginTop: -90,
        marginLeft: 30,
        margin: 12,
        fontWeight: 'bold',
    },
    textLocation: {
        color: 'rgba(255, 255, 255, 1)',
        fontSize: 12,
        position: 'relative',
        marginTop: -73,
        marginLeft: 30,
        margin: 12,
    },

    timeLocationWrap: {
        marginTop: 80,
    },


    dotView: {
         marginLeft: 'auto'
        
    },
    imageView: {
        marginTop: 0,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderRadius: 5,
        opacity: 0.5,
        
              
        
    },
    dot: {
     height: 12,
     width: 12,
     backgroundColor: '#5050A5',
     borderRadius: 100 / 2,
   },
    tinyLogo: {
     width: 337,
     height: 175,
     borderRadius: 5,
   },
 });
export default Events;