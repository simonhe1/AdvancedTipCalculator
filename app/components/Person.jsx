import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Animated,
  TouchableOpacity,
} from "react-native";
import { Octicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { deleteUser } from "../actions/users";
import { Swipeable } from "react-native-gesture-handler";
import colors from "../config/colors";

const Person = ({ name, id, deleteUser }) => {
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
      <TouchableOpacity onPress={() => deleteUser(id)}>
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
        <View style={styles.iconContainer}>
          <Octicons name="person" size={32} />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.textContainer}>{name}</Text>
        </View>
      </View>
    </Swipeable>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  iconContainer: { flex: 1, paddingHorizontal: 20, paddingVertical: 20 },
  nameContainer: { flex: 9, paddingVertical: 20 },
  textContainer: { fontSize: 20 },
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
});
const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: (id) => dispatch(deleteUser(id)),
  };
};
export default connect(null, mapDispatchToProps)(Person);
