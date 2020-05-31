import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import colors from "../config/colors";
import { connect } from "react-redux";
import { addUser, deleteUser } from "../actions/users";

const TempUserScreen = ({
  users,
  addUser,
  deleteUser,
  gradientColorsBackground,
}) => {
  console.log(users);
  const navigation = useNavigation();
  const route = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Users Page",
      headerStyle: {
        backgroundColor: "transparent",
      },
    });
  }, [navigation]);

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingContainer}
      behavior="padding"
    >
      <LinearGradient
        colors={gradientColorsBackground}
        style={styles.gradientContainer}
      >
        <KeyboardAwareFlatList
          style={styles.usersList}
          data={users}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => <Text> Hello</Text>}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            autoFocus={true}
            blurOnSubmit={false}
            placeholder="Type people's names"
            onSubmitEditing={(text) => addUser(text)}
          />
        </View>
        {/* <TouchableOpacity style={styles.test} onPress={() => addUser("Simon")}>
        <Text>Add</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.test1} onPress={() => deleteUser(1)}>
        <Text>Delete</Text>
      </TouchableOpacity> */}
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  input: {
    height: 50,
    backgroundColor: "orange",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 3,
  },
  inputContainer: {
    flex: 1,
    backgroundColor: colors.red,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 36,
    width: "100%",
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  usersList: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.blue,
  },
});

const mapStateToProps = (state) => {
  return {
    users: state.usersReducer.userList,
    gradientColorsBackground: state.gradientReducer.gradientColorsBackground,
    gradientColorsButton: state.gradientReducer.gradientColorsButton,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: (id) => dispatch(deleteUser(id)),
    addUser: (name, id) => dispatch(addUser(name, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TempUserScreen);
