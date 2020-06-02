import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Animated,
  TouchableOpacity,
} from "react-native";
import { Fontisto, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { connect } from "react-redux";
import {
  incrementItemQuantity,
  decrementItemQuantity,
  deleteItem,
} from "../actions/items";
import { Swipeable } from "react-native-gesture-handler";
import colors from "../config/colors";

const ItemNameQuantity = ({
  name,
  quantity,
  id,
  deleteItem,
  incrementItemQuantity,
  decrementItemQuantity,
}) => {
  const focusNextInput = (name) => {
    nameRef.current = name;
    priceRef.current.focus();
  };

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
    let regex = /^\d+(\.\d{0,2})?$/;
    const newPriceIsNum = regex.test(amount);
    const oldPriceIsNum = regex.test(price);

    if (newPriceIsNum || amount === "") {
      onPriceChange(String(amount), id);
    } else if (oldPriceIsNum) {
      onPriceChange(String(price), id);
    }
  };

  const focusNextPriceInput = () => {
    priceRef[id].focus();
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
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="food" size={32} />
          </View>
          <View style={styles.nameContainer}>
            <Text>{name} </Text>
          </View>
        </View>
        <View style={styles.quantityContainer}>
          <View style={styles.iconContainer}>
            <Fontisto name="hashtag" size={24} color="black" />
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => decrementItemQuantity(id)}>
              <Feather name="minus-circle" size={24} color="red" />
            </TouchableOpacity>
          </View>
          <View style={styles.quantityTextContainer}>
            <Text>{quantity}</Text>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => incrementItemQuantity(id)}>
              <Feather name="plus-circle" size={24} color="green" />
            </TouchableOpacity>
          </View>
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
  quantityContainer: {
    flex: 1,
    flexDirection: "row",
  },
  quantityTextContainer: {
    flex: 2,
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
    incrementItemQuantity: (id) => dispatch(incrementItemQuantity(id)),
    decrementItemQuantity: (id) => dispatch(decrementItemQuantity(id)),
    deleteItem: (id) => dispatch(deleteItem(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemNameQuantity);
