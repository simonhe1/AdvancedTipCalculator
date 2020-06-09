import React from "react";
import { View, StyleSheet, Slider, Text, Switch } from "react-native";
import { connect } from "react-redux";
import { changeTip, toggleTip } from "../actions/tips";

const Tip = ({ tip, toggled, changeTip, toggleTip }) => {
  return (
    <View style={styles.tipContainer}>
      <View style={styles.sliderContainer}>
        <Slider
          minimumValue={15}
          maximumValue={25}
          step={1}
          value={tip}
          onValueChange={(value) => changeTip(value)}
          disabled={!toggled}
        />
        <Text>Tip: {toggled ? tip : 0}%</Text>
      </View>
      <View style={styles.toggleContainer}>
        <Switch value={toggled} onValueChange={() => toggleTip()} />
        <Text>{toggled ? "on" : "off"}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  functionsContainer: {
    flex: 1,
    flexDirection: "row",
  },
  textContainer: {
    flex: 1,
  },
  tipContainer: {
    flex: 3,
    padding: 16,
    flexDirection: "row",
  },
  sliderContainer: {
    flex: 10,
  },
  toggleContainer: {
    flex: 1,
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
