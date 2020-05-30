import React, { useState, useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Button,
} from "react-native";
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const [numberOfPeople, setNumberOfPeople] = useState("2");
  const navigation = useNavigation();

  const handleChange = (value) => {
    let number = Number(value);
    // Checks if user entered an actual number. If not make it blank
    if (number) {
      setNumberOfPeople(String(number));
    } else {
      setNumberOfPeople("");
    }
  };

  const addToNumber = () => {
    setNumberOfPeople((prevState) => {
      let number = Number(prevState);
      if (number === 999) return "999";
      return String(number + 1);
    });
  };

  const subtractToNumber = () => {
    setNumberOfPeople((prevState) => {
      let number = Number(prevState);
      if (number === 1) return "1";
      return String(number - 1);
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "People Count",
      headerRight: () => (
        <Button
          title="Next"
          color={colors.blue}
          onPress={() =>
            navigation.navigate("ItemCount", {
              numberOfPeople: Number(numberOfPeople),
            })
          }
          disabled={numberOfPeople === ""}
        />
      ),
    });
  });

  return (
    // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <TouchableWithoutFeedback>
      <View style={styles.background}>
        <View style={styles.whitespace}></View>
        <View style={styles.userInteraction}>
          <View style={styles.questionContainer}>
            <Text style={styles.question}>How many people?</Text>
          </View>
          <View style={styles.answerContainer}>
            <View style={styles.subtractContainer}>
              <TouchableOpacity
                style={styles.subtract}
                onPress={() => subtractToNumber()}
              >
                <View>
                  <Text style={styles.subtractText}>-</Text>
                </View>
              </TouchableOpacity>
            </View>
            <TextInput
              keyboardType="number-pad"
              onChangeText={(text) => handleChange(text)}
              style={styles.input}
              autoFocus={true}
              contextMenuHidden={true}
              value={String(numberOfPeople)}
              maxLength={3}
            />
            <View style={styles.addContainer}>
              <TouchableOpacity
                style={styles.add}
                onPress={() => addToNumber()}
              >
                <View>
                  <Text style={styles.addText}>+</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.whitespace}></View>
        <View style={styles.whitespace}></View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  add: {
    backgroundColor: "green",
    borderWidth: 1,
    padding: 16,
    borderRadius: 50,
    borderColor: "#bbb",
    borderStyle: "dashed",
    alignItems: "center",
  },
  addContainer: {
    flex: 1,
    // backgroundColor: "yellow",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  addText: {
    fontSize: 40,
  },
  answerContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    // backgroundColor: "pink",
  },
  background: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    fontSize: 40,
    textAlign: "center",
  },
  subtract: {
    backgroundColor: "red",
    borderWidth: 1,
    padding: 16,
    borderRadius: 50,
    borderColor: "#bbb",
    borderStyle: "dashed",
    alignItems: "center",
  },
  subtractContainer: {
    flex: 1,
    // backgroundColor: "purple",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  subtractText: {
    fontSize: 40,
  },
  question: {
    fontSize: 40,
    fontWeight: "bold",
  },
  questionContainer: {
    flex: 1,
    justifyContent: "center",
  },
  userInteraction: {
    flex: 3,
    // backgroundColor: "blue",
    width: "100%",
    alignItems: "center",
  },
  whitespace: {
    flex: 2,
    backgroundColor: colors.white,
  },
});
export default HomeScreen;
