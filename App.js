import React, {useState} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
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

  console.log(playing)

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Image
          style={{ width: 150, height: 150,}}
          source={soundMachine}
        />
        <ToggleSwitch
          isOn={playing}
          onColor="green"
          offColor="gray"
          size="large"
          onToggle={isOn => handleClick(isOn)}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    alignItems: 'center', 
    justifyContent: 'center'
  }
});
