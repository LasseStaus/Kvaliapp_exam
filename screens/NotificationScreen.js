import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
// DISPATCH
import { useDispatch } from 'react-redux';
// IMAGE
import ImageNotificationScreen from '../components/ImageNotificationScreen';
// BUTTONS 
import { TouchableOpacity } from 'react-native-gesture-handler';
import { updateNotificationOnboardFlow } from '../store/actions/UserActions';
import { useSelector } from 'react-redux';
import { set } from 'react-native-reanimated';
const NotificationScreen = props => {

       // dispatch
       const dispatch = useDispatch();

          // useState  
    const [someThing, someThingElse] = useState(''); // lift up
    const userInfo = useSelector((state) => state.user?.loggedInUser);

       const handleNotifications = () => {
            dispatch(updateNotificationOnboardFlow(true, userInfo, props )); 
       }
     
       React.useEffect(() => {
         console.log('ligem her', userInfo);
       
      }, [userInfo]);
 return (
    <View style={styles.container}>
         <View style={styles.imgWrap}>
        <ImageNotificationScreen />
       
        </View>
        <View style={styles.headLineWrapper}>
        <Text style={styles.headLine} >Stay in the loop</Text>
        <Text style={styles.inLine} >Enable notifications to stay updated on new messages and more.</Text>
        </View>


        <TouchableOpacity onPress={handleNotifications}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Turn on notifications</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={ () =>  props.navigation.navigate('AppTutorialScreen1') }>
          <View style={styles.laterButton}>
            <Text style={styles.laterButtonText}>Maybe later</Text>
          </View>
        </TouchableOpacity>






    </View>

    
 );
}

// STYLING

const styles = StyleSheet.create({
    container: {
         flex: 1,
         justifyContent: 'center',
         alignItems: 'center',
         backgroundColor: 'white',    

    },

    inLine: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: '#32305D',
        fontSize: 12,
        fontWeight: 'normal',
        marginRight: 0,
        width: 300,
        marginTop: 10,
    
    },

    imgWrap: {
        width: 200,
        marginTop: 30,
        marginBottom: 20,
        
    },

    wrapper: {
        backgroundColor: 'white',
        width: 300,
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 2,
            },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        height: 239,
        borderRadius: 5,
        marginBottom: 40,
    },

    wrapperInline: {
        backgroundColor: 'transparent',
        borderColor: '#EEEEEE',
        borderStyle: 'solid',
        borderWidth: 1,
        shadowColor: '#AAAAAA29',
        width: 300,
        
    },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 4,
        borderRadius: 4,
        elevation: 3,
        width: 300,
        marginTop: 30,
        backgroundColor: 'rgba(80, 80, 165, 1)',
        color: 'snow',
      },

      buttonText: {
        textAlign: 'left',
        justifyContent: 'center',
        padding: 10,
        color: 'white',
        textTransform: 'none',
        fontWeight: 'bold',
        
        
      },

      laterButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 4,
        borderRadius: 4,
        elevation: 3,
        width: 300,
        marginTop: 30,
        backgroundColor: 'rgba(51, 51, 51, 0.1)',
        color: 'snow',
      },

      laterButtonText: {
        textAlign: 'left',
        justifyContent: 'center',
        padding: 10,
        color: 'black',
        textTransform: 'none',
        fontWeight: 'bold',
        
        
      },

      accountButton: {
          flexDirection: 'row',
          justifyContent: 'space-around',
          margin: 15,
          paddingVertical: 12,
          

      },

      accountButtonText: {

        color: '#5050A5',
        fontWeight: 'bold',
        marginLeft: 6,

      },

      accountText: {
        color: '#5050A5',

    },

      headLine: {
          flex: 0,
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          color: 'rgba(80, 80, 165, 1)',
          fontSize: 26,
          fontWeight: 'bold',
          marginRight: 0,
          marginBottom: 0,
          
      },

      headLineWrapper: {
        justifyContent: 'center',
        alignItems: 'center',

      },

      checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
       
      },


      checkboxWrapper: {
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 15,

      },

      checkbox: {
        marginBottom: 16
      },

      termsLabel: {
        textTransform: 'none',
        color: '#32305D',
        borderStyle: 'solid',
        textDecorationLine: 'none',
        fontSize: 12,
      },

      termsText: {
          textTransform: 'lowercase',
          color: '#32305D',
          borderStyle: 'solid',
          textDecorationLine: 'underline',
          fontSize: 12,
          
          
         
      },

     
    

    
 });

export default NotificationScreen;