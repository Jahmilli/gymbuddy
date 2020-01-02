import React from "react";
import { NavigationStackProp } from "react-navigation-stack";
import { View, StyleSheet, Button, Text } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { TextInput } from "react-native-gesture-handler";
import { IWorkout, IWorkoutExercise, IExercise, ISet } from "../../logic/domains/Workout.domain";
import ExerciseList from "../ExerciseList/ExerciseList";

type Props = {
  navigation: NavigationStackProp;
}

class CreateNewUserWorkout extends React.Component<Props> {
  state = {
    displayDatePicker: false,
    date: new Date(),
    notes: '',
    exercises: [] // Need this as we can update sets for exercises here
  }

  workout: IWorkout = this.props.navigation.getParam("workout", null);
  componentDidMount() {
    this.setState({
      exercises: [...this.workout.exercises]
    });
  }

  updateSets = (workoutExercise: IWorkoutExercise, exerciseSets: ISet[]) => {
    const exercises = [...this.state.exercises];
      for (const i in exercises) {
        if (exercises[i] === workoutExercise) {
          exercises[i].sets = exerciseSets;
          break;
        }
      }
    this.setState({ exercises })
  }

  displayDateTimePicker = () => {
    this.setState({ displayDatePicker: true });
  };

  hideDateTimePicker = () => {
    this.setState({ displayDatePicker: false });
  };

  handleDatePicked = (date: Date) => {
    if (date < new Date()) {
      alert('Please select a date from today onwards');
      this.hideDateTimePicker();
      return;
    }
    this.setState({ date });
    this.hideDateTimePicker();
  };

  handleCreateWorkout = () => {
    alert('creating');
  }

  handleSelectExercise = (exercise: IWorkoutExercise) => {
    this.props.navigation.navigate('AddExerciseInfo', {
      exercise,
      updateSets: this.updateSets
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Button onPress={this.displayDateTimePicker} title="Add new workout date" />
        </View>
        <Text>Date: {this.state.date.toString()}</Text>
        <DateTimePicker mode="datetime" isVisible={this.state.displayDatePicker} onConfirm={this.handleDatePicked} onCancel={this.hideDateTimePicker} />
        <TextInput
          onChangeText={(text: string) => this.setState({ notes: text})}
          value={this.state.notes}
          placeholder="Add notes here..."
          multiline
        />
        <ExerciseList exercises={this.state.exercises} handleSelectItem={this.handleSelectExercise} />
        <View>
          <Button onPress={this.handleCreateWorkout} title="Create new workout" />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default CreateNewUserWorkout;