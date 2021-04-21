import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import {
    Button,
    StyleSheet,
} from 'react-native';

const DropdownSelector2 = (props) => {
    const { itemChosen, Choices, handler, startVal } = props

    const [selected, setSelected] = useState();
   

    useEffect(() => {
        setSelected(startVal);
    }, [startVal])

    return (
        <>
            <Picker
                mode='dropdown'
                selectedValue={selected}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) =>
                    setSelected(itemValue)
                }
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

export default DropdownSelector2;