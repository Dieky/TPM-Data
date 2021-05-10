import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableNativeFeedback,
    Button,
    Pressable,
    FlatList,
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

    const renderItem = ({ item, index }) => {
        return (
            <Pressable style={styles.inventoryContainer} onPress={() => navigation.navigate("UpdateSingleInventoryItem", { masterdata: masterdata, inventory: inventory, index: index })} >
                <View>
                    <View style={styles.inventoryLine1}>
                        <Text style={styles.textStyling}>{masterdata.itemlist[item.itemId].name}</Text>
                        <Text style={styles.textStyling2}>{masterdata.category[item.categoryId].main_category}</Text>
                        <Text style={styles.textStyling2}>{masterdata.category[item.categoryId].second_category}</Text>
                    </View>
                    <View style={styles.inventoryLine2}>
                        <Text style={styles.textStyling4}>{item.amount}</Text>
                        <Text style={styles.textStyling3}>{masterdata.unitTypes[item.unitTypeId].name}</Text>
                        <Text style={styles.textStyling3}>{masterdata.locations[item.locationId].name}</Text>
                        <Text style={styles.textStyling3}>{item.expiration_date}</Text>
                    </View>
                </View>
            </Pressable>

        )
    }

    return (
        <>
            {/* flex: 1 i øverste parent gør at vi kan scrolle, men samtidigt se knapperne under flatlisten */}
            <View style={{ flex: 1 }}>
                {/* En legend/forklaring på hvilken info der vises */}
                <View style={styles.inventoryContainer}>
                    <View style={styles.inventoryLine1}>
                        <Text style={styles.textStyling}>Varetekst</Text>
                        <Text style={styles.textStyling2}>Kategori</Text>
                        <Text style={styles.textStyling2}>Underkategori</Text>
                    </View>
                    <View style={styles.inventoryLine2}>
                        <Text style={styles.textStyling4}>Mængde</Text>
                        <Text style={styles.textStyling3}>Enhed</Text>
                        <Text style={styles.textStyling3}>Placering</Text>
                        <Text style={styles.textStyling3}>Udløbsdato</Text>
                    </View>
                </View>

                {/* masterdata && = tjekker om masterdata er defineret. Hvis den er null vil det crashe appen, men på denne måde crasher den ikke appen */}
                {masterdata &&
                    <FlatList
                        data={inventory.inventorylist}
                        renderItem={renderItem}
                        keyExtractor={(item,index) => index.toString()}
                    />
                }
                <View>
                    <Button title="Manage masterdata" onPress={updateMasterData} />
                    <Button title="Add wares" onPress={AddInventory} />
                </View>

            </View>

        </>
    )
}

export default InventoryItems;