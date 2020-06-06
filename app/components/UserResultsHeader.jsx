import React, { useState, useEffect } from "react";
import { View, Text, Icon } from "native-base";
import { StyleSheet } from "react-native";

const UserResultsHeader = ({ item, expanded, tipPercentage }) => {
  const { name, data } = item;
  const TAX = 0.08875;

  const calculateTotal = () => {
    let totalPrice = 0;
    totalPrice = addUpPrices(totalPrice);
    totalPrice = applyTaxAndTip(totalPrice);
    return totalPrice;
  };

  const addUpPrices = (sum) => {
    data.forEach((item) => {
      const { price } = item;
      sum += Number(price);
    });
    sum = Number(sum).toFixed(2);
    return sum;
  };

  const applyTaxAndTip = (price) => {
    price = Number(price);
    const tip = Number((price * tipPercentage) / 100);
    const tax = Number(price * TAX);
    price = Number(price + tax + tip).toFixed(2);
    return price;
  };

  return (
    <View style={styles.header}>
      <Text> {`${name} owes $${calculateTotal()}`} </Text>
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
