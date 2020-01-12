import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import { IUserWorkout } from "../../logic/domains/UserWorkout.domain";
import { getUserWorkouts } from "../../logic/functions/userworkout";

type Props = {
  navigation: NavigationStackProp;
};

const WorkoutHistory: React.FC<Props> = ({ navigation }) => {
  const [workouts, setWorkouts] = React.useState<IUserWorkout[]>([]);

  React.useEffect(() => {
    const callGetHistoricWorkouts = async () => {
      try {
        const historicWorkouts = await getUserWorkouts(
          "b5452a48-85d7-4900-8c90-bc81b8e5b485",
          true
        );
        setWorkouts(historicWorkouts);
      } catch (err) {
        alert("An error occurred when getting historic workouts");
        console.log("An error occurred when getting historic workouts", err);
      }
    };
    callGetHistoricWorkouts();
  }, []);

  const navigateToHistoricUserWorkout = (workout: IUserWorkout) => {
    navigation.navigate("HistoricUserWorkout", { workout });
  };

  const renderUserWorkout = ({ item }: { item: IUserWorkout }) => (
    <View style={styles.workout}>
      <Text onPress={() => navigateToHistoricUserWorkout(item)}>
        {item.name}
      </Text>
      <Text>{item.description}</Text>
      <Text>{item.notes}</Text>
      <Text>{item.workoutDate.toString()}</Text>
    </View>
  );

  return (
    <View style={styles.workoutsList}>
      <Text>Workout History</Text>
      <FlatList
        data={workouts}
        style={styles.workoutsList}
        renderItem={renderUserWorkout}
        keyExtractor={(item: IUserWorkout) => item.userWorkoutId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  workoutsList: {
    flex: 1,
  },
  workout: {
    borderColor: "black",
    borderWidth: 1,
    fontSize: 18,
    height: 100,
    marginTop: 4,
  },
});

export default WorkoutHistory;
