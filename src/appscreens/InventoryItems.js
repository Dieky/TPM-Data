import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableNativeFeedback,
    Button,
} from 'react-native';
import styles from "../styles/GlobalStyling";

const InventoryItems = (props) => {
    const { inventory } = props.route.params;

    const updateMasterData = () => {
        props.navigation.navigate("Masterdata", { inventory });
    }

    return (
        <>
            <TouchableNativeFeedback onPress={updateMasterData}>
                <Text style={styles.inventoryView}>Vedligehold stamdata</Text>
            </TouchableNativeFeedback>

        </>
    )
}

export default InventoryItems;