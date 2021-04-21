import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TextInput,
  TouchableNativeFeedback,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import DropdownSelector from './src/components/DropdownSelector';
import HomeScreen from './src/appscreens/HomeScreen';


const App = () => {

  return (
    <>
      <HomeScreen />
    </>
  )
}


export default App;
