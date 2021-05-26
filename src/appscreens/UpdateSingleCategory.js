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
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addToCategory } from "../dbfunctions/DBActions";
import { validateExpiration } from "../utils/InputValidation";


const UpdateSingleCategory = (props) => {

    const { category, firebaseId, index } = props.route.params;

    const navigation = useNavigation();
    const [mainCategory, setMainCategory] = useState(category[index].main_category);
    const [secondaryCategory, setSecondaryCategory] = useState(category[index].second_category);
    const [defaultExpiration, setDefaultExpiration] = useState(category[index].expiration);

    const Update = async () => {
        let tmpArray = category;
        let data = {
            main_category: mainCategory,
            second_category: secondaryCategory,
            expiration: validateExpiration(defaultExpiration) // using a regex to make sure the start value is numeric, and extracts the correct value
        }
        // checking if the input is correct, if it is not correct an alert is shown to the user. Otherwise the category is updated
        if (!(data.main_category === undefined || data.main_category === "") && !(data.second_category === undefined || data.second_category === "") && !(data.expiration === null || data.expiration === "")) {
            tmpArray[index] = data;
            await addToCategory(firebaseId, tmpArray);
            navigation.navigate("ShowCategoriesScreen", { changesMade: true }); // Tvinger UpdateLocationsScreen til at opdatere når et parameter gives med, ingen ide om hvorfor!
        } else {
            Alert.alert("Missing input please fill out all fields. Expiration MUST be a numeric value");
        }
    }

    return (
        <>
            <TextInput
                value={mainCategory}
                onChangeText={setMainCategory}

            />
            <TextInput
                value={secondaryCategory}
                onChangeText={setSecondaryCategory}

            />
            <TextInput
                keyboardType="numeric"
                value={defaultExpiration}
                onChangeText={setDefaultExpiration}

            />

            <Button title="Update" onPress={Update} />

        </>
    )

}

export default UpdateSingleCategory;