import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { StackActions } from "react-navigation";
import { NavigationStackProp } from "react-navigation-stack";
import { IUserWorkout } from "../../logic/domains/UserWorkout.domain";
import { updateUserWorkout } from "../../logic/functions/userworkout";

type Props = {
  navigation: NavigationStackProp;
};

const defaultExercise = {
  name: "default exercise",
  sets: [
    {
      weight: 0,
      weightUnit: "kg",
      restTime: 0,
    },
  ],
};

const initialState = {
  exercises: [],
  currentExerciseIndex: 0,
  currentSetIndex: 0,
  startTime: new Date(), // TODO: Move this into backend??,
  currentRestTime: 0,
  setInProgress: false,
};

// Current issue with how this is implemented is everything is managed in state, if the app closes, we lose all progress on the workout...
// Maybe after finishing an exercise we update in the server. If there's a start date then when the componetn mounts, we set the index based on what exercises are completed?? This would require a change in the db as well.
const InProgressWorkout: React.FC<Props> = ({ navigation }) => {
  const [state, setState] = React.useState({ ...initialState });

  const workout: IUserWorkout = navigation.getParam("workout", false);

  // Will need to figure out how to unmount this
  let interval = null;

  React.useEffect(() => {
    setState({
      ...state,
      exercises: workout.exercises,
    });
    // return () => (interval = null);
  }, []);

  const handleStartSet = () => {
    // If it's the first set we don't mind how long we rested for
    clearInterval(interval);
    const restTime = state.currentSetIndex === 0 ? 0 : state.currentRestTime;
    handleUpdateSet("actualRestTime", restTime);

    setState({
      ...state,
      setInProgress: true,
      currentRestTime: 0,
    });
  };

  const handleCompleteSet = () => {
    const { exercises, currentExerciseIndex, currentSetIndex } = state;
    // Change to next set whilst there are still remaining sets
    if (currentSetIndex < exercises[currentExerciseIndex].sets.length - 1) {
      setState({
        ...state,
        currentSetIndex: currentSetIndex + 1,
        setInProgress: false,
      });
      timer();
      return;
    }
    // Change to next exercise if all sets complete
    if (currentExerciseIndex < exercises.length - 1) {
      setState({
        ...state,
        currentExerciseIndex: currentExerciseIndex + 1,
        currentSetIndex: 0,
        setInProgress: false,
      });
      return;
    }
    setState({
      ...state,
      setInProgress: false,
    });
    completeWorkout();
  };

  const completeWorkout = async () => {
    try {
      const completedWorkout: IUserWorkout = {
        ...workout,
        exercises: state.exercises,
        startTime: state.startTime,
        endTime: new Date(),
        satisfaction: 10,
      };
      await updateUserWorkout(completedWorkout);
      alert("Workout complete");
      navigation.navigate("Home", { action: StackActions.RESET });
    } catch (err) {
      alert("An error occured when completing workout");
      console.log("An error occurred when completing workout");
    }
  };

  const handleUpdateSet = (key: string, val: any) => {
    const tmpExercises = [...state.exercises];
    tmpExercises[currentExerciseIndex].sets[state.currentSetIndex][key] = val;
    setState({
      ...state,
      exercises: tmpExercises,
    });
  };

  const timer = () => {
    interval = setInterval(() => {
      setState({
        ...state,
        currentRestTime: state.currentRestTime + 1,
      });
    }, 1000);
  };

  const {
    exercises,
    currentExerciseIndex,
    currentSetIndex,
    currentRestTime,
    setInProgress,
  } = state;
  const currentExercise = exercises[currentExerciseIndex] || defaultExercise;
  return (
    <View style={styles.container}>
      <Text>Exercise Name: {currentExercise.name}</Text>
      <Text>Set Number: {currentSetIndex + 1}</Text>
      <Text>Weight:</Text>
      <TextInput
        keyboardType="numeric"
        value={currentExercise.sets[currentSetIndex].weight.toString()}
        onChangeText={(text: string) =>
          handleUpdateSet("weight", parseInt(text, 10))
        }
      />
      <Text>
        Expected Rest Time: {currentExercise.sets[currentSetIndex].restTime}{" "}
        seconds
      </Text>
      <Text>Current Rest Time: {currentRestTime.toString()} seconds</Text>
      {setInProgress ? (
        <Button onPress={handleCompleteSet} title="Complete Set" />
      ) : (
        <Button onPress={handleStartSet} title="Start Set" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default InProgressWorkout;
