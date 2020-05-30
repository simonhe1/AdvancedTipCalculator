import React, { useState, useEffect } from "react";
import { View, Text, Icon } from "native-base";
import { StyleSheet } from "react-native";

const UserResultsHeader = ({ item, expanded, tipPercentage }) => {
  const { name, data } = item;
  const [price, setPrice] = useState(0);
  const TAX = 0.08875;

  useEffect(() => {
    addUpPrices();
  }, [tipPercentage]);

  const addUpPrices = () => {
    let sum = 0;
    data.forEach((item) => {
      const { price } = item;
      sum += Number(price);
    });
    sum = Number(sum).toFixed(2);
    setPrice(sum);
  };

  const applyTaxAndTip = () => {
    let newPrice = Number(price);
    const tip = Number((price * tipPercentage) / 100);
    const tax = Number(price * TAX);
    newPrice = Number(newPrice + tax + tip).toFixed(2);
    return newPrice;
  };

  return (
    <View style={styles.header}>
      <Text> {`${name} owes $${applyTaxAndTip()}`} </Text>
      {expanded ? <Icon name="remove-circle" /> : <Icon name="add-circle" />}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#A9DAD6",
  },
  nameText: {
    fontWeight: "600",
  },
});
export default UserResultsHeader;
