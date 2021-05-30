import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    TextInput,
    View,
    Text,
    TouchableNativeFeedback,
    Button,
} from 'react-native';
import styles from "../styles/GlobalStyling";
import { useNavigation } from '@react-navigation/native';
import { fetchMasterData } from '../dbfunctions/DBActions';
import UpdateLocationsModal from "../components/UpdateLocationsModal";

const Masterdata = (props) => {

    const { inventory, user } = props.route.params;

    const navigation = useNavigation();
    const [masterDataDocument, setMasterDataDocument] = useState();

    useEffect(() => {
        async function fetchData() {
            let res = await fetchMasterData(inventory.masterdata);
            setMasterDataDocument(res);
        }
        fetchData(inventory.masterdata);
    }, [])

    const editLocations = () => {
        navigation.navigate("ShowLocationsScreen", { locations: masterDataDocument.locations, firebaseId: inventory.masterdata })
    }

    const editUnitType = () => {
        navigation.navigate("ShowUnitTypeScreen", { unitTypes: masterDataDocument.unitTypes, firebaseId: inventory.masterdata });
    }

    const editCategory = () => {
        navigation.navigate("ShowCategoriesScreen", { category: masterDataDocument.category, firebaseId: inventory.masterdata });
    }

    const editItemlist = () => {
        navigation.navigate("ShowItemsScreen", { masterdata: masterDataDocument, firebaseId: inventory.masterdata });
    }

    const editUsersAllowed = () => {
        navigation.navigate("ShowUsersScreen", { inventory: inventory })
    }

    const adminCheck = () => {
        if (inventory.admin == user.email) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <>
            <Button title="Locations" onPress={editLocations} />
            <Button title="Unit Types" onPress={editUnitType} />
            <Button title="Categories" onPress={editCategory} />
            <Button title="Manage items" onPress={editItemlist} />
            {adminCheck() && <Button title="Add user" onPress={editUsersAllowed} />}
        </>
    )
}


export default Masterdata;