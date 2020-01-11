import React from "react";
import {
  Button,
  CheckBox,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  NavigationStackProp,
  NavigationStackOptions,
} from "react-navigation-stack";
import ExerciseList from "../../components/ExerciseList/ExerciseList";
import {
  IExercise,
  ISet,
  IWorkout,
  IWorkoutExercise,
} from "../../logic/domains/Workout.domain";
import { createWorkout } from "../../logic/functions/workout";

type Props = {
  navigation: NavigationStackProp<{ userId?: string }>;
  navigationOptions: NavigationStackOptions;
};

const intialWorkoutState: IWorkout = {
  name: "",
  description: "",
  exercises: [],
  shared: false,
  workoutTimestamp: null,
  createdBy: "",
};

const CreateWorkout: React.FC<Props> = ({ navigation }) => {
  const [workoutState, setWorkoutState] = React.useState<IWorkout>({
    ...intialWorkoutState,
    createdBy: "b5452a48-85d7-4900-8c90-bc81b8e5b485", // Creating temporary userid for now
    workoutTimestamp: new Date(),
  });

  React.useEffect(() => {
    const newExercise: IExercise = navigation.getParam("newExercise", null);
    if (isNewExercise(newExercise, workoutState.exercises)) {
      setWorkoutState({
        ...workoutState,
        exercises: [
          ...workoutState.exercises,
          convertToWorkoutExercise(newExercise),
        ],
      });
    }
  }, [navigation.getParam("newExercise", null)]);

  // Check function for verifying all fields are added
  const isCompleteWorkout = () => {
    return (
      workoutState.exercises.length > 0 &&
      workoutState.name.length > 0 &&
      workoutState.description.length > 0
    );
  };

  // Used to make sure only unique exercises are added
  // TBA: Might be better to just use a Set and then convert to array when submitting
  const isNewExercise = (
    exercise: IExercise | null,
    exercises: IWorkoutExercise[]
  ) => {
    if (!exercise) {
      return false;
    }
    for (const index in exercises) {
      if (exercises[index].name === exercise.name) {
        return false;
      }
    }
    return true;
  };

  // Takes a new exercise and returns a correctly formatted WorkoutExercise
  const convertToWorkoutExercise = (exercise: IExercise): IWorkoutExercise => {
    return {
      ...exercise,
      orderNumber: workoutState.exercises.length - 1,
      sets: [
        {
          repetitions: 0,
          restTime: 0,
          setNumber: 0,
        },
      ],
    };
  };

  const updateSets = (
    workoutExercise: IWorkoutExercise,
    exerciseSets: ISet[]
  ) => {
    const exercises = [...workoutState.exercises];
    for (const i in exercises) {
      if (exercises[i] === workoutExercise) {
        exercises[i].sets = exerciseSets;
        break;
      }
    }
    setWorkoutState({
      ...workoutState,
      exercises,
    });
  };

  const handleInputChange = (key: string) => (text: string) => {
    setWorkoutState({
      ...workoutState,
      [key]: text,
    });
  };

  const removeExercise = (exercise: IWorkoutExercise) => {
    let newExercises = [...workoutState.exercises];
    newExercises = newExercises.filter(
      (item: IWorkoutExercise) => item !== exercise
    );
    setWorkoutState({
      ...workoutState,
      exercises: newExercises,
    });
  };

  const handleSelectExercise = (exercise: IWorkoutExercise) => {
    navigation.navigate("AddExerciseInfo", {
      exercise,
      updateSets: updateSets,
    });
  };

  const handleCreateWorkout = async () => {
    try {
      setWorkoutState({
        ...workoutState,
        workoutTimestamp: new Date(),
      });
      await createWorkout(workoutState);
      navigation.goBack();
    } catch (err) {
      alert("An error occurred when creating workout");
      console.log("An error occurred when creating workout", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Workout Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleInputChange("name")}
        value={workoutState.name}
      />
      <Text>Description</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleInputChange("description")}
        value={workoutState.description}
      />
      <View style={styles.checkboxLockup}>
        <CheckBox
          value={workoutState.shared}
          onChange={() => {
            setWorkoutState({
              ...workoutState,
              shared: !workoutState.shared,
            });
          }}
        />
        <Text>Shared?</Text>
      </View>
      <Button
        title="Add Exercise"
        onPress={() => navigation.navigate("AddExerciseType")}
      />
      <ExerciseList
        exercises={workoutState.exercises}
        removeExercise={removeExercise}
        handleSelectItem={handleSelectExercise}
      />
      {isCompleteWorkout() ? (
        <Button title="Create Workout" onPress={handleCreateWorkout} />
      ) : null}
    </View>
  );
};

// @ts-ignore
CreateWorkout.navigationOptions = {
  title: "Create Workout",
} as NavigationStackOptions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    backgroundColor: "#eee",
    marginBottom: 25,
    paddingLeft: 10,
    paddingRight: 10,
  },
  checkboxLockup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CreateWorkout;
