import React, { useLayoutEffect, useRef, useEffect } from "react";
import {
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  SafeAreaView,
  FlatList,
  Keyboard,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../config/colors";
import { connect } from "react-redux";
import Item from "../components/Item";
import { mapItemToUsers } from "../actions/items";

const ItemsPriceScreen = ({
  items,
  users,
  gradientColorsBackground,
  mapItemToUsers,
}) => {
  const navigation = useNavigation();
  const flatListRef = useRef();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        flatListRef.current.scrollToEnd({ animated: true });
      }
    );
    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Items Page",
      headerStyle: {
        backgroundColor: "transparent",
      },
      headerRight: () => (
        <Button
          onPress={() => {
            mapItemToUsers(users);
            navigation.navigate("UserSelection", { mappingIndex: 0 });
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
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingContainer}
          behavior="padding"
          keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        >
          <FlatList
            ref={flatListRef}
            style={styles.itemsList}
            data={items}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({ item }) => (
              <Item
                name={item.name}
                quantity={item.quantity}
                id={item.id}
                price={item.price}
              />
            )}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    width: "100%",
  },
  gradientBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  input: {
    height: 50,
    width: "100%",
    borderStyle: "solid",
    paddingLeft: 10,
    color: colors.purple,
    fontSize: 30,
    alignSelf: "center",
  },
  keyboardAvoidingContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  itemsList: {
    flex: 1,
    width: "100%",
  },
});

const mapStateToProps = (state) => {
  return {
    users: state.usersReducer.userList,
    items: state.itemsReducer.itemList,
    gradientColorsBackground: state.gradientReducer.gradientColorsBackground,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    mapItemToUsers: (users) => dispatch(mapItemToUsers(users)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsPriceScreen);
