import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from './../store/actions/UserActions';
import { useSelector } from 'react-redux';
import { toggleUserValid } from './../store/actions/UserActions';

const MenuScreen = props => {
   const dispatch = useDispatch();
   // const [changeName, setChangeName] = useState(profileInfo.name);
   // const [nameValid, setNameValid] = useState(false);
   const isValid = useSelector(state => state.user.isValid)
   const isnotvalid = () => {
      dispatch(toggleUserValid(!isValid)) // skifter fortegnet på boolean. action creater toggle happy.
      }
      
   return (
      <View style={styles.container}>
         <Text>Menu screen</Text>
         
         {/* <Input label="Username"
            error="Please fill out your name"
            text={changeName} nameValid={nameValid}
            onValid={ (valid: any) => setNameValid(valid)}
            setContent={ (content: any) => setChangeName(content)}/> */}

         <Button title="Log out" onPress={() => dispatch(logout(), isnotvalid()
            )}></Button>
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

export default MenuScreen;