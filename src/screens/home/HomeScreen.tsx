import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack';
import { getWorkouts } from '../../logic/functions/workout';
import { FlatList } from 'react-native-gesture-handler';
import { IWorkout } from '../../logic/domains/Workout.domain';

type Props = {
  navigation: NavigationStackProp<{ userId?: string }>
}

class HomeScreen extends React.Component<Props> {
  static navigationOptions: NavigationStackOptions = {
    title: "Home Screen", 
  }
  state = {
    sharedWorkouts: [],
    userWorkouts: []
  }

  componentDidMount() {
    const callGetWorkouts = async () => {
      try {
        const userWorkoutResults: Promise<IWorkout> = getWorkouts("b5452a48-85d7-4900-8c90-bc81b8e5b485");
        const allWorkoutsResults: Promise<IWorkout> = getWorkouts();
        const results = await Promise.all([userWorkoutResults, allWorkoutsResults]);
        this.setState({
          userWorkouts: results[0],
          sharedWorkouts: results[1],
        });
      } catch(err) {
        console.log('An error occurred when getting workouts', err);
      }
    }
    callGetWorkouts();
  }

  renderWorkout = ({ item }: { item: IWorkout }) => (
    <View style={styles.workout}>
      <Text>{item.name}</Text>
      <Text>{item.description}</Text>
      <Text>{item.stars}</Text>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Create Workout"
          onPress={() => this.props.navigation.navigate('CreateWorkout')} 
        />
        <Text>Your Template Workouts</Text>
        <FlatList
          data={this.state.userWorkouts}
          style={styles.workoutsList}
          renderItem={this.renderWorkout}
          keyExtractor={(item: IWorkout, index: number) => `${item.name}-${index}`}
          />
        <Text>Shared Template Workouts</Text>
        <FlatList
          data={this.state.sharedWorkouts}
          style={styles.workoutsList}
          renderItem={this.renderWorkout}
          keyExtractor={(item: IWorkout, index: number) => `${item.name}-${index}`}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25
  },
  workoutsList: {
  },
  workout: {
    borderColor: 'black',
    borderWidth: 1,
    fontSize: 18,
    height: 75,
    marginTop: 4
  }
});


export default HomeScreen;