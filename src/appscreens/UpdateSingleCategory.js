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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addToCategory } from "../dbfunctions/stamdata";


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
            expiration: defaultExpiration
        }
        tmpArray[index] = data;
        await addToCategory(firebaseId, tmpArray);
        navigation.navigate("ShowCategoriesScreen", { changesMade: true }); // Tvinger UpdateLocationsScreen til at opdatere når et parameter gives med, ingen ide om hvorfor!
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