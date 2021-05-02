import React from "react";
import {
    View,
    Text,
    Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UpdateLocationsScreen = (props) => {
    const navigation = useNavigation();

    const { locations, firebaseId } = props.route.params;

    const updateSingle = (value, index) => {
        navigation.navigate("UpdateSingleLocation", { index: index, locations: locations, firebaseId: firebaseId });
    }

    return (
        <>

            {locations.map((data, index) => {
                return (
                    <Pressable key={index} onPress={() => updateSingle(data, index)}>
                        <Text>{data}</Text>
                    </Pressable>

                )
            })}
        </>
    )
}


export default UpdateLocationsScreen;
