import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Input from './../components/Input';
import { updateUser } from './../store/actions/UserActions'

const OnboardUserinfoScreen = (props: any) => {


  const dispatch = useDispatch(); 

  const [fullName, setChangeEmail] = useState(''); // lift up
  const [fullNameValid, setNameValid] = useState(false);

  const [studyProgramme, setChangePassword] = useState("");
  const [studyProgrammeValid, setPasswordValid] = useState(false);
  
  const userInfo = useSelector((state: any) => state.user?.loggedInUser );

  const handleUpdateUser = () => {
    dispatch(updateUser(fullName, studyProgramme, userInfo, props));
  }


  const something= ()=> {
    console.log("hej")

  }

  return (
    <View style={styles.container}>
<Image
        style={styles.tinyLogo}
        source = {require('./../assets/imgs/logo.png')} />
      <View ><Text style={styles.headLine}>Before we start...</Text></View>
      <View style={styles.profileimgcontainer}>
        <Image source={require('../assets/imgs/default-user-img.png')} style={styles.imageSelect} />
        <TouchableOpacity>
          <Text style={styles.placeHolder}>Profile picture</Text>
          <View style={styles.smallbutton}>
            <Pressable>
              <Text style={styles.buttonText}>Upload</Text>
            </Pressable>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.wrapper}>
        <Input label="WHAT IS YOUR NAME"
          placeholder="First name and last name"
          error="Enter your name"
          secure={false}
          removeError={something}
          text={fullName} nameValid={fullNameValid}
          onValid={(valid: any) => setNameValid(valid)}
          setContent={(content: any) => setChangeEmail(content)} />

        <Input label="STUDY programme"
          placeholder="Select from list"
          error="Enter a study programme"
          secure={false}
          removeError={something}
          text={studyProgramme} nameValid={studyProgrammeValid}
          onValid={(valid: any) => setPasswordValid(valid)}
          setContent={(content: any) => setChangePassword(content)} />
      </View>
      <TouchableOpacity onPress={handleUpdateUser}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Next</Text>
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
  imageSelect: {
    height: 70,
    width: 70,
    borderRadius: 50,
  },
  infoIcon: {
    flexDirection: 'row',
  },
  tinyLogo: {
    height: 110,
    marginBottom: 30,
    marginTop:15,
    alignSelf:'center'
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
    borderRadius: 5,
    marginBottom: 20,
  },

  wrapperInline: {
    backgroundColor: 'transparent',
    borderColor: '#EEEEEE',
    borderStyle: 'solid',
    borderWidth: 1,
    shadowColor: '#AAAAAA29',
    width: 300,
    height: 70,
  },
  button: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderRadius: 4,
    elevation: 3,
    width: 300,
    backgroundColor: '#5050A5',
    color: 'snow',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  smallbutton: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingVertical: 3,
    paddingHorizontal: 4,
    borderRadius: 4,
    elevation: 3,
    width: 140,
    backgroundColor: '#5050A5',
    color: 'snow',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  buttonText: {
    textAlign: 'left',
    justifyContent: 'flex-start',
    padding: 10,
    color: 'white',
    textTransform: 'capitalize',
    fontWeight: 'bold',
    fontSize: 16,
  },
  headLine: {
    textAlign: 'left',
    color: '#32305D',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: "TekoMedium",
    width: 300
  },

  textInput: {
    borderWidth: 1,
    padding: 10,
    width: 298,
    borderColor: 'white',


  },

  errorMsg: {
    color: "red",
    margin: 12,
    marginTop: 1,
  },

  placeHolder: {
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 12,
    color: '#32305D',
    textTransform: 'uppercase',
    paddingHorizontal: 12,
    marginTop: 10,

  },
  profileimgcontainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    width: 300,
    marginBottom: 30
  },

  profileimg: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginTop: -5,
  },


});
export default OnboardUserinfoScreen;