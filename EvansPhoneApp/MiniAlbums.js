//Imports
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity, Image, Linking } from 'react-native';

export default function MiniAlbums({imageURL, authCode, key}) {
    //Basic variables
    const albumFrontCode = "https://open.spotify.com/album/";
    //Trying to eliminate a weird error with generating images here, doesn't really work
    //if (imageURL != "") {
        let album = {uri: albumFrontCode + imageURL};
    //}
    const [artistName, setArtistName] = useState('');
    const [albumName, setAlbumName] = useState('');
    const [imageUri, setImage] = useState('');

    //Getting the album information from spotify
    useEffect(() => {
        //Stuff to send to the spotify api
        let albumP = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authCode
          }
        }
        let albumStuff = fetch('https://api.spotify.com/v1/albums/' + imageURL, albumP)
          .then(response => response.json())
          .then(data => {
            //Here is where all of the data is parsed
            setArtistName(data.artists[0].name) 
            let albumN = ""
            let set = false;
            let nameChanged = false;
            let nameChanged2 = false;
        
            if ((data.name.includes("Remaster") || data.name.includes("Edition") || data.name.includes("Deluxe") || data.name.includes("Version") || data.name.includes("Soundtrack")) && !nameChanged) {
                let index = data.name.indexOf('(')
                albumN = data.name.substring(0, index)
                nameChanged = true
            } else {
                nameChanged = false
                albumN = data.name
            }
    
            if (nameChanged && albumN.length > 28) {
                albumN = albumN.substring(0, 28) + "..."
            } else if (!nameChanged && albumN.length > 28) {
                albumN = albumN.substring(0, 28) + "..."
            }

            setAlbumName(albumN)
           
            set = true
            try {
                if (data.images[0].url != "") {
                    setImage(data.images[0].url)
                }
            } catch(e) {
                console.log("idc: " + e)
            }
        })
    })

    return (
        //Ran for each album in the list
        <TouchableOpacity key={key} style={styles.albumList2} onPress={() => Linking.openURL(albumFrontCode+imageURL)}>
            <Image style={styles.albumListImage} source={{uri: imageUri}}/>
            <View style={{flexDirection: 'column'}}>
                <Text style={styles.albumListText}>{albumName}</Text>
                <Text style={styles.albumListText2}>{artistName}</Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    albumList2: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
      },
      albumListText: {
        color: 'white',
        fontSize: 20
      },
      albumListText2: {
        color: 'gray',
        fontStyle: 'italic',
        fontSize: 18
      },
      albumListImage: {
        height: 60,
        width: 60,
        marginRight: 15
      },
});