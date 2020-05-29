import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, StyleSheet, Button } from "react-native";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import Item from "../components/Item";
import colors from "../config/colors";

const ItemsInfoScreen = ({ route, navigation }) => {
  const { numberOfItems, usersData } = route.params;
  const [itemsData, setItemsData] = useState([{}]);

  useEffect(() => {
    let itemsArr = [];
    for (let i = 0; i < numberOfItems; i++)
      itemsArr.push({ name: "", price: "", id: `${i}` });

    setItemsData(itemsArr);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Items",
      headerRight: () => (
        <Button
          onPress={() => {
            const mapping = mapUsersToItems();
            navigation.navigate("User", {
              mapping,
              mappingIndex: 0,
              itemsData,
            });
          }}
          title="Next"
          color={colors.blue}
          disabled={numberOfItems === ""}
        />
      ),
    });
  });

  const onNameChange = (name, id) => {
    setItemsData((prevState) =>
      prevState.map((obj) => (obj.id === id ? { ...obj, name } : obj))
    );
  };

  const onPriceChange = (price, id) => {
    setItemsData((prevState) =>
      prevState.map((obj) => (obj.id === id ? { ...obj, price } : obj))
    );
  };

  const mapUsersToItems = () => {
    let itemCopy = itemsData.slice();
    itemCopy.forEach((obj, index) => {
      let price = obj.price;
      // First we need to filter item data in cases such as 089, 10. , 10.4
      // Removes leading 0's
      price.replace(/^0+/, " ");
      // Changes decimals with 0 or 1 numbers after decimal to proper format of 2 decimals
      price = Number(price).toFixed(2);
      // Mutates the current object we're working on with the updated price
      return (itemCopy[index] = { ...obj, price });
    });
    // First we need to create a mapping for users to each item
    let mapping = [];
    usersData.map(({ name, id }) => {
      let user = { name, id, data: [...itemCopy] };
      mapping.push(user);
    });
    return mapping;
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareFlatList
        style={styles.itemsList}
        keyExtractor={(item, index) => `${index}`}
        data={itemsData}
        renderItem={({ item }) => (
          <Item
            price={item.price}
            id={item.id}
            onPriceChange={onPriceChange}
            onNameChange={onNameChange}
          />
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemsList: {
    flex: 1,
  },
});
export default ItemsInfoScreen;
