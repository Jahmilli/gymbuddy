import React, { ChangeEvent } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationStackOptions, NavigationStackProp } from 'react-navigation-stack';
import { FlatList, TouchableNativeFeedback } from 'react-native-gesture-handler';
import { EXERCISE_TYPES, exercises, ExerciseName } from '../../utilities/Constants';

type Props = {
  navigation: NavigationStackProp<{ exerciseType: EXERCISE_TYPES }>
}

class AddExercise extends React.Component<Props> {
  state = {
    username: "",
    password: ""
  }
  exerciseType = this.props.navigation.getParam("exerciseType", "No Type Provided");

  static navigationOptions = ({ navigation }): NavigationStackOptions => {
    return {
      title: "Add Exercise Type" 
    }
  }

  render() {
    return (
    <View style={styles.container}>
      <Text>Type is {this.exerciseType}</Text>
    <FlatList<ExerciseName>
      data={exercises[this.exerciseType]}
      keyExtractor={(item: ExerciseName) => item.name }
      renderItem={({ item }) => (
        <TouchableNativeFeedback style={styles.item}>
          {item.name}
        </TouchableNativeFeedback>
      )}
    />
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  }
});

export default AddExercise;