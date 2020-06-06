import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SettingsScreen from "../screens/SettingsScreen";
import HomeScreen from "../screens/HomeScreen";
import UsersScreen from "../screens/UsersScreen";
import ItemsScreen from "../screens/ItemsScreen";
import ItemsPriceScreen from "../screens/ItemsPriceScreen";
import UserSelectionScreen from "../screens/UserSelectionScreen";
import ResultScreen from "../screens/ResultScreen";

const Router = () => {
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();

  const createHomeStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: false,
          headerTransparent: true,
        }}
      >
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen name="Users" component={UsersScreen} />
        <Stack.Screen name="Items" component={ItemsScreen} />
        <Stack.Screen name="ItemsPrices" component={ItemsPriceScreen} />
        <Stack.Screen name="UserSelection" component={UserSelectionScreen} />
        <Stack.Screen name="Results" component={ResultScreen} />
      </Stack.Navigator>
    );
  };
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" children={createHomeStack} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
export default Router;
