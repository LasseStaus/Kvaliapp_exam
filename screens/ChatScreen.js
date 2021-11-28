import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ChatRoom from './../components/ChatRoom'
import { useDispatch, useSelector } from 'react-redux';

import { toggleHappy, newChatRoom, deleteChatRoom, fetchChatRooms } from './../store/actions/ChatActions';
import defaultStyles from './../GeneralStyles';

// BUTTONS 
import { TouchableOpacity } from 'react-native-gesture-handler';

const ChatScreen = (props) => {
  const isHappy = useSelector(state => state.chat.isHappy);
  const chatRooms = useSelector(state => state.chat.chatRooms);

  const [text, onChangeText] = useState("");
  const dispatch = useDispatch();

  /*   const handleChristianHappy = () => {
       dispatch(toggleHappy(!isHappy));
    }; */
    const userinfo = useSelector(state => state.user);

  React.useEffect(() => {
    console.log("user ", userinfo);
    dispatch(fetchChatRooms());
  }, [userinfo]);



  return (
    <View style={styles.container}>

      <View style={styles.banner}>

        <Text style={styles.bannerTxt}>Enable notifications to stay in the loop</Text>
        <TouchableOpacity style={styles.smallBox} onPress={() => props.navigation.navigate('MENU')} >
          <Image style={{
            width: 20,
            height: 20,

            marginLeft: 10,




          }} source={require('./../assets/imgs/icons8-alarm.png')} />
        </TouchableOpacity>

      </View>


      <TextInput style={defaultStyles.textInput} onChangeText={onChangeText} value={text} />

      <View style={styles.flex}>
        <TouchableOpacity onPress={() => dispatch(newChatRoom(text))}>
          <View style={styles.buttonCreate}>
            <Text style={styles.buttonTextBlack}>create chatroom</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => dispatch(deleteChatRoom(text))}>
          <View style={styles.buttonDelete}>
            <Text style={styles.buttonText}>delete chatroom</Text>
          </View>
        </TouchableOpacity>
      </View>



      <FlatList
        data={chatRooms}
        renderItem={itemData => (
          <ChatRoom chatroom={itemData.item}></ChatRoom>
        )}
        keyExtractor={item => item.chatRoomId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  smallBox: {
    backgroundColor: '#47456E',
    height: 40,
    width: 40,
    justifyContent: 'center',
    marginTop: 12,
    marginLeft: 45,
    borderRadius: 5,
  },

  banner: {
    backgroundColor: '#32305D',
    height: 64,
    width: 375,
    flexDirection: 'row',
  },

  bannerTxt: {
    color: 'snow',
    textAlign: 'left',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 25,
    fontSize: 12,
    fontWeight: 'bold',
  },

  flex: {
    flexDirection: 'row',

  },

  buttonCreate: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderRadius: 4,
    elevation: 3,
    width: 200,
    backgroundColor: 'greenyellow',

  },

  buttonDelete: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderRadius: 4,
    elevation: 3,
    width: 200,
    backgroundColor: 'red',

  },

  buttonText: {
    textAlign: 'center',
    justifyContent: 'center',
    padding: 10,
    color: 'snow',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },

  buttonTextBlack: {
    textAlign: 'center',
    justifyContent: 'center',
    padding: 10,
    color: 'black',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },

});

export default ChatScreen;