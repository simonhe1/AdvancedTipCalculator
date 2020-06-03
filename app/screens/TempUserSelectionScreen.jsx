import React, { useLayoutEffect, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { CheckBox } from "react-native-elements";
import colors from "../config/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { connect } from "react-redux";
import { addItemName } from "../actions/items";

const TempUserSelectionScreen = ({ items, gradientColorsBackground }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { mappingIndex } = route.params;
  const item = items[mappingIndex];
  console.log(item);
  const { name, data } = item;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: name,
      headerStyle: {
        backgroundColor: "transparent",
      },
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate("ItemsPrices")}
          title="Next"
          color={colors.blue}
        />
      ),
    });
  }, []);

  return (
    <LinearGradient
      colors={gradientColorsBackground}
      style={styles.gradientBackground}
    >
      <View style={styles.background}>
        <View style={styles.statementContainer}>
          <Text style={styles.statementText}>Choose Who got {name}</Text>
        </View>
        <View style={styles.choicesContainer}>
          <FlatList
            data={data}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({ item }) => (
              <CheckBox
                title={item.name}
                checked={item.checked}
                // onPress={() => handlePress(item.id)}
              />
            )}
          />
        </View>
      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  choicesContainer: {
    flex: 2,
  },
  gradientBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  statementContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  statementText: {
    fontSize: 32,
    fontWeight: "bold",
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
    addItemName: (name) => dispatch(addItemName(name)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TempUserSelectionScreen);
