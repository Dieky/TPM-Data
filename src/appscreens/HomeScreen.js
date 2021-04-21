import React, { useEffect, useState } from 'react';
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
    Alert,
    Touchable,
} from 'react-native';
import auth, { firebase } from '@react-native-firebase/auth';

import { fetchData, addItem } from '../dbfunctions/constants'
import DropdownSelector from '../components/DropdownSelector'

const HomeScreen = () => {

    const [activeShelf, setActiveShelf] = useState("1");
    const [selectedItem, setSelectedItem] = useState({});
    const [shelves, setShelves] = useState([{ name: "1" }, { name: "2" }, { name: "3" }, { name: "4" }, { name: "5" }, { name: "6" }, { name: "7" }, { name: "8" }]);
    const [constants, setConstants] = useState([]);
    const [unitTypes, setUnitTypes] = useState([{ name: "kg" }, { name: "gram" }, { name: "stk" }])
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    function LoginApp() {
        // Set an initializing state whilst Firebase connects
        const [initializing, setInitializing] = useState(true);
        const [user, setUser] = useState();

        // Handle user state changes
        function onAuthStateChanged(user) {
            setUser(user);
            if (initializing) setInitializing(false);
        }

        useEffect(() => {
            const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
            return subscriber; // unsubscribe on unmount
        }, []);

        if (initializing) return null;

        if (!user) {
            return (
                <View>
                    <Text>Login</Text>
                </View>
            );
        }

        return (
            <View>
                <Text>Welcome {user.email}</Text>
            </View>
        );
    }

    const masterDropdown = async (item) => {
        let today = new Date();
        let daysUntilExpire = today.getDate() + (item.expiration * 30)
        today.setDate(daysUntilExpire)
        item = { ...item, expiration: today.toLocaleDateString(), shelfLocation: activeShelf }
        setSelectedItem(item)
    }

    const unitTypeHandler = async (item) => {
        setSelectedItem({ ...selectedItem, unitType: item.name })
    }

    const handleShelves = async (item) => {
        setActiveShelf(item.name);
        setSelectedItem({ ...selectedItem, shelfLocation: item.name })
    }

    const loadData = async () => {
        await fetchData().then((res) => setConstants(res));
    }

    const addItemHandler = async () => {
        await addItem(selectedItem).then(Alert.alert("Item added succesfully")).catch(err => console.log(err));
    }

    const createUser = () => {
        auth()
            .createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
            .then((user) => {
                // firebase.addToUsersTabel(user)
                console.log('User account created & signed in!');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });

    }

    const LogOff = () => {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
    }

    const LoginUser = () => {
        auth()
            .signInWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
            .then((user) => {
                console.log(user);
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });

    }


    const addUserToBeholdning = () => {
        
    }
    // https://stackoverflow.com/questions/28735377/where-does-firebase-save-its-simple-login-users 
    // Informationen er ikke tilgængelig for os, så vi skal selv oprette en users tabel efter at vi har authenticated og så smide
    // data ned i DB med relevant data. email, navn osv

    useEffect(() => {
        // loadData();
    }, []);

    return (
        // <View>
        //     <LoginApp />
        //     {/* <Button title="Add user" onPress={addUserToBeholdning} */}
        //     <Button title="Create user Jane" onPress={createUser} />
        //     <Button title="Logoff" onPress={LogOff} />
        //     <Button title="Login as Jane" onPress={LoginUser} />
        // </View>
        <>
            <SafeAreaView style={styles.scrollView}>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                    <View style={styles.container}>

                        <View style={styles.horizontalContainer}>
                            <Text style={styles.textStyling}> Navn på varen</Text>
                        </View>
                        {/* Her skal der være et searchable field hvor den efter input begynder at søge på kendte varer i DB */}

                        <View style={styles.horizontalContainer}>
                            <DropdownSelector Choices={constants} Handler={masterDropdown} />
                        </View>
                        <View style={styles.horizontalContainer}>
                            <View>
                                <Text style={styles.textStyling}>Holdbar til (mm/dd/yy)</Text>
                                <TextInput
                                    style={styles.inputfield}
                                    onChangeText={text => setSelectedItem({ ...selectedItem, expiration: text })}
                                    value={selectedItem.expiration}
                                />
                            </View>
                        </View>

                        <View style={styles.horizontalContainer}>
                            <View>
                                <Text style={styles.textStyling}>Enhedstype</Text>
                                <View style={styles.horizontalContainer}>
                                    <DropdownSelector DefaultVal={selectedItem.unitType} Choices={unitTypes} Handler={unitTypeHandler} />
                                    <TextInput
                                        placeholder={'angiv mængde'}
                                        keyboardType='numeric'
                                        style={styles.inputfield}
                                        onChangeText={unityTypeValue => setSelectedItem({ ...selectedItem, unityTypeValue: unityTypeValue })}
                                        value={selectedItem.unityTypeValue}
                                    />
                                </View>
                            </View>
                        </View>


                        <View style={styles.horizontalContainer}>
                            <Text style={styles.textStyling}>Vælg hylde</Text>
                        </View>
                        <View style={styles.horizontalContainer}>
                            <DropdownSelector DefaultVal={selectedItem.shelfLocation} Handler={handleShelves} Choices={shelves} />
                        </View>

                        <View style={styles.horizontalContainer}>
                            {selectedItem.unityTypeValue && selectedItem.shelfLocation &&
                                <Button title="Opret" onPress={addItemHandler} />
                            }
                        </View>

                    </View>
                </ScrollView>
            </SafeAreaView>
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
        paddingBottom: 10,
        paddingTop: 10,
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

export default HomeScreen;