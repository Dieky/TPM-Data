import React from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  Keyboard,
} from 'react-native';
import { useEffect, useState } from "react/cjs/react.development";
import { addInventory, fetchInventory } from '../dbfunctions/stamdata';
import styles from "../styles/GlobalStyling";
import Inventory from "../components/Inventory";



const HomeScreen2 = ({ route, navigation }) => {

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
    await addInventory(user, inventoryName);
    setInventoryCreated(true);
    setInventoryName("");
  }

  const printInventory = () => {
    console.log(inventoryList);
  }


  const { user } = route.params;
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
        return <Inventory inventory={data} key={index} navigation={navigation}  />
      })}
      <Button title="Create new inventory" onPress={testDb} />
    </View>
  );
}

export default HomeScreen2;