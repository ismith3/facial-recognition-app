import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import Camera from './camera';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginBottom: 20,
  }
});

const Home = ({navigation}) => {
  Home.navigationOptions = () => ({
    title: 'Home',
  });

  const [activeProcess, setActiveProcess] = useState(null);
  const [hasCameraPermission, setCameraPermission] = useState(null);

  async function handleRegister() {
    console.log('register');
  }

  async function handleVerify() {
    console.log('verify');
  }

  async function handleAnalyze() {
    console.log('analyze');
  }

  async function handleButtonPress() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    setCameraPermission(status === 'granted');
  }

  if(!hasCameraPermission) {
    return (
      <View style={styles.container}>
        <Button title="Register New Face" onPress={() => {
          handleButtonPress();
          handleRegister();
        }} />
        <Button title="Verify Existing Face" onPress={() => {
          handleButtonPress();
          handleVerify();
        }} />
        <Button title="Analyze Face" onPress={() => {
          handleButtonPress();
          handleAnalyze();
        }} />
      </View>
    );
  } else {
    return (
      <Camera navigation={navigation}/>
    )
  }
}

export default Home;