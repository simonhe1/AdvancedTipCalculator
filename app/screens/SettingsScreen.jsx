import React, { createRef } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  PanResponder,
  Animated,
  SafeAreaView,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Tip from "../components/Tip";

function getRandomColor() {
  // Using the lighter colors of the spectrum so we can see text inside component
  var letters = "ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 6)];
  }
  return color;
}

function reOrderArray(arr, from, to) {
  return arr.reduce((prev, current, idx, self) => {
    if (from === to) {
      prev.push(current);
    }
    if (idx === from) {
      return prev;
    }
    if (from < to) {
      prev.push(current);
    }
    if (idx === to) {
      prev.push(self[from]);
    }
    if (from > to) {
      prev.push(current);
    }
    return prev;
  }, []);
}

const colorMap = {};
const TOTALELEMENTS = 1;

class SettingsScreen extends React.Component {
  state = {
    dragging: false,
    draggingIdx: -1,
    data: Array.from(Array(TOTALELEMENTS), (_, i) => {
      colorMap[i] = getRandomColor();
      return i;
    }),
  };
  point = new Animated.ValueXY();
  currentY = 0;
  scrollOffset = 0;
  flatlistTopOffset = 0;
  rowHeight = 0;
  currentIdx = -1;
  flatListHeight = 0;
  active = false;
  flatListRef = createRef();

  constructor(props) {
    super(props);

    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (event, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
        this.currentIdx = this.yToIndex(gestureState.y0);
        this.currentY = gestureState.y0;
        Animated.event([{ y: this.point.y }])({
          y: gestureState.y0 - this.rowHeight / 2,
        });
        this.active = true;
        this.setState({ dragging: true, draggingIdx: this.currentIdx }, () => {
          this.animateList();
        });
      },
      onPanResponderMove: (event, gestureState) => {
        this.currentY = gestureState.moveY;
        Animated.event([{ y: this.point.y }])({ y: gestureState.moveY });
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: () => false,
      onPanResponderRelease: () => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        this.reset();
      },
      onPanResponderTerminate: () => {
        // Another component has become the responder, so this gesture
        // should be cancelled
        this.reset();
      },
      onShouldBlockNativeResponder: () => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });
  }

  animateList = () => {
    if (!this.active) {
      return;
    }

    requestAnimationFrame(() => {
      // check if we are near the bottom or top of the screen
      if (this.currentY + 100 > this.flatListHeight) {
        this.flatListRef.current.scrollToOffset({
          offset: this.scrollOffset + 20,
          animated: false,
        });
      } else if (this.currentY < 100) {
        this.flatListRef.current.scrollToOffset({
          offset: this.scrollOffset - 20,
          animated: false,
        });
      }
      // check y value see if we need to reorder
      const newIdx = this.yToIndex(this.currentY);
      if (this.currentIdx !== newIdx) {
        this.setState({
          data: reOrderArray(this.state.data, this.currentIdx, newIdx),
          draggingIdx: newIdx,
        });
        this.currentIdx = newIdx;
      }

      this.animateList();
    });
  };

  yToIndex = (y) => {
    const value = Math.floor(
      (this.scrollOffset + y - this.flatlistTopOffset) / this.rowHeight
    );

    if (value < 0) {
      return 0;
    }

    if (value > this.state.data.length - 1) {
      return this.state.data.length - 1;
    }

    return value;
  };

  reset = () => {
    this.active = false;
    this.setState({ dragging: false, draggingIdx: -1 });
  };

  render() {
    const { data, dragging, draggingIdx } = this.state;

    const renderItem = ({ item, index }, noPanResponder = false) => (
      <View
        onLayout={(e) => {
          this.rowHeight = e.nativeEvent.layout.height;
        }}
        style={[
          styles.individualSettingsContainer,
          {
            backgroundColor: colorMap[item],
            opacity: draggingIdx === index ? 0 : 1,
          },
        ]}
      >
        <View
          {...(noPanResponder ? {} : this._panResponder.panHandlers)}
          style={styles.symbolContainer}
        >
          <View style={styles.symbol}>
            <FontAwesome5 name="grip-lines" size={24} />
          </View>
        </View>
        <Tip />
      </View>
    );

    return (
      <SafeAreaView style={styles.settingsContainer}>
        {dragging && (
          <Animated.View
            style={[
              styles.animation,
              {
                top: this.point.getLayout().top,
              },
            ]}
          >
            {renderItem({ item: data[draggingIdx], index: -1 }, true)}
          </Animated.View>
        )}
        <FlatList
          ref={this.flatListRef}
          scrollEnabled={!dragging}
          style={styles.individualSettingsBackground}
          data={data}
          renderItem={renderItem}
          onScroll={(e) => {
            this.scrollOffset = e.nativeEvent.contentOffset.y;
          }}
          onLayout={(e) => {
            this.flatlistTopOffset = e.nativeEvent.layout.y;
            this.flatListHeight = e.nativeEvent.layout.height;
          }}
          scrollEventThrottle={16}
          keyExtractor={(item) => `${item}`}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  animation: {
    position: "absolute",
    backgroundColor: "black",
    zIndex: 2,
    width: "100%",
  },
  settingsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  individualSettingsBackground: {
    flex: 1,
    width: "100%",
  },
  individualSettingsContainer: {
    padding: 16,
    flex: 1,
    flexDirection: "row",
  },
  individualText: {
    fontSize: 18,
    padding: 16,
  },
  individualTextContainer: {
    flex: 3,
  },
  symbol: {
    fontSize: 24,
  },
  symbolContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SettingsScreen;
