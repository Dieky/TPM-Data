import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../appscreens/HomeScreen2";
import ReviewDetails from "../appscreens/Details";
import LoginScreen from "../appscreens/LoginScreen";
import InventoryItems from "../appscreens/InventoryItems";
import Masterdata from "../appscreens/MasterData";
import UpdateLocationsScreen from "../appscreens/UpdateLocationsScreen";
import UpdateSingleLocation from "../appscreens/UpdateSingleLocation";

const Stack = createStackNavigator();

export default HomeNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Details" component={ReviewDetails} />
            <Stack.Screen name="InventoryItems" component={InventoryItems} />
            <Stack.Screen name="Masterdata" component={Masterdata} />
            <Stack.Screen name="UpdateLocationsScreen" component={UpdateLocationsScreen} />
            <Stack.Screen name="UpdateSingleLocation" component={UpdateSingleLocation} />
        </Stack.Navigator>
    </NavigationContainer>
);
