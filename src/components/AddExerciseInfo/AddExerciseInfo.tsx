import React from "react";
import { NavigationStackProp } from "react-navigation-stack";
import { Exercise } from "../../logic/domains/Workout.domain";
import { View, StyleSheet, Text } from "react-native";

type Props = {
  navigation: NavigationStackProp;
}

class AddExerciseInfo extends React.Component<Props> {
  exercise: Exercise = this.props.navigation.getParam("exercise", null);

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.exercise.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AddExerciseInfo;
