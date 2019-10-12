import React, {useState} from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import ToggleSwitch from 'toggle-switch-react-native'
import soundMachine from './assets/sound-machine.png'

const mode = {
  "allowsRecordingIOS": false, 
  "interruptionModeIOS": Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS, 
  "interruptionModeAndroid": Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX, 
  "shouldDuckAndroid": false, 
  "playThroughEarpieceAndroid": false,
  "playsInSilentModeIOS": true,
  "staysActiveInBackground": true
}

Audio.setAudioModeAsync(mode)

const soundObject = new Audio.Sound();

export default function App() {
  const [playing, togglePlaying] = useState(false)
  const [soundLoaded, setSoundLoaded] = useState(false)

  async function playSound() {
    try {
      if (!soundLoaded) {
        await soundObject.loadAsync(require('./assets/brown.mp3'));
        setSoundLoaded(true)
      }
      await soundObject.setIsLoopingAsync(true)
      await soundObject.playAsync();
    } catch (error) {
      console.log(error)
    }
  }

  async function pauseSound() {
    try {
      await soundObject.stopAsync();
    } catch (error) {
    }
  }

  function handleClick(isOn) {
    togglePlaying(isOn)
    if (isOn) {
      playSound()
    } else {
      pauseSound()
    }
  }

  const circleStyle = {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 120 / 2,
    backgroundColor: (playing ? '#160F29' : '#F3DFC1')
  }

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <TouchableOpacity onPress={() => handleClick(!playing)}>
          <View style={circleStyle} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141204',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    alignItems: 'center', 
    justifyContent: 'center'
  }
});
