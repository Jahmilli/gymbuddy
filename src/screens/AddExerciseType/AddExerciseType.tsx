import React from "react";
import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import {
  NavigationStackProp,
  NavigationStackOptions,
} from "react-navigation-stack";
import { splitType } from "../../utilities/Constants";
import { SPLIT_TYPE } from "../../logic/domains/Workout.domain";

type Props = {
  navigation: NavigationStackProp<{ splitType?: SPLIT_TYPE }>;
};

const backgroundColors = ["powderblue", "skyblue", "steelblue"];

const AddExerciseType: React.FC<Props> = ({ navigation }) => {
  const handlePress = (splitType: SPLIT_TYPE) => {
    navigation.navigate("AddExercise", { splitType });
  };

  return (
    <View style={styles.container}>
      {splitType.map((type: SPLIT_TYPE, index: number) => (
        <TouchableNativeFeedback
          onPress={() => handlePress(type)}
          key={index}
          style={{ flex: 1, backgroundColor: backgroundColors[index] }}
          background={TouchableNativeFeedback.Ripple("red")}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: backgroundColors[index],
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={styles.text}>{type}</Text>
          </View>
        </TouchableNativeFeedback>
      ))}
    </View>
  );
};

// @ts-ignore
AddExerciseType.navigationOptions = {
  title: "Add Exercise Type",
} as NavigationStackOptions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 25
  },
  typeLockup: {
    flex: 1,
  },
  text: {
    fontSize: 22,
  },
});

export default AddExerciseType;
