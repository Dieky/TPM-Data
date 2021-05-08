import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    TextInput,
    View,
    Text,
    TouchableNativeFeedback,
    Button,
    Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addToUnitTypes } from "../dbfunctions/stamdata";

const ShowUnitTypeScreen = (props) => {

    const { unitTypes, firebaseId } = props.route.params;

    const [newValue, setNewValue] = useState();
    const navigation = useNavigation();

    const updateSingle = (value, index) => {
        navigation.navigate("UpdateSingleUnitType", { index: index, unitTypes: unitTypes, firebaseId: firebaseId });
    }

    const addHandler = async () => {
        let data = {
            name: newValue
        }
        let tmpArray = unitTypes;
        tmpArray.push(data);
        await addToUnitTypes(firebaseId, tmpArray);
    }


    return (
        <>
            {unitTypes.map((data, index) => {
                return (
                    <Pressable key={index} onPress={() => updateSingle(data, index)}>
                        <Text>{data.name}</Text>
                    </Pressable>

                )
            })}

            <TextInput
                placeholder="add new unit type"
                value={newValue}
                onChangeText={setNewValue}

            />
            <Button title="Add unit type" onPress={addHandler} />

        </>

    )

}

export default ShowUnitTypeScreen;