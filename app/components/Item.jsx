import React, { useState, useRef } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { addItem } from "../actions/items";

const Item = ({ price, id, items }) => {
  const [itemPrice, setItemPrice] = useState();

  const nameRef = useRef("");
  const priceRef = useRef();

  const focusNextInput = (name) => {
    nameRef.current = name;
    priceRef.current.focus();
  };

  const handlePriceChange = (amount) => {
    /*  
        Checks whether new price matches regex that
        Accepts     Rejects
        244         10.895
        10.89       alphabets
        9.5         10.8.9
        10.         9,85
        0940.94     .85
    */
    let regex = /^\d+(\.\d{0,2})?$/;
    const newPriceIsNum = regex.test(amount);
    const oldPriceIsNum = regex.test(price);

    if (newPriceIsNum || amount === "") {
      onPriceChange(String(amount), id);
    } else if (oldPriceIsNum) {
      onPriceChange(String(price), id);
    }
  };

  const focusNextPriceInput = () => {
    priceRef[id].focus();
  };

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="food" size={32} />
        </View>
        <TextInput
          contextMenuHidden={true}
          style={styles.textContainer}
          autoFocus={id === 0}
          placeholder="Item Name"
          onSubmitEditing={({ nativeEvent: { text } }) =>
            focusNextPriceInput(text)
          }
        />
      </View>
      <View style={styles.priceContainer}>
        <View style={styles.iconContainer}>
          <FontAwesome5 name="dollar-sign" size={32} />
        </View>
        <TextInput
          ref={priceRef}
          keyboardType="decimal-pad"
          style={styles.textContainer}
          value={String(price)}
          contextMenuHidden={true}
          onChangeText={(text) => handlePriceChange(text)}
          onSubmitEditing={() => focusNextInput()}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 20,
  },
  iconContainer: {
    flex: 1,
  },
  priceContainer: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 20,
  },
  textContainer: {
    flex: 3,
    fontSize: 20,
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
    addItem: (name, price, quantity) =>
      dispatch(addItem(name, price, quantity)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
