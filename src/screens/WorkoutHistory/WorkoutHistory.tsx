import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import { IUserWorkout } from "../../logic/domains/UserWorkout.domain";
import { getUserWorkouts } from "../../logic/functions/userworkout";

type Props = {
  navigation: NavigationStackProp;
};

class WorkoutHistory extends React.Component<Props> {
  state = {
    workouts: [] as IUserWorkout[],
  };

  componentDidMount() {
    const callGetHistoricWorkouts = async () => {
      try {
        const historicWorkouts = await getUserWorkouts(
          "b5452a48-85d7-4900-8c90-bc81b8e5b485",
          true
        );
        this.setState({
          workouts: historicWorkouts,
        });
      } catch (err) {
        alert("An error occurred when getting historic workouts");
        console.log("An error occurred when getting historic workouts", err);
      }
    };
    callGetHistoricWorkouts();
  }

  public renderUserWorkout = ({ item }: { item: IUserWorkout }) => (
    <View style={styles.workout}>
      <Text
        onPress={() =>
          this.props.navigation.navigate("UserWorkout", {
            workout: item,
          })
        }
      >
        {item.name}
      </Text>
      <Text>{item.description}</Text>
      <Text>{item.notes}</Text>
      <Text>{item.workoutDate.toString()}</Text>
    </View>
  );

  render() {
    return (
      <View style={styles.workoutsList}>
        <Text>Workout History</Text>
        <FlatList
          data={this.state.workouts}
          style={styles.workoutsList}
          renderItem={this.renderUserWorkout}
          keyExtractor={(item: IUserWorkout) => item.userWorkoutId}
        />
      </View>
    );
  }
}

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
