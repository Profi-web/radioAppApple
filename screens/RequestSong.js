import React, {useState} from "react";
import {Image, Text, View, StyleSheet, TextInput, Button} from "react-native";
import TextTicker from 'react-native-text-ticker'
import axios from "axios";

export default function RequestPlate() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [forwho, setForwho] = useState("");
    const [artist, setArtist] = useState("");
    const [song, setSong] = useState("");
    // const formdata = () => {
    //     return {
    //         yourname: name,
    //         youremail: email,
    //         forwho: forwho,
    //         artist: artist,
    //         song: song
    //     }
    // }
    var bodyformData = new FormData();
    bodyformData.append('yourname', name);
    bodyformData.append('youremail', email);
    bodyformData.append('forwho', forwho);
    bodyformData.append('artist', artist);
    bodyformData.append('song', song);
    const sendForm = () => {
        axios({
            method: 'post',
            url: 'https://profi-app.nl/wip/radioform/wp-json/contact-form-7/v1/contact-forms/22/feedback',
            data: bodyformData,
            headers: {'Content-Type': "multipart/form-data"},
        })
            .then(function (response) {
                // handle success
                console.log(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }
    return (
        <View>
            <View style={styles.formImageHolder}>
                <Image source={require('../media/vechtdal_nl_logo1.png')} style={styles.formImage}/>
            </View>
            <View style={styles.rotatingTextHolder}>
                <TextTicker style={{fontSize: 24}}
                            duration={12000}
                            loop={true}
                            repeatSpacer={0}
                            marqueeDelay={0}>Luister mee op frequentie 105.6! Luister mee op frequentie 105.6! Luister
                    mee op frequentie 105.6!</TextTicker>
            </View>
            <View style={styles.formHolder}>
                <Text style={styles.headForm}>Vraag uw plaat aan!</Text>
                <View style={{'width': '60%'}}>
                    <TextInput type="text"
                               autoComplete={false}
                               onChangeText={(text) => setName(text)}
                               placeholder="Uw naam..."
                               title={'naam'}
                               style={styles.inputholder}/>
                    <TextInput type="text"
                               placeholder="Uw emailadres..."
                               autoComplete={false}
                               onChangeText={(text) => setEmail(text)}
                               title={'email'}
                               style={styles.inputholder}/>
                    <TextInput type="text"
                               placeholder="Voor wie..."
                               autoComplete={false}
                               onChangeText={(text) => setForwho(text)}
                               title={'for_who'}
                               style={styles.inputholder}/>
                    <TextInput type="text"
                               placeholder="Artiest van de plaat..."
                               autoComplete={false}
                               onChangeText={(text) => setArtist(text)}
                               title={'artist'} style={styles.inputholder}/>
                    <TextInput type="text"
                               placeholder="Titel van de plaat..."
                               autoComplete={false}
                               onChangeText={(text) => setSong(text)}
                               title={'song'}
                               style={styles.inputholder}/>
                    <Button value={'submit'}
                            title={'Verzoek indienen!'}
                            onPress={sendForm}
                            style={styles.submitbutton}/>
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({

    // form css
    headForm: {
        fontWeight: 'bold',
        fontSize: 30,
    },
    formImageHolder: {
        paddingVertical: 15,
        backgroundColor: '#ff9100',
        width: '100%',
        height: '20%',
        alignItems: 'center',
    },
    formImage: {
        width: '30%',
        height: '100%',
        resizeMode: 'contain',
    },
    formHolder: {
        width: '100%',
        alignItems: 'center',
    },
    rotatingTextHolder: {
        marginTop: 10,
        marginBottom: 10,
    },

    inputholder: {
        width: '100%',
        height: 20,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 10,
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
        backgroundColor: '#cecece'
    },
    submitbutton: {
        backgroundColor: '#ff9100',
        fontWeight: '600',
        fontSize: 14,
        color: '#fff',
        borderRadius: 5,
        border: 'none',
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center',
    }
});
