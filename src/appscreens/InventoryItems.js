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
import { fetchMasterData } from "../dbfunctions/stamdata";
import { useNavigation } from '@react-navigation/native';

const InventoryItems = (props) => {
    const { inventory } = props.route.params;

    const navigation = useNavigation();

    const [masterdata, setMasterdata] = useState();

    useEffect(() => {
        async function fetchData() {
            let data = await fetchMasterData(inventory.masterdata);
            setMasterdata(data);
        }
        fetchData();

    }, [])

    const updateMasterData = () => {
        navigation.navigate("Masterdata", { inventory });
    }

    const AddInventory = () => {
        navigation.navigate("AddItemScreen", { masterdata: masterdata, inventory: inventory });
    }

    return (
        <>
            <Button title="Manage masterdata" onPress={updateMasterData} />
            <Button title="Add wares" onPress={AddInventory} />
            <Button title="Print inventory" onPress={()=> console.log(inventory)} />
            {/* <TouchableNativeFeedback onPress={updateMasterData}>
                <Text style={styles.inventoryView}>Manage masterdata</Text>
            </TouchableNativeFeedback> */}

        </>
    )
}

export default InventoryItems;