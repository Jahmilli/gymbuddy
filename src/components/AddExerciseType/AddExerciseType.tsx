import React, { ChangeEvent } from 'react';
import { StyleSheet, Text, View, Button, TouchableNativeFeedback } from 'react-native';
import { NavigationStackOptions, NavigationStackProp } from 'react-navigation-stack';
import { exerciseTypes, EXERCISE_TYPES } from '../../utilities/Constants';

type Props = {
  navigation: NavigationStackProp<{ userId?: string }>
  exerciseTypes: string;
}
const backgroundColors = [
  'powderblue',
  'skyblue',
  'steelblue'
]
class AddExerciseType extends React.Component<Props> {
  state = {
    username: "",
    password: ""
  }

  static navigationOptions = ({ navigation }): NavigationStackOptions => {
    return {
      title: "Add Exercise Type"
    }
  }

  handlePress = (exerciseType: EXERCISE_TYPES) => {
    this.props.navigation.navigate('AddExercise', { exerciseType })
  }

  render() {
    return (
      <View style={styles.container}>
        {exerciseTypes.map((type: EXERCISE_TYPES, index: number) => (
          <TouchableNativeFeedback
            onPress={() => this.handlePress(type)}
            key={index}
            style={{ flex: 1, backgroundColor: backgroundColors[index] }}
            background={TouchableNativeFeedback.Ripple('red')}>
            <View style={{ flex: 1, backgroundColor: backgroundColors[index], justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.text}>{type}</Text>
            </View>
          </TouchableNativeFeedback>
        ))}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 25
  },
  typeLockup: {
    flex: 1
  },
  text: {
    fontSize: 22
  }
});


export default AddExerciseType;