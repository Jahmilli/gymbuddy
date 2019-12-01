import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack';
import { Exercise, Workout } from '../../logic/domains/Workout.domain';

type Props = {
  navigation: NavigationStackProp<{ userId?: string }>
}

const initialExercisesState: Exercise[] = [{
  name: '',
  description: ''
}];

const intialWorkoutState: Workout = {
  name: '',
  description: '',
  exercises: initialExercisesState
};

class CreateWorkout extends React.Component<Props> {
  state = intialWorkoutState;

  static navigationOptions: NavigationStackOptions = {
    title: "Create Workout",
  }

  handleInputChange = (key: string) => (text: string) => {
    this.setState({
      [name]: text
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Workout Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={this.handleInputChange("name")}
          value={this.state.name}
        />
        <Text>Description</Text>
        <TextInput
          style={styles.input}
          onChangeText={this.handleInputChange("description")}
          value={this.state.name}
        />
      

        <Button
          title="Create Workout"
          onPress={() => this.props.navigation.navigate('Create Workout')} 
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    backgroundColor: "#eee",
    borderRadius: 15,
    marginBottom: 25,
    paddingLeft: 10,
    paddingRight: 10
  },
});


export default CreateWorkout;