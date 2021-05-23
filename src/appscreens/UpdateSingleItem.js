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
import { addToItems } from "../dbfunctions/stamdata"
import { validateExpiration } from "../utils/InputValidation";

const UpdateSingleItem = (props) => {

    const { masterdata, index, firebaseId } = props.route.params;

    const navigation = useNavigation();
    const [itemName, setItemName] = useState(masterdata.itemlist[index].name);
    const [expiration, setExpiration] = useState(masterdata.itemlist[index].expiration);
    const [unitType, setUnitType] = useState();
    const [categoryIndex, setCategoryIndex] = useState();
    const [main_category, setMain_Category] = useState();

    useEffect(() => {
        let main_cat_index = masterdata.itemlist[index].category;
        setCategoryIndex(main_cat_index);
        setMain_Category(main_cat_index);

        let u_type = masterdata.itemlist[index].unitType;
        setUnitType(u_type);

    }, [])

    const updateItem = async () => {
        let data = {
            name: itemName,
            category: categoryIndex,
            unitType: unitType,
            expiration: validateExpiration(expiration) // using a regex to make sure the start value is numeric, and extracts the correct value
        }
        // checking if the input is correct, if it is not correct an alert is shown to the user. Otherwise the item is updated
        if (!(data.name === undefined || data.name === "") && !(data.expiration === null || data.expiration === "")) {
            let tmpArray = masterdata.itemlist;
            tmpArray[index] = data;
            await addToItems(firebaseId, tmpArray);
            Keyboard.dismiss();
            navigation.navigate("ShowItemsScreen", { changesMade: true });
        } else {
            Alert.alert("Missing input please fill out all fields. Expiration MUST be a numeric value");
        }
    }

    // value og index er det samme, da jeg på pick.item sætter value={index}
    // så man kan bruge både value eller index og samme resultat vil opnås
    const handleMain_category = (value, index) => {
        setCategoryIndex(value);
        setExpiration(masterdata.category[index].expiration);
        setMain_Category(value);
    }

    // value og index er det samme, da jeg på pick.item sætter value={index}
    // så man kan bruge både value eller index og samme resultat vil opnås
    const handleUnitType = (value, index) => {
        setUnitType(value);
    }

    return (
        <>
            <TextInput
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
                        // <Picker.Item key={index} label={`${data.main_category} + ${data.second_category}`} value={data.main_category} />
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

            <Button title="Update" onPress={updateItem} />
        </>
    )
}

export default UpdateSingleItem;