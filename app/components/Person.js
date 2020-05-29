import React, { useEffect } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { Octicons } from "@expo/vector-icons";

const Person = ({ id, handleChange, userInfoRefs, handleFocus }) => {
  const updateName = (name) => {
    handleChange(name, id);
  };

  const focusNextInput = () => {
    let nextNum = Number(id) + 1;
    handleFocus(nextNum);
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Octicons name="person" size={32} />
      </View>
      <View style={styles.nameContainer}>
        <TextInput
          ref={(ref) => (userInfoRefs[id] = ref)}
          style={styles.textContainer}
          autoFocus={id === "0"}
          placeholder="Name"
          onChangeText={(text) => updateName(text)}
          onSubmitEditing={() => focusNextInput()}
          blurOnSubmit={false}
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
