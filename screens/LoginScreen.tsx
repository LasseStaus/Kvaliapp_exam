import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput,Image, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { login, refreshToken, restoreUser } from '../store/actions/UserActions';
import * as SecureStore from 'expo-secure-store';
import Input from './../components/Input';
import { useSelector } from 'react-redux';
import { toggleUserValid } from './../store/actions/UserActions'

const LoginScreen = (props:any)  => {

    const dispatch = useDispatch();
    const goToForgotPassword = () => {
      console.log("switch page")
  }
  const isValid = useSelector((state:any) => state.user.isValid)
    const handleLogin = () => {
      dispatch(toggleUserValid(!isValid));
      dispatch(login(changeEmail, changePassword));
    }
    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
          let userToken, user, expiration, refreshTokenString;

          try {
             expiration = new Date(JSON.parse(await SecureStore.getItemAsync('expiration') as string));
  
/*             expiration = SecureStore.getItemAsync("expiration").then((value) => {
              console.log("Get Value >> ", value);
           }); */
            
            // if expiration.....
            console.log("expiration", expiration);
            console.log("now", new Date());

// hvis now er senere end experience, så reload token

            if (expiration < new Date()) { // then it is expired
              refreshTokenString = (await SecureStore.getItemAsync('refreshToken') as string);
              console.log("refresh token", refreshTokenString);
                dispatch(refreshToken(refreshTokenString));
            } else {
              dispatch(toggleUserValid(!isValid))
            }
      
            userToken = await SecureStore.getItemAsync('userToken');
            user = JSON.parse(await SecureStore.getItemAsync('user') as string);
            
            // console.log(userToken);
            // console.log(user);
            // console.log(expiration);
          } catch (e) {
            // Restoring token failed
            console.log("restore token failed");
            console.log(e);
          }

           dispatch(restoreUser(user, userToken));  
        };
    
        bootstrapAsync();
      }, []);
      const [changeEmail, setChangeEmail] = useState(''); // lift up
      const [emailValid, setNameValid] = useState(false);
      
            const [changePassword, setChangePassword] = useState("");
            const [passwordValid, setPasswordValid] = useState(false);

    return (
      <View style={styles.container}>
          <Image
        style={styles.tinyLogo}
        source = {require('./../assets/imgs/logo.png')} />

    <Text style={styles.loginHeader}>Log in</Text>
<View style={styles.loginWrapper}>  
         <Input label="E-mail"
            placeholder = "Enter your email"
            error="Email not valid"
            secure={false}
            text={changeEmail} nameValid={emailValid}
            onValid={ (valid: any) => setNameValid(valid)}
            setContent={ (content: any) => setChangeEmail(content)}/>

<Input label="Password"
            placeholder = "Enter your password"
            error="Password not valid"
            secure={true}
            text={changePassword} nameValid={passwordValid}
            onValid={ (valid: any) => setPasswordValid(valid)}
            setContent={ (content: any) => setChangePassword(content)}/>
</View>
<Text style={styles.link} onPress={goToForgotPassword}>Forgot password?</Text>
<Pressable  style={styles.authenticationButton}  onPress={handleLogin}>
            <Text style={styles.buttonText}>Log in</Text>
        </Pressable>
        <Text style={styles.text}>Don't have an account? <Text style={styles.link} onPress={ () => props.navigation.navigate('SIGNUPOUTER') }>Sign up</Text></Text>
          
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'flex-start',
    marginLeft: 20,
    marginRight: 20,
    color: '#32305D',
    fontFamily: 'TekoMedium',
    justifyContent: 'center',

},  
enabled: {
   backgroundColor: 'black',
},
text:{
  alignSelf:'center',
  fontSize: 12,
  color: '#32305D',

},

checkBoxContainer: {
   flexDirection: 'row',
   justifyContent: 'center', //Centered vertically
   alignItems: 'center', // Centered horizontally

},
link: {


  justifyContent: 'center', //Centered vertically
 alignItems: 'center', // Centered horizontally

fontWeight:'bold',
alignSelf:'center',
fontSize: 12,
 marginTop: 30,
 marginBottom:30,
  color: '#32305D'


},
tinyLogo: {
   height: 110,
   marginBottom: 30,
   marginTop:15,
   alignSelf:'center'
},
loginHeader: {
   fontWeight: '200',
   color: '#32305D',
   fontSize: 22,
   fontFamily: 'TekoMedium',
   textAlign: 'left',
   marginBottom: 15,
   


},
buttonText: {
color: 'white',
textAlign: 'left',
fontWeight:'bold'
},

loginInput: {
   borderColor: 'black',
  padding: 10,
   borderWidth: 1,
},
loginWrapper: {
   justifyContent: 'center',
   backgroundColor: 'white',
   alignSelf: 'stretch',
   shadowColor: "#000",
   shadowOffset: {
     width: 0,
     height: 2,
       },
   shadowOpacity: 0.25,
   shadowRadius: 3.84,
   borderRadius: 5,
   padding: 10,
   fontWeight: 'bold'
  
},
authenticationButton: {
   backgroundColor: '#5050A5',
   alignSelf: 'stretch',
   justifyContent: 'center',
   textAlign: 'center',
   padding: 20,
   borderRadius: 4,
  
   marginBottom:30,




},
authenticationButtonInactive: {
   backgroundColor: '#5050A5',
   alignSelf: 'stretch',
   justifyContent: 'center',
   textAlign: 'center',
   padding: 20,
   borderRadius: 4,
   opacity: 0.5,



}
    
 });
 

export default LoginScreen;