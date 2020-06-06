import React, { useState } from "react";
import { View, StyleSheet, Slider, Text } from "react-native";
import { connect } from "react-redux";
import { changeTip, toggleTip } from "../actions/tips";

const Tip = ({ tip, changeTip, toggleTip }) => {
  return (
    <View style={styles.tipContainer}>
      <Slider
        style={styles.slider}
        minimumValue={15}
        maximumValue={25}
        step={1}
        value={tip}
        onValueChange={(value) => changeTip(value)}
      />
      <Text>Tip: {tip}%</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  tipContainer: {
    flex: 3,
    padding: 16,
  },
});
const mapStateToProps = (state) => {
  return {
    tip: state.tipReducer.tip,
    toggled: state.tipReducer.toggled,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeTip: (tipAmount) => dispatch(changeTip(tipAmount)),
    toggleTip: () => dispatch(toggleTip()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tip);
