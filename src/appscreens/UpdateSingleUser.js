import React from "react";
import {
    View,
    Text,
    Pressable,
    Button,
    Alert,
    TextInput,
} from 'react-native';
import { useState } from "react/cjs/react.development";
import { addUser } from "../dbfunctions/DBActions";
import { useNavigation } from '@react-navigation/native';
import { ValidateEmail } from "../utils/InputValidation";

const UpdateSingleUser = (props) => {

    const { inventory, username, index } = props.route.params;
    const navigation = useNavigation();
    const [newUser, setNewUser] = useState(username);

    // Checks the email and updates the user if the email is good
    const updateHandler = async () => {
        let testResult = ValidateEmail(newUser);
        if (testResult == true) {
            let tmpArray = inventory.usersAllowed;
            tmpArray[index] = newUser;
            await addUser(inventory.documentId, tmpArray);
            navigation.navigate("ShowUsersScreen", { changesMade: true })
        } else {
            Alert.alert("Incorrect email pattern was provided");
        }
    }

    return (
        <>

            <TextInput
                placeholder="add new user"
                value={newUser}
                onChangeText={setNewUser}

            />
            <Button title="Update" onPress={updateHandler} />
        </>
    )

}

export default UpdateSingleUser;

