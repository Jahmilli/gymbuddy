import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Dimensions, CheckBox } from 'react-native';
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack';
import { IWorkout, IWorkoutExercise, ISet } from '../../logic/domains/Workout.domain';
import { createWorkout } from '../../logic/functions/workout';
import { StackActions } from 'react-navigation';
import ExerciseList from '../../components/ExerciseList/ExerciseList';

type Props = {
  navigation: NavigationStackProp<{ userId?: string }>
}

const intialWorkoutState: IWorkout = {
  name: '',
  description: '',
  exercises: [],
  ratings: 0,
  shared: false,
  workoutTimestamp: null,
  createdBy: ""
};

// Determines number of columns in exercises grid
const numColumns = 3;
class CreateWorkout extends React.Component<Props> {
  state = {
    ...intialWorkoutState
  } as IWorkout;
  
  // Configure the navigation bar
  static navigationOptions: NavigationStackOptions = {
    title: 'Create Workout',
  }
  
  // Check function for verifying all fields are added
  isCompleteWorkout = () => {
    return this.state.exercises.length > 0 && this.state.name.length > 0 && this.state.description.length > 0;
  }
  
  // Used to make sure only unique exercises are added
  // TBA: Might be better to just use a Set and then convert to array when submitting
  isNewExercise = (exercise: IWorkoutExercise | null, exercises: IWorkoutExercise[]) => {
    if (!exercise) {
      return false;
    }
    for (const index in exercises) {
      if (exercises[index].name === exercise.name) {
        return false;
      }
    }
    return true;
  }

  componentDidMount() {
    this.setState({
      createdBy: "b5452a48-85d7-4900-8c90-bc81b8e5b485", // Creating temporary userid for now
      workoutTimestamp: Date.now()
    });
  }
  
  componentDidUpdate(prevProps, prevState) {
    const exercise: IWorkoutExercise = this.props.navigation.getParam('exercise', null);
    const exerciseSets: ISet[] = this.props.navigation.getParam('sets', null)
    
    // TODO: Fix this, it sucks... (Used for adding unique exercises from AddExercise)
    if (this.isNewExercise(exercise, this.state.exercises)
      && prevState.exercises[prevState.exercises.length-1] !== exercise
      && this.state.exercises[this.state.exercises.length - 1] !== exercise) {
      this.setState({
        exercises: [...this.state.exercises, exercise]
      });
    }
    // Used when we add sets to an exercise
    if (exerciseSets && prevProps.navigation.getParam('sets') !== exerciseSets) {
      const exercises = [...this.state.exercises];
      for (let i in exercises) {
        if (exercises[i] === exercise) {
          exercises[i].sets = exerciseSets;
          break;
        }
      }
      this.setState({ exercises });
    }
  }
 
  handleInputChange = (key: string) => (text: string) => {
    this.setState({
      [key]: text
    });
  }

  removeExercise = (exercise: IWorkoutExercise) => {
    let newExercises = [...this.state.exercises];
    newExercises = newExercises.filter((item: IWorkoutExercise) => item !== exercise);
    this.setState({
      exercises: newExercises
    });
  }

  handleSelectExercise = (exercise: IWorkoutExercise) => {
    this.props.navigation.navigate('AddExerciseInfo', { exercise })
  }

  handleCreateWorkout = async () => {
    try {
      this.setState({
        workoutTimestamp: Date.now()
      })
      await createWorkout(this.state);
      this.props.navigation.navigate('Home', {
        action: StackActions.POP
      })
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
        <View style={styles.checkboxLockup}>
          <CheckBox
            value={this.state.shared}
            onChange={() => {
              this.setState({ shared: !this.state.shared})
            }}
          />
          <Text>Shared?</Text>
        </View>
        <Button
          title='Add Exercise'
          onPress={() => this.props.navigation.navigate('AddExerciseType')}
        />
        <ExerciseList exercises={this.state.exercises} removeExercise={this.removeExercise} handleSelectItem={this.handleSelectExercise} />
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
  checkboxLockup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
});


export default CreateWorkout;