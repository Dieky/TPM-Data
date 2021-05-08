import React from "react";
import {
    View,
    Button,
    TextInput,
    Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from "react/cjs/react.development";
import { addToUnitTypes } from "../dbfunctions/stamdata";

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
        let newArray = unitTypes;
        newArray[index] = data;
        await addToUnitTypes(firebaseId, newArray);
        navigation.navigate("ShowUnitTypeScreen", { changesMade: true }); // Tvinger UpdateLocationsScreen til at opdatere når et parameter gives med, ingen ide om hvorfor!
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