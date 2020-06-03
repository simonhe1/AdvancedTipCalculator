import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import ItemScreen from "../screens/ItemScreen";
import ItemsInfoScreen from "../screens/ItemsInfoScreen";
import UsersInfoScreen from "../screens/UsersInfoScreen";
import UserScreen from "../screens/UserScreen";
import ResultScreen from "../screens/ResultScreen";
import SettingsScreen from "../screens/SettingsScreen";
import TempScreen from "../screens/TempScreen";
import TempUserNameScreen from "../screens/TempUserNameScreen";
import TempItemScreen from "../screens/TempItemScreen";
import TempItemPriceScreen from "../screens/TempItemPriceScreen";
import TempUserSelectionScreen from "../screens/TempUserSelectionScreen";

const Router = (props) => {
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();

  // const createHomeStack = () => {
  //   return (
  //     <Stack.Navigator
  //       screenOptions={{
  //         gestureEnabled: false,
  //       }}
  //     >
  //       <Stack.Screen name="UserCount" component={HomeScreen} />
  //       <Stack.Screen name="ItemCount" component={ItemScreen} />
  //       <Stack.Screen name="Users" component={UsersInfoScreen} />
  //       <Stack.Screen name="Items" component={ItemsInfoScreen} />
  //       <Stack.Screen name="User" component={UserScreen} />
  //       <Stack.Screen name="Result" component={ResultScreen} />
  //     </Stack.Navigator>
  //   );
  // };

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
          component={TempScreen}
        />
        <Stack.Screen name="Users" component={TempUserNameScreen} />
        <Stack.Screen name="Items" component={TempItemScreen} />
        <Stack.Screen name="ItemsPrices" component={TempItemPriceScreen} />
        <Stack.Screen
          name="UserSelection"
          component={TempUserSelectionScreen}
        />
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
