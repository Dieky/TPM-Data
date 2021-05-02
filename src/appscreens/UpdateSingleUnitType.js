import React from "react";
import {
    View,
    Button,
    TextInput,
    Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from "react/cjs/react.development";
import { updateUnitTypes } from "../dbfunctions/stamdata";

const UpdateSingleUnitType = (props) => {

    const { unitTypes, index, firebaseId } = props.route.params;
    const navigation = useNavigation();
    const [newValue, setNewValue] = useState(unitTypes[index]);

    const valueHandler = (txt) => {
        setNewValue(txt);
    }

    const Update = async () => {
        let newArray = unitTypes;
        newArray[index] = newValue;
        await updateUnitTypes(firebaseId, newArray);
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