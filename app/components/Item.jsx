import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Animated,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { addItemPrice, deleteItem } from "../actions/items";
import { Swipeable } from "react-native-gesture-handler";
import colors from "../config/colors";

const Item = ({
  name,
  quantity,
  id,
  price,
  addItemPrice,
  deleteItem,
  items,
}) => {
  const handlePriceChange = (amount) => {
    /*  
        Checks whether new price matches regex that
        Accepts     Rejects
        244         10.895
        10.89       alphabets
        9.5         10.8.9
        10.         9,85
        0940.94     .85
    */
    const regex = /^\d+(\.\d{0,2})?$/;
    const newPriceIsNum = regex.test(amount);
    const oldPriceIsNum = regex.test(price);

    if (newPriceIsNum || amount === "") {
      addItemPrice(amount, id);
    } else if (oldPriceIsNum) {
      addItemPrice(price, id);
    }
  };

  const swipeRight = (rightX) => {
    const scale = rightX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0.9],
      extrapolate: "clamp",
    });

    const opacity = rightX.interpolate({
      inputRange: [-100, -20, 0],
      outputRange: [1, 0.9, 0],
      extrapolate: "clamp",
    });

    return (
      <TouchableOpacity onPress={() => deleteItem(id)}>
        <Animated.View style={[styles.animatedDeleteButton, { opacity }]}>
          <Animated.Text
            style={[styles.animatedDeleteText, { transform: [{ scale }] }]}
          >
            Delete
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={(_, dragX) => swipeRight(dragX)}>
      <View style={styles.container}>
        <View style={styles.itemContainer}>
          <View style={styles.quantityContainer}>
            <View style={styles.quantityTextContainer}>
              <Text>x{quantity}</Text>
            </View>
          </View>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="food" size={32} />
          </View>
          <View style={styles.nameContainer}>
            <Text>{name} </Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          {price === "-1" ? (
            <TextInput
              placeholder="Total Price"
              keyboardType="numeric"
              onChangeText={(amount) => handlePriceChange(amount)}
            />
          ) : (
            <TextInput
              value={price}
              keyboardType="numeric"
              onChangeText={(amount) => handlePriceChange(amount)}
            />
          )}
        </View>
      </View>
    </Swipeable>
  );
};
const styles = StyleSheet.create({
  animatedDeleteText: {
    fontWeight: "800",
    color: colors.white,
  },
  animatedDeleteButton: {
    flex: 1,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
  },
  iconContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  priceContainer: {
    flex: 1,
  },
  quantityContainer: {
    flex: 1,
    flexDirection: "row",
  },
  quantityTextContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  nameContainer: {
    flex: 3,
    fontSize: 20,
    alignItems: "flex-start",
    justifyContent: "center",
  },
});
const mapStateToProps = (state) => {
  return {
    items: state.itemsReducer.itemList,
    gradientColorsBackground: state.gradientReducer.gradientColorsBackground,
    gradientColorsButton: state.gradientReducer.gradientColorsButton,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItemPrice: (price, id) => dispatch(addItemPrice(price, id)),
    deleteItem: (id) => dispatch(deleteItem(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
