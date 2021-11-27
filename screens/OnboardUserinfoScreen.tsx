import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Image, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toggleUserValid } from '../store/actions/UserActions'
import Input from './../components/Input';
import { State } from 'react-native-gesture-handler';
import { updateUser } from './../store/actions/UserActions'

const OnboardUserinfoScreen = (props: any) => {

  const isValid = useSelector((state: any) => state.user.isValid) // the subscription
  const dispatch = useDispatch(); // helps to dispatch an action


  // const changeProfileImage = () => {
  //    props.src = '../assets/6d38ab105ed32e0c25e4f82e1e9ccd2a.png'; // not working
  // }


  const [fullName, setChangeEmail] = useState(''); // lift up
  const [fullNameValid, setNameValid] = useState(false);

  const [studyProgramme, setChangePassword] = useState("");
  const [studyProgrammeValid, setPasswordValid] = useState(false);
  
  const userInfoId = useSelector((state: any) => state.user?.loggedInUser?.id );
  console.log('User', userInfoId)
  /*      const userInfo = useSelector((state:any) => state.user.loggedInUser);
       console.log('vi kigger efter den her',userInfo) */
  const handleOnboardingUser = () => {
    dispatch(updateUser(fullName, studyProgramme, userInfoId, isValid, props));
    //dispatch(toggleUserValid(!isValid))
    // skifter fortegnet på boolean. action creater toggle happy.
  }

  return (
    <View style={styles.container}>

      <Text>Is User done with onboarding? {String(isValid)}</Text>
      {/* <Button title="Flip user done" onPress={handleOnboardingUser} /> */}
      <View style={styles.imgWrap}>
      </View>
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
          error="Email not valid"
          secure={false}
          text={fullName} nameValid={fullNameValid}
          onValid={(valid: any) => setNameValid(valid)}
          setContent={(content: any) => setChangeEmail(content)} />

        <Input label="STUDY programme"
          placeholder="Select from list"
          error="Password not valid"
          secure={true}
          text={studyProgramme} nameValid={studyProgrammeValid}
          onValid={(valid: any) => setPasswordValid(valid)}
          setContent={(content: any) => setChangePassword(content)} />
      </View>


      <TouchableOpacity onPress={handleOnboardingUser}>
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

  imgWrap: {
    width: 133,
    marginTop: 40,
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
    marginBottom: 40,
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