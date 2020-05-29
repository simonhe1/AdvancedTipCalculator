import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, StyleSheet, Button } from "react-native";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import Person from "../components/Person";
import colors from "../config/colors";

const UsersInfoScreen = ({ route, navigation }) => {
  const { numberOfItems, numberOfPeople } = route.params;
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    let usersArr = [];

    for (let i = 0; i < numberOfPeople; i++)
      usersArr.push({ name: "", id: `${i}` });

    setUsersData(usersArr);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Users",
      headerRight: () => (
        <Button
          onPress={() =>
            navigation.navigate("Items", {
              usersData: usersData,
              numberOfItems: Number(numberOfItems),
            })
          }
          title="Next"
          color={colors.blue}
          disabled={numberOfItems === ""}
        />
      ),
    });
  });

  const handleChange = (name, id) => {
    setUsersData((prevState) =>
      prevState.map((obj) => (obj.id === id ? { ...obj, name } : obj))
    );
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareFlatList
        style={styles.usersList}
        keyExtractor={(item, index) => `${index}`}
        data={usersData}
        renderItem={({ item }) => (
          <Person id={item.id} handleChange={handleChange} />
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemsList: {
    flex: 1,
  },
  usersList: {
    flex: 1,
  },
});
export default UsersInfoScreen;
