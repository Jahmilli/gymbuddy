import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { StackActions } from "react-navigation";
import { NavigationStackProp } from "react-navigation-stack";
import { IUserWorkout, IUserWorkoutExercise } from "../../logic/domains/UserWorkout.domain";
import { IExercise } from "../../logic/domains/Workout.domain";
import { updateUserWorkout } from "../../logic/functions/userworkout";


interface Props {
  navigation: NavigationStackProp;
}

const defaultExercise = {
  name: "default exercise",
  sets: [
    {
      weight: 0,
      weightUnit: "kg",
      restTime: 0
    }
  ]
};

// Current issue with how this is implemented is everything is managed in state, if the app closes, we lose all progress on the workout...
// Maybe after finishing an exercise we update in the server. If there's a start date then when the componetn mounts, we set the index based on what exercises are completed?? This would require a change in the db as well.
class InProgressWorkout extends React.Component<Props> {
  public state = {
    exercises: [],
    currentExerciseIndex: 0,
    currentSetIndex: 0,
    startTime: new Date(), // TODO: Move this into backend??,
    currentRestTime: 0,
    setInProgress: false
  };

  public workout: IUserWorkout = this.props.navigation.getParam("workout", false);
  public interval = null;

  public componentDidMount() {
    this.setState({
      exercises: this.workout.exercises,
    });
  }

  public handleStartSet = () => {
    // If it's the first set we don't mind how long we rested for
    clearInterval(this.interval);
    const restTime = this.state.currentSetIndex === 0 ? 0 : this.state.currentRestTime;
    this.handleUpdateSet("actualRestTime", restTime);

    this.setState({
      setInProgress: true,
      currentRestTime: 0
    });
  }

  public handleCompleteSet = () => {
    const { exercises, currentExerciseIndex, currentSetIndex } = this.state;
    // Change to next set whilst there are still remaining sets
    if (currentSetIndex < exercises[currentExerciseIndex].sets.length - 1) {
      this.setState({
        currentSetIndex: currentSetIndex + 1,
        setInProgress: false
      });
      this.timer();
      return;
    }
    // Change to next exercise if all sets complete
    if (currentExerciseIndex < exercises.length - 1) {
      this.setState({
        currentExerciseIndex: currentExerciseIndex + 1,
        currentSetIndex: 0,
        setInProgress: false
      });
      return;
    }
    this.setState({
      setInProgress: false
    });
    this.completeWorkout();
  }

  public completeWorkout = async () => {
    try {
      const completedWorkout: IUserWorkout = {
        ...this.workout,
        exercises: this.state.exercises,
        startTime: this.state.startTime,
        endTime: new Date(),
        satisfaction: 10
      };
      await updateUserWorkout(completedWorkout);
      alert("Workout complete");
      this.props.navigation.navigate("Home", { action: StackActions.RESET });
    } catch (err) {
      alert("An error occured when completing workout");
      console.log("An error occurred when completing workout");
    }
  }

  public handleUpdateSet = (key: string, val: any) => {
    const tmpExercises = [...this.state.exercises];
    tmpExercises[this.state.currentExerciseIndex].sets[this.state.currentSetIndex][key] = val;
    this.setState({
      exercises: tmpExercises
    });
  }

  public timer = () => {
    this.interval = setInterval(() => {
      this.setState({
        currentRestTime: this.state.currentRestTime + 1
      });
    }, 1000);
  }

  public render() {
    const { exercises, currentExerciseIndex, currentSetIndex, currentRestTime, setInProgress } = this.state;
    const currentExercise = exercises[currentExerciseIndex] || defaultExercise;
    return (
      <View style={styles.container}>
        <Text>Exercise Name: {currentExercise.name}</Text>
        <Text>Set Number: {currentSetIndex + 1}</Text>
        <Text>Weight:</Text>
        <TextInput
          keyboardType="numeric"
          value={currentExercise.sets[currentSetIndex].weight.toString()}
          onChangeText={(text: string) => this.handleUpdateSet("weight", parseInt(text))}
          />
        <Text>Expected Rest Time: {currentExercise.sets[currentSetIndex].restTime} seconds</Text>
        <Text>Current Rest Time: {currentRestTime.toString()} seconds</Text>
        { setInProgress ?
          <Button onPress={this.handleCompleteSet} title="Complete Set" />
          :
          <Button onPress={this.handleStartSet} title="Start Set" />
        }

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  }

});

export default InProgressWorkout;