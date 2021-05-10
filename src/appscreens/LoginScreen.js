import React, { useEffect, useState } from 'react';
import { TextInput, Text, Button, View } from 'react-native';
import styles from "../styles/GlobalStyling";
import auth from '@react-native-firebase/auth';


function LoginScreen({ route, navigation }) {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [mail, setMail] = useState("patrick@gmail.com");
    const [password, setPassword] = useState("123456");

    const LoginUser = () => {
        auth()
            .signInWithEmailAndPassword(mail, password)
            .then((user) => {
                setUser(user);
                navigation.navigate("Home", user);
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
    const CreateUser = () => {
        auth()
            .createUserWithEmailAndPassword(mail, password)
            .then((user) => {
                setUser(user);
                navigation.navigate("Home", user);
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

    const onChangeMail = (text) => {
        setMail(text);
    }

    const onChangePassword = (text) => {
        setPassword(text);
    }


    return (
        <>

            <View style={{padding: 10}}>

                <TextInput
                    style={styles.loginInputfield}
                    placeholder="patrick@gmail.com"
                    onChangeText={onChangeMail}
                    value={mail}
                />
                <TextInput
                    style={styles.loginInputfield}
                    secureTextEntry={true}
                    placeholder="123456"
                    onChangeText={onChangePassword}
                    value={password}
                />
                <Button title="Login" onPress={LoginUser} />
                <Button title="Create" onPress={CreateUser} />
            </View>
        </>
    );
}

export default LoginScreen;