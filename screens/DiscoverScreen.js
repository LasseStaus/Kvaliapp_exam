import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,                          // needs to be here for the search filtering
  Button,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,                 // needs to be here for the search filtering
  Image
} from 'react-native';
import filter from 'lodash.filter';  // needs to be here for the search filtering





const DiscoverScreen = props => {

const API_ENDPOINT = `https://randomuser.me/api/?seed=1&page=1&results=20`; // change to our firebase api

// GENERAL CONSTS FOR useState
// state variables defined for search
const [isLoading, setIsLoading] = useState(false);
const [data, setData] = useState([]);
const [error, setError] = useState(null);

const [query, setQuery] = useState('');
const [fullData, setFullData] = useState([]);

  // fetch data using useEffect

  useEffect(() => {
    setIsLoading(true);
  
    fetch(API_ENDPOINT)  // remember to change const API_ENDPOINT above
      .then(response => response.json())
      .then(response => {
        setData(response.results);
  
        // ADD THIS
        setFullData(response.results);
  
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        setError(err);
      });
  }, []);

   // handleSearch to filter the Data

  const handleSearch = text => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(fullData, user => {
      return contains(user, formattedQuery);
    });
    setData(filteredData);
    setQuery(text);
  };
  
  const contains = ({ name, email }, query) => {
    const { first, last } = name;
  
    if (first.includes(query) || last.includes(query) || email.includes(query)) {
      return true;
    }
  
    return false;
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18}}>
          Error fetching data... Check your network connection!
        </Text>
      </View>
    );
  }

  function renderHeader() {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          padding: 10,
          marginVertical: 10,
          borderRadius: 20
        }}
      >
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="always"
          value={query}
          onChangeText={queryText => handleSearch(queryText)}
          placeholder="Search"
          style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}
        />
      </View>
    );
  }

  // FULL VIEW RETURNED

 return (

    <View style={styles.container}>

    <TouchableOpacity title="EVENTS" style={styles.button1} onPress={() => props.navigation.navigate("Events")}>
    <Image style={styles.image} source={require("./../assets/imgs/IMG_7066.png")}/>
    <Text style={styles.eventTouchText}>
          EVENTS
        </Text>     
    </TouchableOpacity>

    
{  /* UNCOMMENT THIS TO GET ALL THREE BUTTONS
 */
    <TouchableOpacity title="All Student organisations" style={styles.button2} onPress={() => props.navigation.navigate("Events")}>
    <Image style={styles.image} source={require("./../assets/imgs/IMG_7066.png")}/>
    <Text style={styles.eventTouchText}>
          ALL STUDENT ORGANISATIONS
        </Text>    
    </TouchableOpacity> }

 {    <TouchableOpacity title="All Posts" style={styles.button3} onPress={() => props.navigation.navigate("Events")}>
    <Image style={styles.image} source={require("./../assets/imgs/IMG_7066.png")}/>
    <Text style={styles.eventTouchText}>
        ALL POSTS
        </Text>     
    </TouchableOpacity> }

      
  {/* // WORKING SEARCH FLATLIST UNCOMMENT TO SEE */}

    {/* <Text style={styles.text}>Search events</Text>
    <FlatList
      ListHeaderComponent={renderHeader}
      data={data}
      keyExtractor={item => item.first}  
      renderItem={({ item }) => (
        <View style={styles.listItem}>
          <Image
            source={{ uri: item.picture.thumbnail }} // change to match firebase db
            style={styles.coverImage}
          />
          <View style={styles.metaInfo}>
            <Text style={styles.title}>{`${item.name.first} ${    // change to match firebase db
              item.name.last                               // change to match firebase db
            }`}</Text>
          </View>
        </View>
      )}
    />  */}

  </View>

 );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8f8f8',
      alignItems: 'center'
    },

    eventTouchText: {
        color: 'white',
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: -70,
        fontFamily: "TekoMedium",
        fontSize: 26,
        

    },

    button1: {
        backgroundColor: '#700F6E',
        borderRadius: 5,
        marginTop: 30,
        width: 337,
        height: 120,
        padding: 10,
        shadowColor: '#303838',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.35,
        flexDirection: 'column',

      },

      button2: {
        backgroundColor: '#32305D',
        borderRadius: 5,
        marginTop: 30,
        width: 337,
        height: 120,
        padding: 10,
        shadowColor: '#303838',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.35,
        flexDirection: 'column',

      },

      button3: {
        backgroundColor: '#07936B',
        borderRadius: 5,
        marginTop: 30,
        width: 337,
        height: 120,
        padding: 10,
        shadowColor: '#303838',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.35,
        flexDirection: 'column',

      },

      image: {
          width: 337,
          height: 120,
          margin: 0,
          marginLeft: -10,
          marginTop: -10,
          opacity: 0.2,
          
      },
    text: {
      fontSize: 20,
      color: '#101010',
      marginTop: 60,
      fontWeight: '700',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      marginRight: 200,
    },
    listItem: {
      marginTop: 10,
      paddingVertical: 20,
      paddingHorizontal: 20,
      backgroundColor: '#fff',
      flexDirection: 'row'
    },
    coverImage: {
      width: 100,
      height: 100,
      borderRadius: 100,
    },
    metaInfo: {
      marginLeft: 10
    },
    title: {
      fontSize: 18,
      width: 200,
      padding: 10
    }
  });

export default DiscoverScreen;