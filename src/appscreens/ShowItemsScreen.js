import React from "react";
import {
    View,
    Button,
    TextInput,
    Text,
    Pressable,
    Keyboard,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from "react/cjs/react.development";
import { Picker } from '@react-native-picker/picker';
import { addToItems } from "../dbfunctions/DBActions"
import { validateExpiration } from "../utils/InputValidation";


const ShowItemsScreen = (props) => {

    const { masterdata, firebaseId } = props.route.params;
    const navigation = useNavigation();

    const [itemName, setItemName] = useState();
    const [unitType, setUnitType] = useState(0);
    const [expiration, setExpiration] = useState(masterdata.category[0].expiration);
    const [categoryIndex, setCategoryIndex] = useState(0);
    const [main_category, setMain_Category] = useState(0);


    const addItem = async () => {
        let data = {
            name: itemName,
            category: categoryIndex,
            unitType: unitType,
            expiration: validateExpiration(expiration) // using a regex to make sure the start value is numeric, and extracts the correct value
        }

        // checking if the input is correct, if it is not correct an alert is shown to the user. Otherwise the item is added
        if (!(data.name === undefined || data.name === "") && !(data.expiration === null || data.expiration === "")) {
            let tmpArray = masterdata.itemlist;
            tmpArray.push(data);
            Keyboard.dismiss();
            await addToItems(firebaseId, tmpArray);
            navigation.navigate("ShowItemsScreen", { changesMade: true }); // Tvinger UpdateLocationsScreen til at opdatere når et parameter gives med, ingen ide om hvorfor!
        } else {
            Alert.alert("Make sure to add name your item and a numeric value for the expiration");
        }
    }

    // value og index er det samme, da jeg på pick.item sætter value={index}
    // så man kan bruge både value eller index og samme resultat vil opnås
    const handleUnitType = (value, index) => {
        setUnitType(value);
    }

    // value og index er det samme, da jeg på pick.item sætter value={index}
    // så man kan bruge både value eller index og samme resultat vil opnås
    const handleMain_category = (value, index) => {
        setCategoryIndex(value);
        setExpiration(masterdata.category[index].expiration);
        setMain_Category(value);
    }

    const updateSingle = (index) => {
        navigation.navigate("UpdateSingleItem", { index: index, masterdata: masterdata, firebaseId: firebaseId })
    }

    return (
        <>
            {masterdata.itemlist.map((data, index) => {
                return (
                    <Pressable key={index} onPress={() => updateSingle(index)}>
                        <Text>{data.name}</Text>
                    </Pressable>
                )
            })}

            <TextInput
                placeholder="Enter item name"
                value={itemName}
                onChangeText={setItemName}
            />


            <Picker
                selectedValue={main_category}
                onValueChange={(itemValue, itemIndex) => handleMain_category(itemValue, itemIndex)}
                mode="dropdown"
            >
                {masterdata.category.map((data, index) => {
                    return (
                        <Picker.Item key={index} label={`${data.main_category} + ${data.second_category}`} value={index} />
                    )
                })}
            </Picker>

            <TextInput
                placeholder="Expiration in months"
                value={expiration}
                onChangeText={setExpiration}
                keyboardType="numeric"
            />

            <Picker
                selectedValue={unitType}
                onValueChange={(itemValue, itemIndex) => handleUnitType(itemValue, itemIndex)}
                mode="dropdown"
            >
                {masterdata.unitTypes.map((data, index) => {
                    return (
                        <Picker.Item key={index} label={data.name} value={index} />
                    )
                })}
            </Picker>

            <Button title="Add item" onPress={addItem} />
        </>
    )

}

export default ShowItemsScreen;