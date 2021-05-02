import React from "react";
import {
    View,
    Text,
    Button,
    TextInput,
    Keyboard,
    FlatList,
    SafeAreaView,
    ScrollView,
    Dimensions,
    TouchableWithoutFeedback,
} from 'react-native';
import { useState } from "react/cjs/react.development";

const UpdateList = (props) => {

    const { dataList } = props;
    const [updatedData, setUpdatedData] = useState(dataList);
    const [dataChanged, setDataChanged] = useState(false);
    return (
        <>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <FlatList
                    style={{ maxHeight: "70%", width: Dimensions.get("window").width }}
                    data={updatedData}
                    keyExtractor={(index) => index}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{borderColor: "black", borderWidth: 2 }}>
                                <TextInput
                                    value={updatedData[index]}
                                    onChangeText={text => {
                                        let res = updatedData;
                                        res[index] = text;
                                        console.log(res);
                                        setUpdatedData(res)
                                        setDataChanged(!dataChanged);
                                    }}
                                    editable={true}
                                />
                            </View>

                        );
                    }}
                />
            </TouchableWithoutFeedback>
        </>
    )
}

export default UpdateList;