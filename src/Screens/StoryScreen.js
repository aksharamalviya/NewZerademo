import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, SafeAreaView} from 'react-native';
import ProgressScreen from '../Component/ProgressBarScreen';
import {useDispatch, useSelector} from 'react-redux';
import {_doStausViewed} from '../store/home/home.action';

const StoryScreen = ({navigation}) => {
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  const {statusImage} = useSelector(state => state?.home);

  useEffect(() => {
    dispatch(_doStausViewed());
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress bar */}
      <ProgressScreen navigation={navigation} />
      {statusImage ? (
        <Image source={{uri: statusImage}} style={styles.newsImage} />
      ) : (
        <Image
          source={require('../assets/images/isro.png')}
          style={styles.newsImage}
        />
      )}

    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2C3F5A',
  },
  progressBar: {
    width: '80%',
    marginBottom: 20,
  },
  newsImage: {
    width: '100%',
    height: '90%',
    color: '#fff',
    marginTop: 20,
  },
  headline: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#fff',
    marginTop: 10,
  },
  userOpinion: {
    fontSize: 30,
    color: '#fff',
    marginTop: 30,
    marginHorizontal: 30,
  },
});

export default StoryScreen;
