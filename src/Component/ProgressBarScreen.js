import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import RoutePaths from '../helper/Routepath';
import { useDispatch } from 'react-redux';

const ProgressScreen = ({navigation}) => {
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch()

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 1) {
        setProgress(progress + 0.01); // You can adjust the step size for the progress
      } else {
        clearInterval(interval);
        setTimeout(() => {
          
          navigation.goBack() // Close the screen after 5 seconds
        }, 100);
      }
    }, 50); // Adjust the interval duration

    return () => {
      clearInterval(interval);
    };
  }, [navigation, progress]);

  return (
    <View style={styles.progressBarContainer}>
      <View
        style={{
          width: `${progress * 100}%`,
          height: 6,
          backgroundColor: '#FFF',
          borderRadius: 5,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    width: '95%',
    height: 10,
    borderWidth: 1,
    justifyContent: 'center',
    margin: 20,
    borderRadius: 5,
    borderColor: '#D4E2E6',
  },

  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProgressScreen;
