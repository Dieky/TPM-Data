import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    Button,
    Pressable,
    FlatList,
    Keyboard,
    TextInput,
    Modal,
    Alert,
} from 'react-native';
import styles from "../styles/GlobalStyling";
import { Picker } from '@react-native-picker/picker';
import { addToInventoryList } from "../dbfunctions/stamdata";
import { useNavigation } from '@react-navigation/native';
import { validateAmount } from "../utils/InputValidation";

const UpdateSingleInventoryItem = (props) => {

    const { inventory, masterdata, index } = props.route.params;

    const navigation = useNavigation();

    const [location, setLocation] = useState(inventory.inventorylist[index].locationId)
    const [amount, setAmount] = useState(inventory.inventorylist[index].amount)
    const [unitType, setUnitType] = useState()
    const [unitTypeId, setUnitTypeId] = useState()
    const [item_name, set_item_name] = useState();
    const [itemId, setItemId] = useState();
    const [item_category_id, set_item_categori_id] = useState()
    const [item_main_cat_name, set_item_main_cat_name] = useState();
    const [item_second_cat_name, set_item_second_cat_name] = useState();
    const [item_created_date, set_item_created_date] = useState();
    const [item_expiration_date, set_item_expiration_date] = useState();


    // Finder info og sætter dem i state hooks, så de er klar til at blive opdateret/slettet
    useEffect(() => {
        let item_ref = inventory.inventorylist[index].itemId
        let item_name = masterdata.itemlist[item_ref].name;
        setItemId(item_ref);
        set_item_name(item_name);

        let item_category_ref = inventory.inventorylist[index].categoryId;
        let item_main_cat_name = masterdata.category[item_category_ref].main_category
        let item_second_cat_name = masterdata.category[item_category_ref].second_category
        set_item_categori_id(item_category_ref)
        set_item_main_cat_name(item_main_cat_name);
        set_item_second_cat_name(item_second_cat_name)


        let item_created_date = inventory.inventorylist[index].created_date;
        let item_expiration_date = inventory.inventorylist[index].expiration_date;
        set_item_created_date(item_created_date);
        set_item_expiration_date(item_expiration_date);

        let item_unitType_ref = inventory.inventorylist[index].unitTypeId;
        setUnitTypeId(item_unitType_ref)
        let item_unitType_name = masterdata.unitTypes[item_unitType_ref].name
        setUnitType(item_unitType_name);
    }, [])

    // trækker info ud som ikke skal ændres og returner JSX
    const renderItemStaticInfo = () => {

        return (
            <View>
                <View style={styles.inventoryLine3}>
                    <Text>Varenavn:</Text>
                    <Text>{item_name}</Text>
                </View>
                <View style={styles.inventoryLine3}>
                    <Text>Hovedkategori:</Text>
                    <Text>{item_main_cat_name}</Text>
                </View>
                <View style={styles.inventoryLine3}>
                    <Text>Underkategori:</Text>
                    <Text>{item_second_cat_name}</Text>
                </View>
                <View style={styles.inventoryLine3}>
                    <Text>Enhedstype</Text>
                    <Text >{unitType}</Text>
                </View>
                <View style={styles.inventoryLine3}>
                    <Text>Oprettet:</Text>
                    <Text >{item_created_date}</Text>
                </View>
                <View style={styles.inventoryLine3}>
                    <Text>Udløber:</Text>
                    <Text >{item_expiration_date}</Text>
                </View>
            </View>

        )
    }

    const selectedLocationHandler = (value, index) => {
        setLocation(value);
    }

    const updateItem = () => {
        let tmpArray = inventory.inventorylist;
        let newItem = {
            locationId: location,
            amount: validateAmount(amount),
            categoryId: item_category_id,
            created_date: item_created_date,
            expiration_date: item_expiration_date,
            itemId: itemId,
            unitTypeId: unitTypeId,
        }

        if (!(newItem.amount === null || newItem.amount === "")) {
            tmpArray[index] = newItem;
            addToInventoryList(inventory.documentId, tmpArray);
            navigation.navigate("InventoryItems", { makeUpdate: true });
        } else {
            Alert.alert("Please use a numeric amount");
        }

    }

    const deleteItem = () => {
        let tmpArray = inventory.inventorylist;
        tmpArray.splice(index, 1)
        addToInventoryList(inventory.documentId, tmpArray);
        navigation.navigate("InventoryItems", { makeUpdate: true });
    }

    // Værdier der skal kunne ændres fra inventory og masterdata og returnerer resultatet i JSX
    const renderItemChangeAble = () => {
        return (
            <View >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ flex: 1 }}>Vælg lokation</Text>
                    <Picker
                        style={{ flex: 1 }}
                        selectedValue={location}
                        onValueChange={(itemValue, itemIndex) => selectedLocationHandler(itemValue, itemIndex)}
                        mode="dropdown"
                    >
                        {masterdata.locations.map((data, index) => {
                            return (
                                <Picker.Item key={index} label={data.name} value={index} />
                            )
                        })}
                    </Picker>
                    <Text style={{ flex: 1 }}></Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ flex: 1.5 }}>Indtast mængde</Text>

                    <TextInput
                        placeholder="indtast noget"
                        style={{ flex: 2 }}
                        value={amount}
                        textAlign="center"
                        onChangeText={setAmount}
                        keyboardType="numeric"
                    />
                    <Text style={{ flex: 2 }}>{unitType}</Text>
                </View>
            </View>
        )

    }


    return (
        <>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View>
                    <View style={styles.updateInventoryContainer}>
                        {renderItemStaticInfo()}
                    </View>
                    <View>
                        {renderItemChangeAble()}
                    </View>
                    <View style={{ flexDirection: "row", paddingTop: 50, justifyContent: "space-evenly" }}>
                        <Button style={{ flex: 1 }} title="Delete" onPress={deleteItem} />
                        <Button style={{ flex: 1 }} title="Update" onPress={updateItem} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </>
    )

}

export default UpdateSingleInventoryItem;