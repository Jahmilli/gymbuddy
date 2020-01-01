import React from "react";
import { NavigationStackProp, NavigationStackOptions } from "react-navigation-stack";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { IWorkout, IComment } from "../../logic/domains/Workout.domain";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { getComments, createComment, getWorkouts } from "../../logic/functions/workout";

type Props = {
  navigation: NavigationStackProp;
}

class SharedWorkouts extends React.Component<Props> {
  static navigationOptions: NavigationStackOptions = {
    title: "Shared Workouts", 
  }

  state = {
    workouts: []
  }

  componentDidMount() {
    const callGetWorkouts = async () => {
      try {
        const workouts = await getWorkouts();
        this.setState({ workouts });
      } catch(err) {
        alert('An error occurred when getting workouts');
        console.log("An error occurred when getting workouts", err);
      }
    }
    callGetWorkouts();
  }

  handleSelectWorkout = (workout: IWorkout) => {
    this.props.navigation.navigate('TemplateWorkout', { workout })
  }

  renderWorkout = ({ item }: { item: IWorkout }) => (
    <View style={styles.workout}>
      <Text onPress={() => this.handleSelectWorkout(item)}>{item.name}</Text>
      <Text>{item.description}</Text>
      <Text>{item.ratings}</Text>
    </View>
  );

  render() {
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
    flex: 1
  },
  workoutsList: {
    
  },
  workout: {
    borderColor: 'black',
    borderWidth: 1,
    fontSize: 18,
    height: 100,
    marginTop: 4
  }
});

export default SharedWorkouts;