import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { FlatList, TextInput } from "react-native-gesture-handler";
import {
  NavigationStackOptions,
  NavigationStackProp,
} from "react-navigation-stack";
import { IComment, IWorkout } from "../../logic/domains/Workout.domain";
import {
  createComment,
  getComments,
  getWorkouts,
} from "../../logic/functions/workout";

type Props = {
  navigation: NavigationStackProp;
};

class SharedWorkouts extends React.Component<Props> {
  public static navigationOptions: NavigationStackOptions = {
    title: "Shared Workouts",
  };

  public state = {
    workouts: [],
  };

  public componentDidMount() {
    const callGetWorkouts = async () => {
      try {
        const workouts = await getWorkouts();
        this.setState({ workouts });
      } catch (err) {
        alert("An error occurred when getting workouts");
        console.log("An error occurred when getting workouts", err);
      }
    };
    callGetWorkouts();
  }

  public handleSelectWorkout = (workout: IWorkout) => {
    this.props.navigation.navigate("TemplateWorkout", { workout });
  };

  public renderWorkout = ({ item }: { item: IWorkout }) => (
    <View style={styles.workout}>
      <Text onPress={() => this.handleSelectWorkout(item)}>{item.name}</Text>
      <Text>{item.description}</Text>
      <Text>{item.ratings.length}</Text>
    </View>
  );

  public render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.workouts}
          style={styles.workoutsList}
          renderItem={this.renderWorkout}
          keyExtractor={(item: IWorkout) => item.workoutId.toString()}
        />
      </View>
    );
  }
}

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
