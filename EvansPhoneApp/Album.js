//Useless imports
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity, Image, Linking } from 'react-native';

export default function Album({imageURL, authCode}) {
    //Variables
    let album = ""
    const albumFrontCode = "https://open.spotify.com/album/";
    //if (imageURL != "") {
        album = {uri: albumFrontCode + imageURL};
    //} 
    const [artistName, setArtistName] = useState('');
    const [albumName, setAlbumName] = useState('');
    const [imageUri, setImage] = useState('');
   
    //Gets album information from the Spotify API
    useEffect(() => {
        //Stuff to send to Spotify
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
            //Parsing data
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
        <SafeAreaView style={styles.container}>
            {/* Posts the Album generated */}
            <Text style={styles.text}>Here's Today's album:</Text>
            <Image style={styles.image} source={{uri: imageUri}}/>
            <Text style={styles.albumTitle}>{albumName}</Text>
            <Text style={styles.artistText}>{artistName}</Text>

            {/* Opens the album on Spotify */}
            <TouchableOpacity style={styles.spotifyButton} onPress={() => {
                 Linking.openURL(album.uri);
                 //Tried to send an email to me for each album Evan gets so I know what he listened to that day
                //Linking.openURL('mailto:sammyslammer44@gmail.com?subject=Today Evan listened to...&body='+albumName+' by '+artistName+'!') 
                //console.log('mailto:sammyslammer44@gmail.com?subject=Today Evan listened to...&body='+albumName+' by '+artistName+'!');
                }}>
                <Text style={styles.spotifyButtonText}>LISTEN TO IT!</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0.75,
        alignItems: 'center'
    },
    image: {
        width: 300,
        height: 300,
        margin: 10
    },
    text: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 10

    },
    albumTitle: {
        fontSize: 25,
        color: 'white',
    },
    artistText: {
        fontSize: 20,
        color: 'gray',
        fontStyle: 'italic'
    },
    spotifyButton: {
        marginTop: 20,
        backgroundColor: 'green',
        width: 300,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        borderRadius: 50
    },
    spotifyButtonText: {
        color: 'white',
        fontSize: 17
    }
});