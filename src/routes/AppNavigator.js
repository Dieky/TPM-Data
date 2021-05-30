import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../appscreens/HomeScreen";
import LoginScreen from "../appscreens/LoginScreen";
import InventoryItems from "../appscreens/InventoryItems";
import Masterdata from "../appscreens/MasterData";
import ShowLocationsScreen from "../appscreens/ShowLocationsScreen";
import UpdateSingleLocation from "../appscreens/UpdateSingleLocation";
import UpdateSingleUnitType from "../appscreens/UpdateSingleUnitType";
import UpdateSingleCategory from "../appscreens/UpdateSingleCategory";
import ShowUnitTypeScreen from "../appscreens/ShowUnitTypeScreen";
import ShowCategoriesScreen from "../appscreens/ShowCategoriesScreen";
import ShowItemsScreen from "../appscreens/ShowItemsScreen";
import UpdateSingleItem from "../appscreens/UpdateSingleItem";
import AddItemScreen from "../appscreens/AddItemScreen";
import UpdateSingleInventoryItem from "../appscreens/UpdateSingleInventoryItem";
import ShowUsersScreen from "../appscreens/ShowUsersScreen";
import UpdateSingleUser from "../appscreens/UpdateSingleUser";

const Stack = createStackNavigator();

export default HomeNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="InventoryItems" component={InventoryItems} />
            <Stack.Screen name="Masterdata" component={Masterdata} />
            <Stack.Screen name="ShowLocationsScreen" component={ShowLocationsScreen} />
            <Stack.Screen name="ShowUnitTypeScreen" component={ShowUnitTypeScreen} />
            <Stack.Screen name="UpdateSingleLocation" component={UpdateSingleLocation} />
            <Stack.Screen name="UpdateSingleUnitType" component={UpdateSingleUnitType} />
            <Stack.Screen name="ShowCategoriesScreen" component={ShowCategoriesScreen} />
            <Stack.Screen name="UpdateSingleCategory" component={UpdateSingleCategory} />
            <Stack.Screen name="ShowItemsScreen" component={ShowItemsScreen} />
            <Stack.Screen name="UpdateSingleItem" component={UpdateSingleItem} />
            <Stack.Screen name="AddItemScreen" component={AddItemScreen} />
            <Stack.Screen name="UpdateSingleInventoryItem" component={UpdateSingleInventoryItem} />
            <Stack.Screen name="ShowUsersScreen" component={ShowUsersScreen} />
            <Stack.Screen name="UpdateSingleUser" component={UpdateSingleUser} />
        </Stack.Navigator>
    </NavigationContainer>
);
