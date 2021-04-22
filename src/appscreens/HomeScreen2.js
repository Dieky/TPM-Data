import React from "react";
import {
  View,
  Text,
  Button,
  TextInput,
} from 'react-native';
import { useState } from "react/cjs/react.development";
import { addInventoryList, createConstants } from '../dbfunctions/stamdata';
import styles from "../styles/GlobalStyling";



const HomeScreen2 = ({ route, navigation }) => {

  const [inventoryName, setInventoryName] = useState();

  const testObj = {
    msg: "hejsa",
    msg2: "hejsa2"
  }

  const inventoryNameHandler = (txt) => {
    setInventoryName(txt);
  }

  const testDb = () => {
    addInventoryList(user, inventoryName);
  }

  const { user } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Hello {user.email}</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details', { testObj })}
      />
      <Text>Enter name for inventory here</Text>
      <TextInput
        style={styles.loginInputfield}
        onChangeText={inventoryNameHandler}
        value={inventoryName}
      />
      <Button title="testDB" onPress={testDb} />
      <Button title="testDBConstants" onPress={createConstants} />
    </View>
  );
}

export default HomeScreen2;