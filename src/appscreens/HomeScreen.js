import React from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  Keyboard,
  Alert,
} from 'react-native';
import { useEffect, useState } from "react/cjs/react.development";
import { addInventory, fetchInventory } from '../dbfunctions/DBActions';
import styles from "../styles/GlobalStyling";
import Inventory from "../components/Inventory";



const HomeScreen = ({ route, navigation }) => {

  const { user } = route.params;
  const [inventoryName, setInventoryName] = useState();
  const [inventoryCreated, setInventoryCreated] = useState(false);
  const [inventoryList, setInventoryList] = useState([]);


  useEffect(() => {
    async function fetchData() {
      let res = await fetchInventory(user)
      setInventoryList(res);
      setInventoryCreated(false);
    }
    fetchData();
  }, [inventoryCreated]);
  
  const inventoryNameHandler = (txt) => {
    setInventoryName(txt);
  }

  const testDb = async () => {
    Keyboard.dismiss();
    if(!(inventoryName === undefined || inventoryName === "")){
      await addInventory(user, inventoryName);
      setInventoryCreated(true);
      setInventoryName("");
    }else{
      Alert.alert("Please enter a name for your inventory");
    }
  }

  const printInventory = () => {
    console.log(inventoryList);
  }


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Hello {user.email}</Text>
      <Text>Enter name for inventory here</Text>
      <TextInput
        style={styles.loginInputfield}
        placeholder={"Give a name to your inventory"}
        onChangeText={inventoryNameHandler}
        value={inventoryName}
      />

      {inventoryList.map((data, index) => {
        return <Inventory inventory={data} key={index} navigation={navigation} user={user}  />
      })}
      <Button title="Create new inventory" onPress={testDb} />
    </View>
  );
}

export default HomeScreen;