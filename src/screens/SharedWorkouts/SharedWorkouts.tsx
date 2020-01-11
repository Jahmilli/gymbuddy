import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { FlatList, TextInput } from "react-native-gesture-handler";
import {
  NavigationStackOptions,
  NavigationStackProp,
} from "react-navigation-stack";
import { IWorkout } from "../../logic/domains/Workout.domain";
import { getWorkouts } from "../../logic/functions/workout";

type Props = {
  navigation: NavigationStackProp;
};

const sortByLikes = (workouts: IWorkout[]) => {
  return workouts.sort(
    (a: IWorkout, b: IWorkout) => b.ratings.length - a.ratings.length
  );
};

const SharedWorkouts: React.FC<Props> = ({ navigation }) => {
  const [workouts, setWorkouts] = React.useState([]);
  React.useEffect(() => {
    const callGetWorkouts = async () => {
      try {
        const workouts: IWorkout[] = await getWorkouts();
        const sortedWorkouts = sortByLikes(workouts);
        setWorkouts(sortedWorkouts);
      } catch (err) {
        alert("An error occurred when getting workouts");
        console.log("An error occurred when getting workouts", err);
      }
    };
    callGetWorkouts();
  }, []);

  const handleSelectWorkout = (workout: IWorkout) => {
    navigation.navigate("TemplateWorkout", { workout });
  };

  const renderWorkout = ({ item }: { item: IWorkout }) => (
    <View style={styles.workout}>
      <Text onPress={() => handleSelectWorkout(item)}>{item.name}</Text>
      <Text>{item.description}</Text>
      <Text>Likes: {item.ratings.length}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={workouts}
        style={styles.workoutsList}
        renderItem={renderWorkout}
        keyExtractor={(item: IWorkout) => item.workoutId.toString()}
      />
    </View>
  );
};

// @ts-ignore
SharedWorkouts.navigationOptions = {
  title: "Shared Workout",
} as NavigationStackOptions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  workoutsList: {},
  workout: {
    borderColor: "black",
    borderWidth: 1,
    fontSize: 18,
    height: 100,
    marginTop: 4,
  },
});

export default SharedWorkouts;
