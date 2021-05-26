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
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addToUnitTypes } from "../dbfunctions/DBActions";

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
        // checking if the input is correct, if it is not correct an alert is shown to the user. Otherwise the unit type is added
        if (!(data.name === undefined || data.name === "")) {
            let tmpArray = unitTypes;
            tmpArray.push(data);
            await addToUnitTypes(firebaseId, tmpArray);
            navigation.navigate("ShowUnitTypeScreen", { changesMade: true }); // Tvinger UpdateLocationsScreen til at opdatere når et parameter gives med, ingen ide om hvorfor!
        }else{
            Alert.alert("Please give a name to your unit type");
        }
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