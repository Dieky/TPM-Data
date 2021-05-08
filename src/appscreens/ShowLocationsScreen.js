import React from "react";
import {
    View,
    Text,
    Pressable,
    Button,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react/cjs/react.development";
import { addToLocations } from "../dbfunctions/stamdata";

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
        let tmpArray = locations;
        tmpArray.push(data);
        await addToLocations(firebaseId, tmpArray);
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
