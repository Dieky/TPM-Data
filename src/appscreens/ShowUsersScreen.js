import React from "react";
import {
    View,
    Text,
    Pressable,
    Button,
    Alert,
    TextInput,
} from 'react-native';
import { useEffect, useState } from "react/cjs/react.development";
import { addUser } from "../dbfunctions/DBActions";
import { useNavigation } from '@react-navigation/native';
import { ValidateEmail } from "../utils/InputValidation";

const ShowUsersScreen = (props) => {

    const { inventory } = props.route.params;
    const navigation = useNavigation();
    const [newUser, setNewUser] = useState();

    // checks if you are trying to edit your own email and rejects that action, as you can potentially lock yourself out if this check is not made
    const updateSingle = (username, index) => {
        if (index == 0) {
            Alert.alert("Cannot edit your own email");
        } else {
            navigation.navigate("UpdateSingleUser", { inventory: inventory, username: username, index: index })
        }
    }

    // Checks the email and adds the user if the email is good
    const addHandler = async () => {
        let testResult = ValidateEmail(newUser);
        if (testResult == true) {
            let tmpArray = inventory.usersAllowed;
            tmpArray.push(newUser);
            await addUser(inventory.documentId, tmpArray);
            navigation.navigate("ShowUsersScreen", { changesMade: true })
        } else {
            Alert.alert("Incorrect email pattern was provided");
        }
    }


    return (
        <>
            {inventory.usersAllowed.map((data, index) => {
                return (
                    <Pressable key={index} onPress={() => updateSingle(data, index)}>
                        <Text>{data}</Text>
                    </Pressable>

                )
            })}
            <TextInput
                placeholder="add new user"
                value={newUser}
                onChangeText={setNewUser}

            />
            <Button title="Add user" onPress={addHandler} />
        </>
    )

}

export default ShowUsersScreen;

