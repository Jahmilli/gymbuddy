import React from "react";
import { NavigationStackProp } from "react-navigation-stack";
import { View, StyleSheet, Button, Text } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { TextInput } from "react-native-gesture-handler";
import { IWorkout, IWorkoutExercise, ISet } from "../../logic/domains/Workout.domain";
import ExerciseList from "../ExerciseList/ExerciseList";
import { IUserWorkout } from "../../logic/domains/UserWorkout.domain";
import { createUserWorkout } from "../../logic/functions/userworkout";
import { StackActions } from "react-navigation";

type Props = {
  navigation: NavigationStackProp;
}

class CreateNewUserWorkout extends React.Component<Props> {
  state = {
    name: '',
    description: '',
    displayDatePicker: false,
    date: new Date(),
    notes: '',
    exercises: [] // Need this as we can update sets for exercises here
  }

  workout: IWorkout = this.props.navigation.getParam("workout", null);

  componentDidMount() {
    this.setState({
      exercises: this.workout.exercises,
      name: this.workout.name,
      description: this.workout.description
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
    this.setState({ exercises });
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

  verifyExercisesComplete = () => {
    for (let exercise of this.state.exercises) {
      if (exercise.sets.length === 0) {
        return false;
      }
      for (let set of exercise.sets) {
        if (!set.repetitions || !set.restTime || !set.weight) {
          return false;
        }
      }
    }
    return true;
  }

  handleCreateWorkout = async () => {
    if (!this.verifyExercisesComplete()) {
      alert('Please ensure each exercise is filled out and contains weights for each set');
      return;
    }
    const userWorkout: IUserWorkout = {
      userId: "b5452a48-85d7-4900-8c90-bc81b8e5b485", // Creating temporary userid for now
      workoutId: this.workout.workoutId,
      name: this.state.name,
      description: this.state.description,
      notes: this.state.notes,
      workoutDate: this.state.date,
      exercises: this.state.exercises
    }
    alert('creating');
    try {
      await createUserWorkout(userWorkout);
      this.props.navigation.navigate('Home', { action: StackActions.RESET });
    } catch(err) {
      alert('An error occurred when creating new workout');
      console.log('An error occurred when creating workout', err);
    }
  }

  handleSelectExercise = (exercise: IWorkoutExercise) => {
    this.props.navigation.navigate('AddExerciseInfo', {
      exercise,
      updateSets: this.updateSets,
      isUserWorkoutExercise: true
    });
  }
  
  handleInputChange = (key: string) => (text: string) => {
    this.setState({
      [key]: text
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.name}</Text>
        <Text>{this.state.description}</Text>
        <TextInput
          onChangeText={this.handleInputChange("notes")}
          value={this.state.notes}
          placeholder="Add notes here..."
          multiline
        />
        <Button onPress={this.displayDateTimePicker} title="Add new workout date" />
        <Text>Date: {this.state.date.toString()}</Text>
        <DateTimePicker mode="datetime" isVisible={this.state.displayDatePicker} onConfirm={this.handleDatePicked} onCancel={this.hideDateTimePicker} />
        <ExerciseList exercises={this.state.exercises} handleSelectItem={this.handleSelectExercise} />
        <Button onPress={this.handleCreateWorkout} title="Create new workout" />
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