import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, An, Alert} from 'react-native';
import RoutePaths from '../helper/Routepath';
import * as Animatable from 'react-native-animatable';
import ImagePicker from 'react-native-image-crop-picker';

import {useDispatch, useSelector} from 'react-redux';
import {normalize, vh, vw} from '../helper/dimenstions';
import Colors from '../helper/colors';
import DocumentPicker from 'react-native-document-picker';
import { _doStausUpdate } from '../store/home/home.action';

const StoryAdded = ({navigation}) => {
  const {profileStatus} = useSelector(state => state?.home);
  const [menuVisible, setMenuVisible] = useState(false);
  const [image, setimage] = useState(null);
  const [imageFromweb, setimageFromweb] = useState('');
  const [imgData, setImgData] = useState(null);
  const [imageName, setImageName] = useState('');
  const [imageData, setImageData] = useState('');

  const dispatch = useDispatch()

  const userProfileImage = require('../assets/images/profilePicture2.png'); // Replace with your image source

  const openStoryView = () => {
    navigation.navigate(RoutePaths.StoryScreen);
  };
  const openUpdateStatus = () => {
    setMenuVisible(true);
    // navigation.navigate(RoutePaths.StoryViewed);
  };
  const onCameraClick = async () => {
    setMenuVisible(false);
    ImagePicker.openCamera({
      compressImageQuality: 0.5,
      cropping: true,
    }).then(img => {
      const fileName = img.path.split('/').pop();
      setimage(img.path);
      setImageName(fileName);
      setImageData(img);
      setimageFromweb(null);
      setImgData(img);
      dispatch(_doStausUpdate(img.path))

    });
  };

  const onDocumentPickHandle = async () => {
    setMenuVisible(false);
    const files = await DocumentPicker.pick({
      type: [DocumentPicker.types.images],
      copyTo: 'documentDirectory',
    })
      
    console.log('getting image file in profile', files[0]);
    if (files[0].size > 2000000) {
      // showSnackError('Please ensure that the file size does not exceed 2MB');
    } else {
      if (
        files[0].type === 'image/png' ||
        files[0].type === 'image/jpeg' ||
        files[0].type === 'image/jpg'
      ) {
        setimage(files[0].uri);
        setImageName(files[0].name);
        setImageData(files[0]);
        setimageFromweb(null);
        setImgData(files[0]);
        dispatch(_doStausUpdate(files[0].uri))

      } else {
        // showSnackError('Please upload image in jpeg, jpg or png format');
      }
    }
  };
  return (
    <View style={styles.container}>
      {/* Decagonal container with a border */}
      <TouchableOpacity onPress={openStoryView}>
        <View
          style={[
            styles.profileContainer,
            {borderColor: profileStatus ? 'green' : 'grey'},
          ]}>
          {/* Profile picture (clickable) */}
          <Image
            source={userProfileImage}
            style={styles.profileImage}
            resizeMode="contain"
          />

          {/* Name and Bio of the user */}
          <Text style={styles.userName}>Jenny Doe</Text>
          <Text style={styles.userBio}>React Native Developer</Text>
        </View>
      </TouchableOpacity>

      {profileStatus ? null : (
        <TouchableOpacity
          onPress={openUpdateStatus}
          style={{marginTop:-35,marginLeft:200}}>
          <Image
            source={require('../assets/images/add.png')}
            style={{height: 40, width: 40}}
          />
           <Text style={styles.story}>Add New Story</Text>
        </TouchableOpacity>

       
      )}

      {menuVisible ? (
        <Animatable.View animation="fadeInUp" style={styles.subView}>
          <TouchableOpacity
            onPress={() => setMenuVisible(false)}
            style={styles.crossIconView}>
            <Image
              source={require('../assets/images/cancel.png')}
              style={{
                height: vh(20),
                width: vw(20),
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={styles.chooseTextView}>
            <Text style={styles.chooseText}>Choose Your Media For Upload</Text>
          </View>
          <View style={styles.optionsView}>
            <TouchableOpacity
              onPress={() => onCameraClick()}
              style={{alignItems: 'center'}}>
              <Image
                source={require('../assets/images/photoCamera.png')}
                style={{
                  height: vh(70),
                  width: vw(70),
                }}
                resizeMode="contain"
              />
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: normalize(12),
                  fontFamily: 'Poppins-Bold',
                  color: 'gray',
                }}>
                Capture an Image
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => onDocumentPickHandle()}
              style={{alignItems: 'center'}}>
              <Image
                source={require('../assets/images/imageGallary.png')}
                style={{
                  height: vh(70),
                  width: vw(70),
                }}
                resizeMode="contain"
              />
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: normalize(12),
                  fontFamily: 'Poppins-Bold',
                  color: 'gray',
                }}>
                Upload a Image
              </Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      ) : null}
    </View>
  );
};

const styles = {
  profileContainer: {
    height: 300,
    width:300,
    borderRadius: 10, // To make it decagonal
    borderWidth: 3,
    borderColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgrey',
    borderRadius:150
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75, // To make it circular
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color:'#000'
  },
  userBio: {
    fontSize: 18,
    color: '#000',
  },
  subView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    height: vh(250),
    borderTopColor: 'lightgray',
    borderTopWidth: vw(3),
    borderTopLeftRadius: vh(25),
    paddingTop: vh(20),
    paddingLeft: vw(20),
    borderTopRightRadius: vw(25),
    paddingRight: vh(20),
  },
  crossIconView: {
    // backgroundColor:"red",
    padding: vw(5),
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  optionsView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  chooseTextView: {
    paddingBottom: vh(25),
  },
  chooseText: {
    fontSize: normalize(15),
    color: Colors.black,
    fontWeight: '600',
    marginLeft: vh(35),
    fontFamily: 'Poppins-Bold',
  },
  title: {
    fontSize: normalize(20),
    fontWeight: '600',
    color: Colors.black,
    fontFamily: 'Poppins-Bold',
  },
  accountDetailTitle: {
    color: Colors.black,
    fontFamily: 'Poppins-Bold',
    fontSize: normalize(14),
  },
  inputStyle: {
    color: '#000',
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(14),
    backgroundColor: '#FFF',
    height: vh(60),
    marginBottom: vh(20),
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2C3F5A',
  },
  story :{
    color:'#fff',
    margin : 10
  }
};

export default StoryAdded;
