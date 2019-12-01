import React, { ChangeEvent } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationStackOptions, NavigationStackProp } from 'react-navigation-stack';
import { FlatList, TouchableNativeFeedback } from 'react-native-gesture-handler';
import { SPLIT_TYPE, exercises, ExerciseName } from '../../utilities/Constants';

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

  render() {
    return (
    <View style={styles.container}>
      <Text>Type is {this.splitType}</Text>
    <FlatList<ExerciseName>
      data={exercises.filter((val) => val.splitType === this.splitType)}
      // data={exercises}
      keyExtractor={(item: ExerciseName) => item.name }
      renderItem={({ item }) => (
        <Text>{item.name}</Text>
        // <TouchableNativeFeedback style={styles.item}>
        //   {item.name}
        // </TouchableNativeFeedback>
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
    padding: 10,
    fontSize: 18,
    height: 44,
  }
});

export default AddExercise;