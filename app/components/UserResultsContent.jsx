import React, { useState, useEffect } from "react";
import { View, Text } from "native-base";
import { StyleSheet } from "react-native";

const UserResultsContent = ({ item, tipPercentage }) => {
  const { data } = item;
  const [individualPrices, setIndividualPrices] = useState([]);
  const TAX = 0.08875;

  useEffect(() => {
    let individualArr = [];
    data.forEach((obj) => {
      const { name, price, id } = obj;
      const newPrice = applyTaxAndTip(price);
      individualArr.push({ name, oldPrice: price, id, newPrice });
    });
    setIndividualPrices(individualArr);
  }, [tipPercentage]);

  const applyTaxAndTip = (oldPrice) => {
    let newPrice = Number(oldPrice);
    const tip = Number((oldPrice * tipPercentage) / 100);
    const tax = Number(oldPrice * TAX);
    newPrice = Number(newPrice + tax + tip).toFixed(2);
    return newPrice;
  };

  const renderIndividualPrices = () => {
    let pricesArr = [];
    individualPrices.forEach((obj, index) => {
      pricesArr.push(
        <View style={styles.individualContentContainer} key={index}>
          <View>
            <Text>{obj.name}</Text>
          </View>
          <View>
            <Text>Base Price: </Text>
            <Text>{obj.oldPrice}</Text>
          </View>
          <View>
            <Text>New Price: </Text>
            <Text>{obj.newPrice}</Text>
          </View>
        </View>
      );
    });
    return pricesArr;
  };

  return (
    <View style={styles.contentContainer}>{renderIndividualPrices()}</View>
  );
};
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: "#e3f1f1",
    padding: 10,
  },
  individualContentContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
export default UserResultsContent;
