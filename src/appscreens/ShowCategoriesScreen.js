import React, { useState } from 'react';
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
    Modal,
    Alert,
} from 'react-native';
import { addToCategory } from "../dbfunctions/stamdata";
import { useNavigation } from '@react-navigation/native';
import { validateExpiration } from "../utils/InputValidation";

const ShowCategoriesScreen = (props) => {

    const { category, firebaseId } = props.route.params;

    const navigation = useNavigation();
    const [mainCategory, setMainCategory] = useState();
    const [secondaryCategory, setSecondaryCategory] = useState();
    const [defaultExpiration, setDefaultExpiration] = useState();

    const addHandler = async () => {
        let tmpArray = category;
        let data = {
            main_category: mainCategory,
            second_category: secondaryCategory,
            expiration: validateExpiration(defaultExpiration) // using a regex to make sure the start value is numeric, and extracts the correct value
        }

        // checking if the input is correct, if it is not correct an alert is shown to the user. Otherwise the category is added
        if (!(data.main_category === undefined || data.main_category === "") && !(data.second_category === undefined || data.second_category === "") && !(data.expiration === null || data.expiration === "")) {
            tmpArray.push(data);
            await addToCategory(firebaseId, tmpArray);
            navigation.navigate("ShowCategoriesScreen", { changesMade: true }); // Tvinger UpdateLocationsScreen til at opdatere når et parameter gives med, ingen ide om hvorfor!
        } else {
            Alert.alert("Missing input please fill out all fields. Expiration MUST be a numeric value")
        }


    }

    const updateSingle = (value, index) => {
        navigation.navigate("UpdateSingleCategory", { index: index, category: category, firebaseId: firebaseId });
    }


    return (
        <>

            {category.map((data, index) => {
                return (
                    <Pressable key={index} onPress={() => updateSingle(data, index)}>
                        <Text>{`${data.main_category} - ${data.second_category} - ${data.expiration} `}</Text>
                    </Pressable>
                )
            })}

            <TextInput
                placeholder="Main category"
                value={mainCategory}
                onChangeText={setMainCategory}

            />
            <TextInput
                placeholder="Second category"
                value={secondaryCategory}
                onChangeText={setSecondaryCategory}

            />
            <TextInput
                placeholder="Expiration (whole months)"
                keyboardType="numeric"
                value={defaultExpiration}
                onChangeText={setDefaultExpiration}

            />

            <Button title="Add" onPress={addHandler} />
        </>
    )

}

export default ShowCategoriesScreen;