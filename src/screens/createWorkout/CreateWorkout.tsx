import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Dimensions } from 'react-native';
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack';
import { Exercise, Workout } from '../../logic/domains/Workout.domain';
import { FlatList } from 'react-native-gesture-handler';
import { createWorkout } from '../../logic/functions/workout';

type Props = {
  navigation: NavigationStackProp<{ userId?: string }>
}
const intialWorkoutState: Workout = {
  name: '',
  description: '',
  exercises: [],
};

const renderExercise = ({ item }: { item: Exercise}) => {
  return (
    <View style={styles.exercise}>
      <Text style={styles.Exercise}>{item.name}</Text>
      <Text style={styles.exerciseDescription}>{item.splitType}</Text>
    </View>
  )
}
const numColumns = 3;
class CreateWorkout extends React.Component<Props> {
  state = intialWorkoutState;

  static navigationOptions: NavigationStackOptions = {
    title: 'Create Workout',
  }

  isCompleteWorkout = () => {
    return this.state.exercises.length > 0 && this.state.name.length > 0 && this.state.description.length > 0;
  }

  isNewExercise = (exercise: string) => {
    for (const index in this.state.exercises) {
      if (this.state.exercises[index].name === exercise) {
        return false;
      }
    }
    return true;
  }

  // TODO: Determine if using componentDidMount is better here
  componentDidUpdate(prevProps, prevState, snapshot) {
    const exercise = this.props.navigation.getParam('exercise', null);
    if (exercise && this.isNewExercise && this.state.exercises[this.state.exercises.length - 1] !== exercise) {
      this.setState({
        exercises: [...this.state.exercises, exercise]
      });
    }
  }

  handleInputChange = (key: string) => (text: string) => {
    this.setState({
      [key]: text
    });
  }

  handleCreateWorkout = async () => {
    try {
      console.log('exercises in handlecreate', JSON.stringify(this.state));
      await createWorkout(this.state);
      this.props.navigation.navigate('Home'); 
    } catch(err) {
      console.log('An error occurred when creating workout', err);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Workout Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={this.handleInputChange('name')}
          value={this.state.name}
        />
        <Text>Description</Text>
        <TextInput
          style={styles.input}
          onChangeText={this.handleInputChange('description')}
          value={this.state.description}
        />
        <Button
          title='Add Exercise'
          onPress={() => this.props.navigation.navigate('AddExerciseType')}
        />
        <FlatList 
          data={this.state.exercises}
          style={styles.exerciseList}
          renderItem={renderExercise}
          keyExtractor={(item: Exercise) => item.name}
          numColumns={numColumns}
        />
        { this.isCompleteWorkout() ?
          <Button
            title='Create Workout'
            onPress={this.handleCreateWorkout}
          />
          : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    backgroundColor: '#eee',
    marginBottom: 25,
    paddingLeft: 10,
    paddingRight: 10
  },
  exerciseList: {
    flex: 1,
    marginVertical: 20
  },
  exercise: {
    backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / numColumns,
    borderRadius: 5
  },
  Exercise: {
  },
  exerciseDescription: {
  }
});


export default CreateWorkout;