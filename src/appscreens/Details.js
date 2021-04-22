import React from "react";
import {
    View,
    Text,
    Button,
} from 'react-native';


function DetailsScreen({ route, navigation }) {
    const { testObj } = route.params;
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>
            <Button
                title="Go to Details... again"
                onPress={() => navigation.navigate('Details')}
            />
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
            <Button title="Go back" onPress={() => navigation.goBack()} />
            {testObj && <Text>The following msg "{testObj.msg2}" was passed by a prop from HomeScreen2</Text>}
        </View>
    );
}

export default DetailsScreen;