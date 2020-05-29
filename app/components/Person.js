import React, { useEffect } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { Octicons } from "@expo/vector-icons";

const Person = ({ id, handleChange }) => {
  const updateName = (name) => {
    handleChange(name, id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Octicons name="person" size={32} />
      </View>
      <View style={styles.nameContainer}>
        <TextInput
          style={styles.textContainer}
          autoFocus={id === "0"}
          placeholder="Name"
          onChangeText={(text) => updateName(text)}
        />
      </View>
    </View>
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
});
export default Person;
