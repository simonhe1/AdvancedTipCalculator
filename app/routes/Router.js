import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import ItemScreen from "../screens/ItemScreen";
import ItemsInfoScreen from "../screens/ItemsInfoScreen";
import UsersInfoScreen from "../screens/UsersInfoScreen";
import UserScreen from "../screens/UserScreen";
import ResultScreen from "../screens/ResultScreen";

const Router = (props) => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="UserCount" component={HomeScreen} />
        <Stack.Screen name="ItemCount" component={ItemScreen} />
        <Stack.Screen name="Users" component={UsersInfoScreen} />
        <Stack.Screen name="Items" component={ItemsInfoScreen} />
        <Stack.Screen name="User" component={UserScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Router;
