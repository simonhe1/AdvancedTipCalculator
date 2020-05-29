import React, { useLayoutEffect, useEffect, useState } from "react";
import { View, Text, StyleSheet, Slider } from "react-native";
import colors from "../config/colors";
import { Container, Content, Accordion } from "native-base";
import UserResultsHeader from "../components/UserResultsHeader";
import UserResultsContent from "../components/UserResultsContent";

const ResultScreen = ({ route, navigation }) => {
  const { mapping, itemsData } = route.params;
  const [usersMapping, setUsersMapping] = useState([]);
  const [tipValue, setTipValue] = useState(15);

  useEffect(() => {
    let itemsDataCopy = [...itemsData];
    let usersDataCopy = [...mapping];
    itemsDataCopy.forEach((obj, index, itemsArr) => {
      itemsArr[index] = { ...obj, users: [] };
    });
    assignUsersToItems(itemsDataCopy, usersDataCopy);
    splitPrices(itemsDataCopy, usersDataCopy);
    setUsersMapping(usersDataCopy);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Results",
    });
  });

  const assignUsersToItems = (itemsArr, usersArr) => {
    for (let i = 0; i < itemsArr.length; i++) {
      for (let j = 0; j < usersArr.length; j++) {
        const { data } = usersArr[j];
        for (let k = 0; k < data.length; k++) {
          if (itemsArr[i].id === data[k].id) {
            itemsArr[i].users.push(usersArr[j].name);
          }
        }
      }
    }
  };

  const splitPrices = (itemsArr, usersArr) => {
    itemsArr.forEach((obj, index, arr) => {
      const { price, users } = obj;
      let newPrice = Number(Number(price) / users.length).toFixed(2);
      arr[index] = { ...obj, price: `${newPrice}` };
    });
    assignPricesToUsers(itemsArr, usersArr);
  };

  const assignPricesToUsers = (itemsArr, usersArr) => {
    for (let i = 0; i < itemsArr.length; i++) {
      for (let j = 0; j < usersArr.length; j++) {
        const { data } = usersArr[j];
        for (let k = 0; k < data.length; k++) {
          if (itemsArr[i].id === data[k].id) {
            usersArr[j]["data"][k].price = itemsArr[i].price;
          }
        }
      }
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.tipContainer}>
        <Slider
          style={styles.slider}
          minimumValue={15} //
          maximumValue={25}
          step={1}
          value={tipValue}
          onValueChange={(value) => setTipValue(value)}
        />
        <Text>Tip: {tipValue}%</Text>
      </View>
      <Container style={styles.resultsContainer}>
        <Content padder>
          <Accordion
            dataArray={usersMapping}
            renderHeader={(item, expanded) => (
              <UserResultsHeader
                item={item}
                expanded={expanded}
                tipPercentage={tipValue}
              />
            )}
            renderContent={(item) => (
              <UserResultsContent item={item} tipPercentage={tipValue} />
            )}
          />
        </Content>
      </Container>
    </View>
  );
};
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white",
  },
  resultsContainer: {
    flex: 15,
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
});
export default ResultScreen;
