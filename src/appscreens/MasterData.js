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
import { fetchMasterData } from '../dbfunctions/stamdata';
import UpdateLocationsModal from "../components/UpdateLocationsModal";

const Masterdata = (props) => {

    const { inventory } = props.route.params;

    const navigation = useNavigation();
    const [masterDataDocument, setMasterDataDocument] = useState();


    const [locationName, setLocationName] = useState();

    const handleLocationName = (txt) => {
        setLocationName(txt);
    }

    useEffect(() => {
        async function fetchData() {
            let res = await fetchMasterData(inventory.masterdata);
            setMasterDataDocument(res);
        }
        fetchData(inventory.masterdata);
    }, [])

    const test = (val) => {
        console.log(masterDataDocument)
        console.log(inventory.masterdata)

        // console.log(val.children);
    }

    const editLocations = () => {
        navigation.navigate("ShowLocationsScreen", { locations: masterDataDocument.locations, firebaseId: inventory.masterdata })
    }

    const editUnitType = () => {
        navigation.navigate("ShowUnitTypeScreen", { unitTypes: masterDataDocument.unitTypes, firebaseId: inventory.masterdata });
    }
    const editCategory = () => {
        console.log("Kategorier");
    }
    const editItemlist = () => {
        console.log("Varer");
    }
    return (
        <>
            {/* <UpdateLocationsModal locationData={[1,2,3,4]} /> */}
            {/* <Button title="test" onPress={test} /> */}
            <Button title="Lokationer" onPress={editLocations} />
            <Button title="Enheder" onPress={editUnitType} />
            <Button title="Kategorier" onPress={editCategory} />
            <Button title="Varer" onPress={editItemlist} />


        </>
    )
}


export default Masterdata