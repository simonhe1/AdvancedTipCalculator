import React, { useLayoutEffect } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { CheckBox } from "react-native-elements";
import colors from "../config/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { connect } from "react-redux";
import { changeItemChoice } from "../actions/items";

const UserSelectionScreen = ({
  items,
  gradientColorsBackground,
  changeItemChoice,
}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { mappingIndex } = route.params;
  const item = items[mappingIndex];
  const { name, data } = item;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: name,
      headerStyle: {
        backgroundColor: "transparent",
      },
      headerRight: () => (
        <Button
          onPress={() => {
            let finishedMapping = mappingIndex + 1 === items.length;
            if (finishedMapping) {
              navigation.navigate("Results");
            } else {
              navigation.push("UserSelection", {
                mappingIndex: mappingIndex + 1,
              });
            }
          }}
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
                onPress={() => changeItemChoice(mappingIndex, item.id)}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeItemChoice: (itemID, userID) =>
      dispatch(changeItemChoice(itemID, userID)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSelectionScreen);
