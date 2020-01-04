import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack';
import { FlatList } from 'react-native-gesture-handler';
import { getWorkouts } from '../../logic/functions/workout';
import { IWorkout } from '../../logic/domains/Workout.domain';
import { IUserWorkout } from '../../logic/domains/UserWorkout.domain';
import { getUserWorkouts } from '../../logic/functions/userworkout';

type Props = {
  navigation: NavigationStackProp<{ userId?: string }>
}

class HomeScreen extends React.Component<Props> {
  static navigationOptions: NavigationStackOptions = {
    title: "Home Screen", 
  }
  state = {
    userTemplateWorkouts: [],
    userWorkouts: []
  }

  componentDidMount() {
    const callGetWorkouts = async () => {
      try {
        const userTemplateWorkouts: Promise<IWorkout> = getWorkouts("b5452a48-85d7-4900-8c90-bc81b8e5b485");
        const userWorkouts: Promise<IUserWorkout[]> = getUserWorkouts("b5452a48-85d7-4900-8c90-bc81b8e5b485");
        const results = await Promise.all([userTemplateWorkouts, userWorkouts]);
        this.setState({
          userTemplateWorkouts: results[0],
          userWorkouts: results[1],
        });
      } catch(err) {
        console.log('An error occurred when getting workouts', err);
      }
    }
    callGetWorkouts();
  }

  // Navigate to more information about that workout
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

  renderUserWorkout = ({ item }: { item: IUserWorkout }) => (
    <View style={styles.workout}>
      <Text 
        onPress={() => this.props.navigation.navigate('UserWorkout', {
          workout: item
        })}>
          {item.name}
      </Text>
      <Text>{item.description}</Text>
      <Text>{item.notes}</Text>
      <Text>{item.workoutDate.toString()}</Text>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Create Workout"
          onPress={() => this.props.navigation.navigate('CreateWorkout')} 
        />
        <Button
          title="View Shared Workouts"
          onPress={() => this.props.navigation.navigate('SharedWorkouts')} 
        />
        <Text>Your Template Workouts</Text>
        <FlatList
          data={this.state.userTemplateWorkouts}
          style={styles.workoutsList}
          renderItem={this.renderWorkout}
          keyExtractor={(item: IWorkout, index: number) => item.workoutId.toString()}
          />
        <Text>Upcoming Workouts</Text>
        <FlatList
          data={this.state.userWorkouts}
          style={styles.workoutsList}
          renderItem={this.renderUserWorkout}
          keyExtractor={(item: IUserWorkout, index: number) => item.userWorkoutId}
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
    flex: 1
  },
  workout: {
    borderColor: 'black',
    borderWidth: 1,
    fontSize: 18,
    height: 100,
    marginTop: 4
  }
});


export default HomeScreen;