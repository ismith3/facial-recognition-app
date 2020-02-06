import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import CameraIcon from '../camera-icon';

const CameraScreen = ({ navigation }) => {
  CameraScreen.navigationOptions = () => ({
    title: 'CameraScreen',
  })

  const [type, setType] = useState(Camera.Constants.Type.front);
  const [isFaceDetected, setFaceDetected] = useState(false);
  const [faceBounds, setFaceBounds] = useState(null);
  const [faceAngle, setFaceAngle] = useState(null);
  const screenHeight = Dimensions.get('window').height;

  async function handleFacesDetected({ faces }) {
    setFaceDetected(true);
    let faceAngleObj = {
      roll: faces[0].rollAngle,
      yaw: faces[0].yawAngle,
    }
    setFaceAngle(faceAngleObj);
    setFaceBounds(faces[0].bounds);
  }

  function handleFlipPress() {
    setType(type === Camera.Constants.Type.front? Camera.Constants.Type.back: Camera.Constants.Type.front)
  }

  const styles = {
    camera: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-end'
    },
    view: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    snap: {
      width: 100,
      height: 100
    },
    opacity: {
      marginLeft: 50,
      marginRight: 50
    }
  }

  if(!isFaceDetected || !faceBounds) {
    return (
      <View style={{ flex: 1 }}>
        <Camera 
          style={styles.camera} 
          type={type}
          onFacesDetected={handleFacesDetected}>
          <View
            style={styles.view}>
            <TouchableOpacity style={styles.opacity}>
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }} onPress={() => {navigation.navigate('Home')}}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={undefined} style={styles.opacity}>
              <CameraIcon width={70} height={70} viewBox="-4 0 40 35" style={{marginBottom: 20}}/>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.opacity}
              onPress={handleFlipPress}>
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    )
  } else if(isFaceDetected && faceBounds){
    faceBox = {
      borderStyle: 'solid',
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 5,
      position: 'absolute',
      left: faceBounds.origin.x,
      bottom: (faceBounds.origin.y * -1) + (screenHeight - faceBounds.size.height),
      height: faceBounds.size.height,
      width: faceBounds.size.width,
      transform: [
        {rotate: faceAngle.roll.toString() + 'deg'},
      ]
    }
    return (
      <View style={{ flex: 1 }}>
        <Camera 
          style={styles.camera} 
          type={type}
          onFacesDetected={handleFacesDetected}>
          <View
            style={styles.view}>
            <View style={faceBox}></View>
            <TouchableOpacity style={styles.opacity}>
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }} onPress={() => {navigation.navigate('Home')}}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={undefined} style={styles.opacity}>
              <CameraIcon width={70} height={70} viewBox="-4 0 40 35" style={{marginBottom: 20}}/>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.opacity}
              onPress={handleFlipPress}>
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    )
  }
}

export default CameraScreen;