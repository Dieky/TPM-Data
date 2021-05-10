import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Button,
    TouchableNativeFeedback,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TextInput } from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker'
import { addToInventoryList } from '../dbfunctions/stamdata';
import { useNavigation } from '@react-navigation/native';

const AddItemScreen = (props) => {

    const { inventory, masterdata } = props.route.params;

    const navigation = useNavigation();

    const [selectedItem, setSelectedItem] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [unitType, setUnitType] = useState(0);
    const [unitAmount, setUnitAmount] = useState();
    const [location, setLocation] = useState();
    const [expirationDateObject, setExpirationDateObject] = useState(new Date())

    // Der opstår noget race conditioning hvis man bruger en hooks værdi (fx selectedItem)
    // det vil sige at man får ikke den aktuelle værdi, men istedet den tidligere værdi
    // i næste run vil man så have igen den "tidligere" værdi selvom man tror man har valgt en "ny" værdi
    // LØSNING brug value/index og ALDRIG en hookværdi 
    // Opdaterer de forskellige dropdowns ud fra hvilket item man har valgt
    const selectedItemHandler = (value, index) => {
        setSelectedItem(value);
        let main_category_ref = masterdata.itemlist[index].category;
        let unitType_ref = masterdata.itemlist[index].unitType
        setUnitType(unitType_ref); // Ændrer unitType dropdown ud fra et items reference
        setSelectedCategory(main_category_ref);


        let expire_date = new Date();
        let item_expiration_months = parseInt(masterdata.itemlist[value].expiration);
        expire_date.setMonth(expire_date.getMonth() + item_expiration_months);
        setExpirationDateObject(expire_date)


    }



    const selectedCategoryHandler = (value, index) => {
        setSelectedCategory(value)
    }

    const selectedUnitTypeHandler = (value, index) => {
        setUnitType(value);

    }

    const selectedLocationHandler = (value, index) => {
        setLocation(value);
    }


    const addItem = () => {
        // let expire_date = new Date();

        // // henter aktuel dato  .split("T")[0] formaterer så vi splitter ved T og tager første del af string foran T'et
        // // resultatet er et format der ligner følgende: YYYY-MM-DD
        let dags_dato = new Date();
        let created_date = dags_dato.toISOString().split("T")[0];

        // // tager holdbarheden på det valgte item og udregner udløbsdato
        // let item_expiration_months = parseInt(masterdata.itemlist[selectedItem].expiration);
        // expire_date.setMonth(expire_date.getMonth() + item_expiration_months);
        // let expiration_date = expire_date.toISOString().split("T")[0];
        let expiration_date = expirationDateObject.toISOString().split("T")[0];

        let data = {
            itemId: selectedItem,
            categoryId: selectedCategory,
            unitTypeId: unitType,
            locationId: location,
            amount: unitAmount,
            created_date: created_date,
            expiration_date: expiration_date,
        }
        let tmpArray = inventory.inventorylist;
        tmpArray.push(data);
        addToInventoryList(inventory.documentId, tmpArray);
        // console.log(inventory.documentId);
    }

    const textInputHandler = (txt) => {
        setUnitAmount(txt);

    }


    return (
        <>
            {/* Ændrer selectedItem og valg af denne vil ændre i selectedcategory og unitType */}
            <Picker
                selectedValue={selectedItem}
                onValueChange={(itemValue, itemIndex) => selectedItemHandler(itemValue, itemIndex)}
                mode="dropdown"
            >
                {masterdata.itemlist.map((data, index) => {
                    return (
                        <Picker.Item key={index} label={data.name} value={index} />
                    )
                })}
            </Picker>

            {/* Ændrer selectedCategory */}
            <Picker
                selectedValue={selectedCategory}
                onValueChange={(itemValue, itemIndex) => selectedCategoryHandler(itemValue, itemIndex)}
                mode="dropdown"
            >
                {masterdata.category.map((data, index) => {
                    return (
                        <Picker.Item key={index} label={`${data.main_category} + ${data.second_category}`} value={index} />
                    )
                })}
            </Picker>

            {/* Ændrer unitType */}
            <Picker
                selectedValue={unitType}
                onValueChange={(itemValue, itemIndex) => selectedUnitTypeHandler(itemValue, itemIndex)}
                mode="dropdown"
            >
                {masterdata.unitTypes.map((data, index) => {
                    return (
                        <Picker.Item key={index} label={data.name} value={index} />
                    )
                })}
            </Picker>

            <TextInput
                placeholder="enter unit amount"
                value={unitAmount}
                onChangeText={(txt) => textInputHandler(txt)}
                keyboardType="numeric"
            />

            {/* Ændrer location */}
            <Picker
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


            {/* ændrer datoen. Denne dato ændres automatisk når der vælges et nyt item. Man kan herefter vælge en anden dato end den default som er beregnet ud fra item */}
            <DatePicker
                date={expirationDateObject}
                onDateChange={setExpirationDateObject}
                mode="date"
            />


            <Button title="Add" onPress={addItem} />
        </>
    )
}

export default AddItemScreen;