import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import RoutePaths from '../helper/Routepath';
import StoryAdded from '../Screens/StoryAdded';
import StoryScreen from '../Screens/StoryScreen';

const AppRouter = () => {
  const Stack = createStackNavigator();
  const [isLoadinScreen, setisLoadinScreen] = useState(true);

  // This is for no internet code

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={RoutePaths.StoryAdded} component={StoryAdded} />
      <Stack.Screen name={RoutePaths.StoryScreen} component={StoryScreen} />
    </Stack.Navigator>
  );
};

export default AppRouter;
