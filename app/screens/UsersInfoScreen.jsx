import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Button,
  Animated,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import Person from "../components/Person";
import colors from "../config/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Swipeable } from "react-native-gesture-handler";

const UsersInfoScreen = () => {
  const [usersData, setUsersData] = useState([]);
  const userInfoRefs = {};
  const nextButtonRef = useRef(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { numberOfItems, numberOfPeople } = route.params;

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
          ref={nextButtonRef}
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

  const handleFocus = (id) => {
    // If end of inputs, just press next button
    if (id == numberOfPeople) {
      nextButtonRef.current.props.onPress(
        navigation.navigate("Items", {
          usersData: usersData,
          numberOfItems: Number(numberOfItems),
        })
      );
    } else {
      userInfoRefs[id].focus();
    }
  };

  const deleteUser = (id) => {
    setUsersData((prevState) => prevState.filter((item) => item.id !== id));
  };

  const swipeRight = (rightX, id) => {
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
    <View style={styles.container}>
      <KeyboardAwareFlatList
        style={styles.usersList}
        keyExtractor={(item, index) => `${index}`}
        data={usersData}
        renderItem={({ item }) => (
          <Swipeable
            renderRightActions={(_, dragX) => swipeRight(dragX, item.id)}
          >
            <Person
              id={item.id}
              userInfoRefs={userInfoRefs}
              handleChange={handleChange}
              handleFocus={handleFocus}
            />
          </Swipeable>
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
export default UsersInfoScreen;
