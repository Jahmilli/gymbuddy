import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import DateTimePicker from "react-native-modal-datetime-picker";
import { StackActions } from "react-navigation";
import { NavigationStackProp } from "react-navigation-stack";
import ExerciseList from "../../components/ExerciseList/ExerciseList";
import {
  IUserWorkout,
  IUserWorkoutExercise,
} from "../../logic/domains/UserWorkout.domain";
import { ISet, IWorkoutExercise } from "../../logic/domains/Workout.domain";
import {
  createUserWorkout,
  getUserWorkoutExercises,
  updateUserWorkout,
} from "../../logic/functions/userworkout";

type Props = {
  navigation: NavigationStackProp;
};

const initialState = {
  name: "",
  description: "",
  displayDatePicker: false,
  date: new Date(),
  notes: "",
  exercises: [], // Need this as we can update sets for exercises here
};

const UserWorkout: React.FC<Props> = ({ navigation }) => {
  const [state, setState] = React.useState({ ...initialState });

  const isNewWorkout: boolean = navigation.getParam("isNewWorkout", false);
  const workout: IUserWorkout = navigation.getParam("workout", null); // Fix this, will be type IWorkout if it's a new workout

  React.useEffect(() => {
    // Used to get exercises for existing userworkouts
    const getExercises = async () => {
      try {
        let exercises: IUserWorkoutExercise[] = [];
        if (!isNewWorkout) {
          exercises = await getUserWorkoutExercises(workout.userWorkoutId);
        }
        setState({
          ...state,
          exercises: isNewWorkout ? workout.exercises : exercises,
          name: workout.name || "",
          description: workout.description || "",
          notes: workout.notes || "",
        });
      } catch (err) {
        alert("An error occurred when getting exercises");
        console.log("An error occurred when getting exercises", err);
      }
    };
    getExercises();
  }, []);

  const updateSets = (
    workoutExercise: IWorkoutExercise,
    exerciseSets: ISet[]
  ) => {
    const exercises = [...state.exercises];
    for (const i in exercises) {
      if (exercises[i] === workoutExercise) {
        exercises[i].sets = exerciseSets;
        break;
      }
    }
    setState({
      ...state,
      exercises,
    });
  };

  const displayDateTimePicker = () => {
    setState({
      ...state,
      displayDatePicker: true,
    });
  };

  const hideDateTimePicker = () => {
    setState({
      ...state,
      displayDatePicker: false,
    });
  };

  const handleDatePicked = (date: Date) => {
    if (date < new Date()) {
      alert("Please select a date from today onwards");
      hideDateTimePicker();
      return;
    }
    setState({
      ...state,
      date,
    });
    hideDateTimePicker();
  };

  const verifyExercisesComplete = () => {
    for (const exercise of state.exercises) {
      if (exercise.sets.length === 0) {
        return false;
      }
      for (const set of exercise.sets) {
        if (!set.repetitions || !set.restTime || !set.weight) {
          return false;
        }
      }
    }
    return true;
  };

  // Compiles the state and workout props into a UserWorkout object
  const getUserWorkout = (): IUserWorkout => {
    return {
      userWorkoutId: isNewWorkout ? undefined : workout.userWorkoutId, // UserworkoutId is generated in database for new workouts
      userId: "b5452a48-85d7-4900-8c90-bc81b8e5b485", // Creating temporary userid for now
      workoutId: workout.workoutId,
      name: state.name,
      description: state.description,
      notes: state.notes,
      workoutDate: state.date,
      exercises: state.exercises,
      startTime: workout.startTime,
      endTime: workout.endTime,
      satisfaction: workout.satisfaction,
    };
  };

  const handleCreateWorkout = async () => {
    if (!verifyExercisesComplete()) {
      alert(
        "Please ensure each exercise is filled out and contains weights for each set"
      );
      return;
    }
    try {
      await createUserWorkout(getUserWorkout());
      navigation.navigate("Home", { action: StackActions.RESET });
    } catch (err) {
      alert("An error occurred when creating new workout");
      console.log("An error occurred when creating workout", err);
    }
  };

  const handleUpdateWorkout = async () => {
    if (!verifyExercisesComplete()) {
      alert(
        "Please ensure each exercise is filled out and contains weights for each set"
      );
    }
    try {
      await updateUserWorkout(getUserWorkout());
      alert("updated workout");
    } catch (err) {
      alert("An error occurred when updating workout");
      console.log("An error occurred when updating workout", err);
    }
  };

  const handleStartWorkout = async () => {
    navigation.navigate("InProgressWorkout", {
      workout: getUserWorkout(),
    });
  };

  const handleSelectExercise = (exercise: IWorkoutExercise) => {
    navigation.navigate("AddExerciseInfo", {
      exercise,
      updateSets: updateSets,
      isUserWorkoutExercise: true,
    });
  };

  const handleInputChange = (key: string) => (text: string) => {
    setState({
      ...state,
      [key]: text,
    });
  };

  return (
    <View style={styles.container}>
      <Text>{state.name}</Text>
      <Text>{state.description}</Text>
      <TextInput
        onChangeText={handleInputChange("notes")}
        value={state.notes}
        placeholder="Add notes here..."
        multiline={true}
      />
      <Button onPress={displayDateTimePicker} title="Set Workout Date" />
      <Text>Date: {state.date.toString()}</Text>
      <DateTimePicker
        mode="datetime"
        isVisible={state.displayDatePicker}
        onConfirm={handleDatePicked}
        onCancel={hideDateTimePicker}
      />
      <ExerciseList
        exercises={state.exercises}
        handleSelectItem={handleSelectExercise}
      />
      {isNewWorkout ? (
        <Button onPress={handleCreateWorkout} title="Create new workout" />
      ) : (
        <>
          <Button onPress={handleStartWorkout} title="Start workout" />
          <Button onPress={handleUpdateWorkout} title="Update workout" />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default UserWorkout;
