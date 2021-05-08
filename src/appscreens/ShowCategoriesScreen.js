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
import { addToCategory } from "../dbfunctions/stamdata";
import { useNavigation } from '@react-navigation/native';

const ShowCategoriesScreen = (props) => {

    const { category, firebaseId } = props.route.params;

    const navigation = useNavigation();
    const [mainCategory, setMainCategory] = useState();
    const [secondaryCategory, setSecondaryCategory] = useState();
    const [defaultExpiration, setDefaultExpiration] = useState();

    const addHandler = () => {
        let tmpArray = category;
        let data = {
            main_category: mainCategory,
            second_category: secondaryCategory,
            expiration: defaultExpiration
        }
        tmpArray.push(data);
        addToCategory(firebaseId, tmpArray);
    }

    const updateSingle = (value, index) => {
        navigation.navigate("UpdateSingleCategory", { index: index, category: category, firebaseId: firebaseId });
    }


    return (
        <>

            {category.map((data, index) => {
                return (
                    <Pressable key={index} onPress={() => updateSingle(data,index)}>
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