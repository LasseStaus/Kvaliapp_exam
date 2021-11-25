import React from 'react';
import { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';


interface Props {
    label: string;
    text: string;
    placeholder: string;
    error: string;
    nameValid: boolean;
    secure: boolean;
    onValid: (arg: boolean) => void;
    setContent: (arg: string) => void; 
}

const Input = ( {label='My default value', placeholder, secure, text, error, nameValid, onValid, setContent} : Props)  => {
    const [touched, setTouched] = useState(false);

    const handleNewInput = (enteredText: string) => {
        setTouched(true);
        enteredText === '' ? onValid(false) : onValid(true);
        setContent(enteredText);
    };

   return (
      <View style={styles.container}>
          <Text style={styles.label}>{label}</Text>
          <TextInput value={text} 
        
          style={styles.textInput}
            placeholder={placeholder}
            secureTextEntry={secure}
            onChangeText={handleNewInput}
            onBlur={() => setTouched(true)}></TextInput>
            {!nameValid && touched && <Text>{error}</Text>}
            
      </View>
   );
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
    },
   textInput: {
       paddingBottom: 5,
   }, label: {
       textTransform: 'uppercase',
       fontSize: 12,
       fontFamily: 'TekoMedium',
       fontWeight:'bold',
       color: '#32305D'
   }
});

export default Input;