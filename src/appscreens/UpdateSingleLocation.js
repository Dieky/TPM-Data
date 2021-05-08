import React from "react";
import {
    View,
    Button,
    TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from "react/cjs/react.development";
import { addToLocations } from "../dbfunctions/stamdata";

const UpdateSingleLocation = (props) => {


    const { locations, index, firebaseId } = props.route.params;

    const navigation = useNavigation();
    const [newValue, setNewValue] = useState(locations[index].name);

    const valueHandler = (txt) => {
        setNewValue(txt);
    }

    const Update = async () => {
        let data = {
            name: newValue
        }
        let newArray = locations;
        newArray[index] = data;
        await addToLocations(firebaseId, newArray);
        navigation.navigate("ShowLocationsScreen", { changesMade: true }); // Tvinger UpdateLocationsScreen til at opdatere når et parameter gives med, ingen ide om hvorfor!
        // navigation.navigate("UpdateLocationsScreen", ); // Dette Tvinger IKKE UpdateLocationsScreen til at opdatere
    }

    return (
        <>
            <View>
                <TextInput
                    value={newValue}
                    onChangeText={valueHandler}
                />
                <Button title="Update" onPress={Update} />
            </View>
        </>
    )


}

export default UpdateSingleLocation;