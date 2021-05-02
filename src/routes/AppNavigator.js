import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../appscreens/HomeScreen2";
import ReviewDetails from "../appscreens/Details";
import LoginScreen from "../appscreens/LoginScreen";
import InventoryItems from "../appscreens/InventoryItems";
import Masterdata from "../appscreens/MasterData";
import ShowLocationsScreen from "../appscreens/ShowLocationsScreen";
import UpdateSingleLocation from "../appscreens/UpdateSingleLocation";
import UpdateSingleUnitType from "../appscreens/UpdateSingleUnitType";
import ShowUnitTypeScreen from "../appscreens/ShowUnitTypeScreen";

const Stack = createStackNavigator();

export default HomeNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Details" component={ReviewDetails} />
            <Stack.Screen name="InventoryItems" component={InventoryItems} />
            <Stack.Screen name="Masterdata" component={Masterdata} />
            <Stack.Screen name="ShowLocationsScreen" component={ShowLocationsScreen} />
            <Stack.Screen name="ShowUnitTypeScreen" component={ShowUnitTypeScreen} />
            <Stack.Screen name="UpdateSingleLocation" component={UpdateSingleLocation} />
            <Stack.Screen name="UpdateSingleUnitType" component={UpdateSingleUnitType} />
        </Stack.Navigator>
    </NavigationContainer>
);
