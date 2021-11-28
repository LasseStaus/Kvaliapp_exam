import React, { useState } from 'react';
import { View, Text,  StyleSheet,  Image, TouchableOpacity, Pressable } from 'react-native';
import { CheckBox, Icon,  } from 'react-native-elements';

import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../store/actions/UserActions';


import Input from './../components/Input';
import { State } from 'react-native-gesture-handler';

const SignupScreen = (props: any) => {
    const [changeEmail, setChangeEmail] = useState(''); // lift up
    const [emailValid, setNameValid] = useState(false); // lift up - pass through props instead

    //const [email, onChangeEmail] = useState("");
    const [changePassword, setChangePassword] = useState("");
    const [passwordValid, setPasswordValid] = useState(false);

    const [changeConfirmPassword, setChangeConfirmPassword] = useState("");
    const [passwordConfirmValid, setPasswordConfirmValid] = useState(false);

    const [checked, setChecked] = useState(false)
    const dispatch = useDispatch();

    const handleSignup = () => {
        dispatch(signup(changeEmail, changePassword, props));
    }
    const goToTermsAndConditions = () => {
        console.log("switch page")
    }
    return (
    <View style={styles.container}>
   <Image
        style={styles.tinyLogo}
        source = {require('./../assets/imgs/logo.png')} />
    <Text style={styles.loginHeader}>Sign up to get access</Text>
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
        <Input label="Repeat Password"
            placeholder = "Confirm password"
            secure={true}
            error={"Password not valid"}
            text={changeConfirmPassword} nameValid={passwordConfirmValid}
            onValid={ (valid: any) => setPasswordConfirmValid(valid)}
            setContent={ (content: any) => setChangeConfirmPassword(content)}/>
        {/* <TextInput style={defaultStyles.textInput} onChangeText={onChangeEmail} value={email} /> */}
    {/*     <TextInput style={styles.loginInput} onChangeText={setChangePassword} value={password} /> */}
        </View>
        <View style={styles.checkBoxContainer}>
        <CheckBox
            checkedColor='#32305D'
            checked={checked}
            onPress={() => setChecked(!checked)}
      />
        <Text style={styles.text}>I agree to the <Text style={styles.link} onPress={() => props.navigation.navigate('Terms')}>terms and conditions</Text></Text>
        </View>
        <Pressable disabled={!checked } style={!checked ? styles.authenticationButtonInactive: styles.authenticationButton}  onPress={handleSignup}>
            <Text style={styles.buttonText}>Get Access</Text>
        </Pressable>
        <Text style={styles.text}>Already have a user? <Text style={styles.linkBold} onPress={ () => props.navigation.navigate('Login') }>Log in</Text></Text>
    </View>
 );
}

const styles = StyleSheet.create({
    container: {
         flex: 1,
         justifyContent: 'center',
         alignItems: 'flex-start',
         marginLeft: 20,
         marginRight: 20,
         color: '#32305D',
         fontFamily: 'TekoMedium',

    },  
    enabled: {
        backgroundColor: 'black',
    },
    text: {
    alignSelf:'center',
  fontSize: 12,
  color: '#32305D',
    },
    checkBoxContainer: {
        flexDirection: 'row',
        justifyContent: 'center', //Centered vertically
        alignItems: 'center', // Centered horizontally
 
    },
    linkBold: {
      textDecorationLine: 'underline',
  fontWeight: 'bold',
       justifyContent: 'center', //Centered vertically
      alignItems: 'center', // Centered horizontally
     
       color: '#32305D'

 
    },
    link: {
        textDecorationLine: 'underline',

         justifyContent: 'center', //Centered vertically
        alignItems: 'center', // Centered horizontally
       
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
        marginBottom: 30,
     
  

    },
    authenticationButtonInactive: {
        backgroundColor: '#5050A5',
        alignSelf: 'stretch',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 20,
        borderRadius: 4,
        opacity: 0.5,
        marginBottom: 30,
     
  

    }

    
 });
 

export default SignupScreen;