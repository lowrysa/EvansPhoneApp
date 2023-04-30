import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity } from 'react-native';

//Client ID: 51682efe8ff346239731e3ebfd08ed88
//Client Secret: 583a8e5bd56840e79d899d539c4a5900

export default function SpotifyLogin({setToken}) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [authToken, setAuthToken] = useState('');

    getToken = async() => {
        // var data = ''
        // console.log("data: " + data)
    
        var authParams = { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id=51682efe8ff346239731e3ebfd08ed88&client_secret=583a8e5bd56840e79d899d539c4a5900',
        }
    
        fetch('https://accounts.spotify.com/api/token', authParams)
            .then(result => result.json())
            .then(data => setAuthToken(data.access_token))
        setToken(authToken)
    }

    return (
        <TouchableOpacity style={styles.spotifyButton} onPress={() => getToken()}>
            <Text style={styles.spotifyButtonText}>GET AUTHENTICATED</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    spotifyButton: {
        marginTop: 20,
        backgroundColor: 'green',
        width: 300,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        borderRadius: 50
    },
    spotifyButtonText: {
        color: 'white',
        fontSize: 17
    }
});