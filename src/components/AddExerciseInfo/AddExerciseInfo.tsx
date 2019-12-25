import React from "react";
import { NavigationStackProp } from "react-navigation-stack";
import { Exercise } from "../../logic/domains/Workout.domain";
import { View, StyleSheet, Text } from "react-native";

type Props = {
  navigation: NavigationStackProp;
  exercise: Exercise
}

class AddExerciseInfo extends React.Component<Props> {

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.exercise.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AddExercise;
