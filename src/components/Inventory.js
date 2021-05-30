import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableNativeFeedback,
} from 'react-native';
import styles from "../styles/GlobalStyling";

const Inventory = (props) => {
    const { inventory, navigation, user } = props;

    const showInventory = () => {
        navigation.navigate("InventoryItems", { inventory: inventory, user: user });
    }


    return (
        <>
            <TouchableNativeFeedback onPress={showInventory}>
                <View>
                    <Text>{inventory.name}</Text>
                </View>
            </TouchableNativeFeedback>
        </>
    )
}

export default Inventory;