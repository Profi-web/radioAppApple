import {useEffect} from 'react';
import * as React from "react";
import {StyleSheet, View, Image, Text, Pressable} from 'react-native';
import {Audio} from 'expo-av';
import SvgComponent from "../media/LogoSvg";
// https://streams.rtvvechtdal.nl/VechtdalNL.aac

export default function App({navigation}) {

    const [sound, setSound] = React.useState(null);
    useEffect(() => {
        playSound()
    }, [])

    async function toggleSound() {
        if (sound) {
            await sound.pauseAsync();
            await sound.unloadAsync()
            setSound(null)
        } else {
            await playSound()
        }
    }

    async function playSound(fromStart = false) {
        console.log('Loading Sound');
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            staysActiveInBackground: true,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            playThroughEarpieceAndroid: false
        });
        const {sound} = await Audio.Sound.createAsync(
            {uri: 'http://streams.rtvvechtdal.nl:8000/VechtdalNL.mp3'}
        );
        setSound(sound);

        await sound.playAsync()
    }

    return (
        <View>
            <View style={styles.containerImage}>
                <Image source={require('../media/vechtdal_nl_logo1.png')} style={styles.frontImage}/>
            </View>
            <View style={styles.container}>
                {/* and put stop here */}
                <Pressable onPress={() => toggleSound()} style={{
                    width: '70%',
                    height: '40%',
                    backgroundColor: 'rgba(0,0,0,0)',
                    border: 'none',
                }}>
                    <View style={styles.press}>
                        <View style={styles.playbutton}>
                            {sound ?
                                <Image source={require('../media/pauseIcon.png')} style={styles.playbuttonImage}/> :
                                <Image source={require('../media/player.png')} style={styles.playbuttonImage}/>}
                        </View>
                        <View style={styles.wrapperButton}>
                            <Text style={styles.textButton}>Luister live mee</Text>
                        </View>
                    </View>
                </Pressable>
            </View>
            <View style={styles.container1}>
                <Pressable onPress={() => navigation.push('Request')} style={styles.press1}>
                    <View style={styles.playbutton}>
                        <Image source={require('../media/askPlate.png')} style={styles.askbuttonImage}/>
                    </View>
                    <View style={styles.wrapperButton}>
                        <Text style={styles.textButton1}>Plaatje aanvragen?</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    textButton: {
        fontWeight: '600',
        fontSize: 18,
        marginLeft: 25,
    },
    textButton1: {
        fontWeight: '600',
        fontSize: 18,
        marginLeft: 20,
    },
    press: {
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        height: 100,
        justifyContent: 'center',
        backgroundColor: 'rgba(108,108,108,0.54)',
    },
    press1: {
        alignItems: 'center',
        flexDirection: 'row',
        width: '70%',
        height: 100,
        justifyContent: 'center',
        backgroundColor: 'rgba(108,108,108,0.54)',
    },
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '20%',
    },
    container1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '10%',
    },
    frontImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    containerImage: {
        paddingTop: 30,
        paddingBottom: 10,
        height:170,
        backgroundColor: '#ff9100',
    },
    playbutton: {
        flex: 2,
        height: 100,
        backgroundColor: '#ff9100',
    },
    wrapperButton: {
        height:100,
        textAlign: 'center',
        flex: 4,
        justifyContent: 'center',
    },
    playbuttonImage: {
        width: '60%',
        height: '60%',
        resizeMode: 'contain',
        marginHorizontal: '20%',
        marginVertical: '20%',
    },
    pausebuttonImage: {
        width: '70%',
        height: '70%',
        resizeMode: 'contain',
        marginHorizontal: '15%',
        marginVertical: '15%',
    },
    askbuttonImage: {
        width: '70%',
        height: '70%',
        resizeMode: 'contain',
        marginHorizontal: '10%',
        marginVertical: '15%',
    },
});

