/**
 * An App created by Sam Lowry, 2023
 * If you're not Evan don't use this >:(((
 */

//Basic Imports
import React, {useState, useEffect} from "react"
import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity, ScrollView, Image, Dimensions, Linking, FlatList } from 'react-native';
import SpotifyLogin from "./SpotifyLogin.js"
import MiniAlbums from "./MiniAlbums.js";
import Album from "./Album.js"
const {width: w, height: h} = Dimensions.get("window");
import { albums } from "./AlbumList.js";

export default function App() {
  //Variables we need
  const [loggedIn, setLoggedIn] = useState(false);
  const [authToken,setAuthToken] = useState('')
  const [rolled, setRolled] = useState(false);
  let albumKey = useState('');
  let [albumCode, setAlbumCode] = useState('');

  //Gets the token from the SpotifyLogin
  const setToken = (authToken) => {
    if (authToken != "") {
      setAuthToken(authToken)
      setLoggedIn(true)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      { loggedIn ? 
        <View>
        { rolled ? 
        <ScrollView>
          {/* After an album is generated, we stay here */}
          <View style={{height: 100}}></View>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Album imageURL={albumCode} authCode={authToken}/>
            <TouchableOpacity style={styles.rerollButton} onPress={()=> {
              albumKey = Math.floor(Math.random() * (albums.length)) + 1;
              setAlbumCode(albums[albumKey-1].albumCode); 
              return (
                //Returns an album
                <Album imageURL={albumCode}/>
              );
            }}>
              <Text style={styles.rerollButtonText}>ROLL AGAIN</Text>
            </TouchableOpacity>
          </View>
          {/* A list of all of the albums down below */}
            <View style={{alignItems: 'center', marginBottom: 50}}>
              <Text style={styles.text3}>Psst down here</Text>
              <Text style={styles.text3}>Scroll to see the rest of the albums</Text>
            </View>
            <View style={styles.albumList}>
              <ScrollView >
                <View style={{alignItems: 'baseline', margin: 2}}>
                { albums.map((album) => {
                  return (
                    <MiniAlbums imageURL={album.albumCode} authCode={authToken} key={album.key}/>
                  );
                })}
                </View>
              </ScrollView>
            </View>
            <Text style={styles.poopText}>💩</Text>
          </ScrollView>
          : 
          // We go here after being authenticated
          <View style={{top: -50, alignItems: 'center'}}>
            <Text style={styles.text21}>Great you're in</Text>
            <Text style={styles.text22}>Now, get an album:</Text>
            <TouchableOpacity style={styles.rollButton} onPress={()=> {
                setRolled(true);
                albumKey = Math.floor(Math.random() * (albums.length)) + 1;
                setAlbumCode(albums[albumKey-1].albumCode);  
              }}>
                {/* Gets the first album */}
              <Text style={styles.rerollButtonText}>GIVE ME AN ALBUM!</Text>
            </TouchableOpacity>
          </View>
          }
        </View>
      :
      //First screen
       <View style={styles.container}>
        <Text style={styles.text}>Hey Evan</Text>
        <Text style={{position: 'absolute', top: 150, color: 'white'}}>Welcome to your app</Text>
        <Text style={styles.text2}>First, let's get you authenticated:</Text>
        <SpotifyLogin setToken={setToken}/>
        <Text style={{color: 'white', marginTop: 30}}>There are currently {albums.length} albums on here</Text>
        <Text style={{color: 'gray', fontSize: 12, bottom: 10, position: 'absolute'}}>An app made by Sam Lowry 2023 💩</Text>
      </View>
      }
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 32,
    position: 'absolute',
    top: 100,
    fontWeight: 'bold'
  },
  text2: {
    color: 'white',
    fontSize: 22,
    marginBottom: 10,
  },
  text21: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
  text22: {
    color: 'white',
    fontSize: 22,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  text3: {
    color: 'white',
    fontSize: 10,
  },
  rollButton: {
    color: 'white',
    fontSize: 20,
    top: 10,
    width: 300,
    height: 45,
    borderColor: 'green',
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50
  },
  rerollButton: {
    marginTop: 20,
    width: 300,
    height: 45,
    borderColor: 'green',
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginBottom: 120
  },
  rerollButtonText: {
    color: 'white',
    fontSize: 17,
  },
  albumList: {
    justifyContent: 'center',
    height: 500,
    alignItems:'baseline',
    flexDirection: 'column',
    marginBottom:60,
    borderBottomColor: 'white',
    borderTopColor: 'white',
    borderWidth: 2,
  },
  poopText: {
    color: 'white',
    fontSize: 30,
    alignItems: 'center',
    marginBottom: 30,
    alignSelf: 'center'
  },
});
