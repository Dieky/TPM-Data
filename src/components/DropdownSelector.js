import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
    TextInput,
    TouchableNativeFeedback,
} from 'react-native';
import { fetchData } from '../dbfunctions/constants';

const DropdownSelector = (props) => {
    const { Choices, Handler, DefaultVal } = props

    const [pickerLabel, setPickerLabel] = useState('');

    const handleSelection = async (itemValue, itemIndex) => {
        setPickerLabel(itemValue);
        let itemRef = Choices[itemIndex];
        Handler(itemRef);
    }


    useEffect(() => {
        if (DefaultVal) {
            setPickerLabel(DefaultVal);
        }
    }, [DefaultVal])

    return (
        <>
            <Picker
                mode='dropdown'
                selectedValue={pickerLabel}
                style={styles.picker}
                onValueChange={handleSelection}
            >
                {Choices.map((data, itemIndex) => {
                    return (
                        <Picker.Item key={itemIndex} label={data.name} value={data.name} />
                    )
                })}

            </Picker>
        </>


    )

}


const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: 'lightblue',
        flex: 1,
    },
    container: {
        flex: 1,
    },
    horizontalContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: 25,
    },
    inputfield: {
        borderColor: 'black',
        borderBottomWidth: 1,
        fontWeight: 'bold'
    },
    picker: {
        // flex: 1,
        height: 50,
        width: 200,
        alignSelf: 'center',
    },
    textStyling: {
        fontSize: 20,
        fontWeight: 'bold',
    },


});

export default DropdownSelector;