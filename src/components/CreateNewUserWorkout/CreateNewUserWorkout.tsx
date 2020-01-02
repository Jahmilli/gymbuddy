import React from "react";
import { NavigationStackProp } from "react-navigation-stack";
import { View, StyleSheet, Button, Text } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { TextInput } from "react-native-gesture-handler";
import { IWorkout, IWorkoutExercise, ISet } from "../../logic/domains/Workout.domain";
import ExerciseList from "../ExerciseList/ExerciseList";
import { IUserWorkout } from "../../logic/domains/UserWorkout.domain";
import { createUserWorkout } from "../../logic/functions/userworkout";

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
      exercises: this.workout.exercises
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

  handleCreateWorkout = async () => {
    const userWorkout: IUserWorkout = {
      userId: "b5452a48-85d7-4900-8c90-bc81b8e5b485", // Creating temporary userid for now
      workoutId: this.workout.workoutId,
      notes: this.state.notes,
      workoutDate: this.state.date,
      exercises: this.state.exercises
    }
    alert('creating');
    try {
      const res = await createUserWorkout(userWorkout);
      console.log('res is ', res)
    } catch(err) {
      alert('An error occurred when creating new workout');
      console.log('An error occurred when creating workout', err);
    }
    console.log(userWorkout);
  }

  handleSelectExercise = (exercise: IWorkoutExercise) => {
    this.props.navigation.navigate('AddExerciseInfo', {
      exercise,
      updateSets: this.updateSets,
      isUserWorkoutExercise: true
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