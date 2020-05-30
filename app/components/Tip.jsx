import React, { useState } from "react";
import { View, StyleSheet, Slider, Text } from "react-native";

const Tip = (props) => {
  const [tipValue, setTipValue] = useState(15);

  return (
    <View style={styles.tipContainer}>
      <Slider
        style={styles.slider}
        minimumValue={15}
        maximumValue={25}
        step={1}
        value={tipValue}
        onValueChange={(value) => setTipValue(value)}
      />
      <Text>Tip: {tipValue}%</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  tipContainer: {
    flex: 3,
    padding: 16,
  },
});
export default Tip;
