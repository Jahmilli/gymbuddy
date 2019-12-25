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

// Determines number of columns in exercises grid
const numColumns = 3;
class CreateWorkout extends React.Component<Props> {
  state = {
    ...intialWorkoutState
  }
  
  static navigationOptions: NavigationStackOptions = {
    title: 'Create Workout',
  }
  
  // Check function for verifying all fields are added
  isCompleteWorkout = () => {
    return this.state.exercises.length > 0 && this.state.name.length > 0 && this.state.description.length > 0;
  }
  
  // Used to make sure only unique exercises are added
  // TODO: Fix this
  isNewExercise = (exerciseName: string | null, exercises: Exercise[]) => {
    // console.log('checking exercsies', exercise, this.state.exercises);
    if (!exerciseName) {
      return false;
    }
    for (const index in exercises) {
      if (exercises[index].name === exerciseName) {
        return false;
      }
    }
    return true;
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    const exercise = this.props.navigation.getParam('exercise', null);
    
    // TODO: Fix this, it sucks...
    if (this.isNewExercise(exercise, this.state.exercises)
      && prevState.exercises[prevState.exercises.length-1] !== exercise
      && this.state.exercises[this.state.exercises.length - 1] !== exercise) {
      this.setState({
        exercises: [...this.state.exercises, exercise],
        initialLoad: false
      });
    }
  }
  
  handleInputChange = (key: string) => (text: string) => {
    this.setState({
      [key]: text
    });
  }
  
  renderExercise = ({ item }: { item: Exercise}) => {
    return (
      <View style={styles.exercise}>
        <Text style={styles.removeExercise} onPress={() => this.removeExercise(item)}>X</Text>
        <Text style={styles.exerciseName} onPress={() => this.handleSelectExercise(item)}>{item.name}</Text>
        <Text style={styles.exerciseDescription}>{item.bodyPart}</Text>
        <Text style={styles.exerciseDescription}>{item.splitType}</Text>
      </View>
    )
  }

  removeExercise(exercise: Exercise) {
    let newExercises = [...this.state.exercises];
    newExercises = newExercises.filter((item: Exercise) => item !== exercise);
    console.log('new exercises is', newExercises);
    this.setState({
      exercises: newExercises
    });
  }

  handleSelectExercise(exercise: Exercise) {
    this.props.navigation.navigate('AddExerciseInfo', { exercise })
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
          renderItem={this.renderExercise}
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
    backgroundColor: '#00bfff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / numColumns,
    borderRadius: 5
  },
  removeExercise: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  exerciseName: {

  },
  exerciseDescription: {

  }
});


export default CreateWorkout;