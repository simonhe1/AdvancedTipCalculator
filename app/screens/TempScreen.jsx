import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getRandomColor } from "../config/randomColor";
import colors from "../config/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { connect } from "react-redux";

const TempScreen = ({ gradientColorsBackground }) => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <LinearGradient
      colors={gradientColorsBackground}
      style={styles.gradientContainer}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Easy Split</Text>
      </View>
      <View style={styles.beginButtonContainer}>
        <View style={styles.emptySpace} />
        <LinearGradient
          colors={[getRandomColor(), getRandomColor()]}
          style={styles.buttonGradient}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Users")}>
            <Text style={styles.beginButtonText}>Begin</Text>
          </TouchableOpacity>
        </LinearGradient>
        <View style={styles.emptySpace} />
      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  beginButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 3,
    width: "100%",
  },
  beginButtonText: {
    fontWeight: "bold",
    fontSize: 30,
    color: colors.purple,
  },
  buttonGradient: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    borderRadius: 20,
  },
  emptySpace: {
    flex: 3,
    backgroundColor: "transparent",
  },
  gradientContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 100,
    fontWeight: "bold",
    color: colors.lightgrey,
    fontFamily: "HoeflerText-Italic",
  },
});
const mapStateToProps = (state) => {
  return {
    gradientColorsBackground: state.gradientReducer.gradientColorsBackground,
  };
};

export default connect(mapStateToProps)(TempScreen);
