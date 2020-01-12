import React from "react";
import {
  NavigationStackOptions,
  NavigationStackProp,
} from "react-navigation-stack";
import { Text, View, FlatList, StyleSheet } from "react-native";
import {
  IUserWorkout,
  IUserWorkoutExercise,
} from "../../logic/domains/UserWorkout.domain";
import { ISet } from "../../logic/domains/Workout.domain";
import { getUserWorkoutExercises } from "../../logic/functions/userworkout";

type Props = {
  navigation: NavigationStackProp;
  navigationOptions: NavigationStackOptions;
};

const HistoricUserWorkout: React.FC<Props> = ({ navigation }) => {
  const [workoutExercises, setWorkoutExercises] = React.useState({
    loaded: false,
    exercises: [] as IUserWorkoutExercise[],
  });
  const workout: IUserWorkout = navigation.getParam("workout", null);
  console.log("workout is ", workout);

  React.useEffect(() => {
    const getWorkoutExercises = async () => {
      try {
        const results = await getUserWorkoutExercises(workout.userWorkoutId);
        setWorkoutExercises({
          loaded: true,
          exercises: results,
        });
      } catch (err) {
        console.log("An error occurred when getting exercises", err);
        alert("An error occurred when getting exercises");
      }
    };
    if (!workoutExercises.loaded) {
      getWorkoutExercises();
    }
  });

  const renderSet = ({ item }: { item: ISet }) => (
    <View style={styles.setLockup}>
      <Text>Set Number: {item.setNumber}</Text>
      <Text>Repetitions {item.repetitions}</Text>
      <Text>Weight: {item.weight}</Text>
      <Text>Rest Time: {item.restTime}</Text>
      <Text>Actual Rest Time: {item.actualRestTime}</Text>
    </View>
  );

  const renderExercises = ({ item }: { item: IUserWorkoutExercise }) => (
    <View style={styles.exerciseLockup}>
      <Text>Name: {item.name}</Text>
      <Text>Description: {item.description}</Text>
      <Text>BodyPart: {item.bodyPart}</Text>
      <FlatList
        data={item.sets}
        style={styles.setList}
        renderItem={renderSet}
        keyExtractor={(item: ISet, num: number) => num.toString()}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text>Name: {workout.name}</Text>
      <Text>Description: {workout.description}</Text>
      <Text>Notes: {workout.notes}</Text>
      <Text>Workout Date: {workout.workoutDate.toString()}</Text>
      <Text>Start Time: {workout.startTime.toString()}</Text>
      <Text>End Time: {workout.endTime.toString()}</Text>
      <FlatList
        data={workoutExercises.exercises}
        style={styles.exerciseList}
        renderItem={renderExercises}
        keyExtractor={(item: IUserWorkoutExercise) => item.name}
      />
    </View>
  );
};

// @ts-ignore
HistoricUserWorkout.navigationOptions = {
  title: "Historic User Workout",
} as NavigationStackOptions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  allExercises: {},
  exerciseList: {},
  exerciseLockup: {
    borderColor: "black",
    borderWidth: 1,
    fontSize: 18,
    marginTop: 15,
  },
  setList: {},
  setLockup: {
    marginTop: 5,
  },
});

export default HistoricUserWorkout;
