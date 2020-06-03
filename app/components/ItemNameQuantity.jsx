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
const mapDispatchToProps = (dispatch) => {
  return {
    incrementItemQuantity: (id) => dispatch(incrementItemQuantity(id)),
    decrementItemQuantity: (id) => dispatch(decrementItemQuantity(id)),
    deleteItem: (id) => dispatch(deleteItem(id)),
  };
};

export default connect(null, mapDispatchToProps)(ItemNameQuantity);
