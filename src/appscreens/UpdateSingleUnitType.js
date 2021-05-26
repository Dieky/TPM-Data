import React from "react";
import {
    View,
    Button,
    TextInput,
    Text,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from "react/cjs/react.development";
import { addToUnitTypes } from "../dbfunctions/DBActions";

const UpdateSingleUnitType = (props) => {

    const { unitTypes, index, firebaseId } = props.route.params;
    const navigation = useNavigation();
    const [newValue, setNewValue] = useState(unitTypes[index].name);

    const valueHandler = (txt) => {
        setNewValue(txt);
    }

    const Update = async () => {
        let data = {
            name: newValue
        }
        // checking if the input is correct, if it is not correct an alert is shown to the user. Otherwise the unit type is updated
        if (!(data.name === undefined || data.name === "")) {
            let newArray = unitTypes;
            newArray[index] = data;
            await addToUnitTypes(firebaseId, newArray);
            navigation.navigate("ShowUnitTypeScreen", { changesMade: true }); // Tvinger UpdateLocationsScreen til at opdatere når et parameter gives med, ingen ide om hvorfor!
        } else{
            Alert.alert("Please give a name to your unit type");
        }
    }


    return (
        <>
            <TextInput
                value={newValue}
                onChangeText={valueHandler}
            />
            <Button title="Update" onPress={Update} />
        </>
    )
}

export default UpdateSingleUnitType;