import React from "react";
import {
    View,
    Button,
    TextInput,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from "react/cjs/react.development";
import { addToLocations } from "../dbfunctions/DBActions";

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
        // checking if the input is correct, if it is not correct an alert is shown to the user. Otherwise the location is updated
        if (!(data.name === undefined || data.name === "")) {
            let newArray = locations;
            newArray[index] = data;
            await addToLocations(firebaseId, newArray);
            navigation.navigate("ShowLocationsScreen", { changesMade: true }); // Tvinger UpdateLocationsScreen til at opdatere når et parameter gives med, ingen ide om hvorfor!
        } else {
            Alert.alert("Please give a name to your location");
        }
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