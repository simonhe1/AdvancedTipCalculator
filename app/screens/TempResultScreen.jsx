import React, { useLayoutEffect, useEffect } from "react";
import { View, StyleSheet, Button } from "react-native";
import colors from "../config/colors";
import { Container, Accordion } from "native-base";
import UserResultsHeader from "../components/UserResultsHeader";
import UserResultsContent from "../components/UserResultsContent";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { mapUserToItems } from "../actions/users";

const TempResultScreen = ({
  users,
  items,
  gradientColorsBackground,
  mapUserToItems,
  tip,
  toggled,
}) => {
  const navigation = useNavigation();

  useEffect(() => {
    mapUserToItems(items);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Results",
      headerRight: () => (
        <Button
          onPress={() => {
            navigation.popToTop();
          }}
          title="Done"
          color={colors.blue}
        />
      ),
    });
  });

  return (
    <LinearGradient
      colors={gradientColorsBackground}
      style={styles.gradientBackground}
    >
      <Container style={styles.resultsContainer}>
        <View style={styles.viewContainer}>
          <Accordion
            dataArray={users}
            renderHeader={(item, expanded) => (
              <UserResultsHeader
                item={item}
                expanded={expanded}
                tipPercentage={tip}
              />
            )}
            renderContent={(item) => (
              <UserResultsContent item={item} tipPercentage={tip} />
            )}
          />
        </View>
      </Container>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white",
  },
  gradientBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  resultsContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "transparent",
    marginTop: 100,
  },
  slider: {
    flex: 1,
    width: "100%",
  },
  tipContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tipText: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
  },
});
const mapStateToProps = (state) => {
  return {
    users: state.usersReducer.userList,
    items: state.itemsReducer.itemList,
    tip: state.tipReducer.tip,
    toggled: state.tipReducer.toggled,
    gradientColorsBackground: state.gradientReducer.gradientColorsBackground,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    mapUserToItems: (itemsArr) => dispatch(mapUserToItems(itemsArr)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TempResultScreen);
