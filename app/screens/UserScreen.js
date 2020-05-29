import React, { useLayoutEffect, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { CheckBox } from "react-native-elements";
import colors from "../config/colors";

const UserScreen = ({ route, navigation }) => {
  const { mapping, mappingIndex, itemsData } = route.params;
  const user = mapping[mappingIndex];
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const { data } = user;
    let choicesArr = [];
    for (let i = 0; i < data.length; i++) {
      choicesArr.push({ ...data[i], checked: false });
    }
    setOptions(choicesArr);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: user.name,
      headerRight: () => (
        <Button
          onPress={() => {
            const finalChoices = options.filter((obj) => obj.checked === true);
            mapping[mappingIndex]["data"] = finalChoices;
            let finishedMapping = mappingIndex + 1 === mapping.length;
            if (finishedMapping) {
              navigation.navigate("Result", {
                mapping,
                itemsData,
              });
            } else {
              navigation.push("User", {
                mapping,
                mappingIndex: mappingIndex + 1,
                itemsData,
              });
            }
          }}
          title="Next"
          color={colors.blue}
        />
      ),
    });
  });

  const handlePress = (id) => {
    setOptions((prevState) =>
      prevState.map((choice) =>
        choice.id === id ? { ...choice, checked: !choice.checked } : choice
      )
    );
  };

  return (
    <View style={styles.background}>
      <View style={styles.statementContainer}>
        <Text style={styles.statementText}>Choose What {user.name} got</Text>
      </View>
      <View style={styles.choicesContainer}>
        <FlatList
          data={options}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item }) => (
            <CheckBox
              title={item.name}
              checked={item.checked}
              onPress={() => handlePress(item.id)}
            />
          )}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "skyblue",
  },
  choicesContainer: {
    flex: 2,
    backgroundColor: "lime",
  },
  statementContainer: {
    flex: 1,
    backgroundColor: "yellow",
    justifyContent: "center",
    alignItems: "center",
  },
  statementText: {
    fontSize: 32,
    fontWeight: "bold",
  },
});
export default UserScreen;
