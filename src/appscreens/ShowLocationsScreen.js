import React from "react";
import {
    View,
    Text,
    Pressable,
    Button,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react/cjs/react.development";
import { addToLocations } from "../dbfunctions/DBActions";

const ShowLocationsScreen = (props) => {
    const navigation = useNavigation();

    const { locations, firebaseId } = props.route.params;

    const [newValue, setNewValue] = useState();

    const updateSingle = (value, index) => {
        navigation.navigate("UpdateSingleLocation", { index: index, locations: locations, firebaseId: firebaseId });
    }

    const addHandler = async () => {
        let data = {
            name: newValue
        }
        // checking if the input is correct, if it is not correct an alert is shown to the user. Otherwise the location is added
        if (!(data.name === undefined || data.name === "")) {
            let tmpArray = locations;
            tmpArray.push(data);
            await addToLocations(firebaseId, tmpArray);
            // navigation.navigate("ShowLocationsScreen" ); // Tvinger UpdateLocationsScreen til at opdatere når et parameter gives med, ingen ide om hvorfor!
            navigation.navigate("ShowLocationsScreen", { changesMade: true }); // Tvinger UpdateLocationsScreen til at opdatere når et parameter gives med, ingen ide om hvorfor!
        } else {
            Alert.alert("Please give a name to your location");
        }
    }

    return (
        <>


            {locations.map((data, index) => {
                return (
                    <Pressable key={index} onPress={() => updateSingle(data, index)}>
                        <Text>{data.name}</Text>
                    </Pressable>

                )
            })}

            <TextInput
                placeholder="add new location"
                value={newValue}
                onChangeText={setNewValue}

            />
            <Button title="Add location" onPress={addHandler} />
        </>
    )
}


export default ShowLocationsScreen;
