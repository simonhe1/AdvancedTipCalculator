import React, { useLayoutEffect, useRef, useEffect } from "react";
import {
  Text,
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
import { addItem } from "../actions/items";
import Item from "../components/Item";

const TempItemScreen = ({ items, addItem, gradientColorsBackground }) => {
  const navigation = useNavigation();
  const flatListRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        flatListRef.current.scrollToEnd({ animated: true });
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        inputRef.current.clear();
      }
    );

    return () => {
      keyboardDidHideListener.remove();
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
          onPress={() => navigation.navigate("")}
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
            renderItem={({ item }) => <Text>Hi</Text>}
          />
          <TextInput
            ref={inputRef}
            style={styles.input}
            autoFocus={true}
            blurOnSubmit={false}
            placeholder="Add names here"
            placeholderTextColor={colors.purple}
            // selectionColor="transparent"
            // onSubmitEditing={({ nativeEvent: { text } }) => {
            //   inputRef.current.clear();
            //   addItem(text);
            //   setTimeout(() => {
            //     flatListRef.current.scrollToEnd({ animated: true });
            //   }, 200);
            // }}
            autoCorrect={false}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: "transparent",
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
    items: state.itemsReducer.itemList,
    gradientColorsBackground: state.gradientReducer.gradientColorsBackground,
    gradientColorsButton: state.gradientReducer.gradientColorsButton,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (name, price) => dispatch(addItem(name, price)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TempItemScreen);
