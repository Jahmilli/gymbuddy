import React, { ChangeEvent } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationStackOptions, NavigationStackProp } from 'react-navigation-stack';
import { FlatList, TouchableNativeFeedback } from 'react-native-gesture-handler';
import { exercises } from '../../utilities/Constants';
import { SPLIT_TYPE, Exercise } from '../../logic/domains/Workout.domain';

type Props = {
  navigation: NavigationStackProp<{ exerciseType: SPLIT_TYPE }>
}

class AddExercise extends React.Component<Props> {
  state = {
    username: "",
    password: ""
  }
  splitType = this.props.navigation.getParam("splitType", "No Type Provided");

  static navigationOptions = ({ navigation }): NavigationStackOptions => {
    return {
      title: "Add Exercise Type" 
    }
  }
  
  handlePress = (item: Exercise) => {
    this.props.navigation.navigate('CreateWorkout', { exercise: item })
    // this.props.navigation.navigate({routeName: "CreateWorkout", params: item})
  }

  render() {
    return (
    <View style={styles.container}>
      <Text>Type is {this.splitType}</Text>
    <FlatList<Exercise>
      data={exercises.filter((val) => val.splitType === this.splitType)}
      keyExtractor={(item: Exercise) => item.name }
      renderItem={({ item }) => (
        <TouchableNativeFeedback 
          onPress={() => this.handlePress(item)}
          style={styles.item}>
          <View>
            <Text>{item.name}</Text>
            <Text>{item.bodyPart}</Text>
          </View>
        </TouchableNativeFeedback>
      )}
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
  item: {
    borderColor: 'black',
    borderWidth: 1,
    fontSize: 18,
    height: 44,
    marginTop: 4
  }
});

export default AddExercise;