import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../appscreens/HomeScreen2";
import ReviewDetails from "../appscreens/Details";
import LoginScreen from "../appscreens/LoginScreen";

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
    <Navigator headerMode="none">
        <Screen name="Login" component={LoginScreen} />
        <Screen name="Home" component={Home} />
        <Screen name="Details" component={ReviewDetails} />
    </Navigator>
);

export const AppNavigator = () => (
    <NavigationContainer>
        <HomeNavigator />
    </NavigationContainer>
);
