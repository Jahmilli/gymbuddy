import React, { ChangeEvent } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import {
  NavigationStackOptions,
  NavigationStackProp,
} from "react-navigation-stack";
import { SPLIT_TYPE, splitType } from "../../utilities/Constants";

type Props = {
  navigation: NavigationStackProp<{ userId?: string }>;
  exerciseTypes: string;
};
const backgroundColors = ["powderblue", "skyblue", "steelblue"];
class AddExerciseType extends React.Component<Props> {
  public static navigationOptions = ({
    navigation,
  }): NavigationStackOptions => {
    return {
      title: "Add Exercise Type",
    };
  };
  public state = {
    username: "",
    password: "",
  };

  public handlePress = (splitType: SPLIT_TYPE) => {
    this.props.navigation.navigate("AddExercise", { splitType });
  };

  public render() {
    return (
      <View style={styles.container}>
        {splitType.map((type: SPLIT_TYPE, index: number) => (
          <TouchableNativeFeedback
            onPress={() => this.handlePress(type)}
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
  }
}

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
