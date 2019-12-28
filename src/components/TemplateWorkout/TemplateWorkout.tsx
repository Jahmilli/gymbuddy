import React from "react";
import { NavigationStackProp, NavigationStackOptions } from "react-navigation-stack";
import { View, StyleSheet,Text } from "react-native";
import { IWorkout } from "../../logic/domains/Workout.domain";

type Props = {
  navigation: NavigationStackProp;
}

class TemplateWorkout extends React.Component<Props> {
  static navigationOptions: NavigationStackOptions = {
    title: "Template Workout", 
  }
  workout: IWorkout = this.props.navigation.getParam("workout", null);

  componentDidMount() {

  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.workout.name}</Text>
        <Text>{this.workout.description}</Text>
        <Text>{this.workout.createdBy}</Text>
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default TemplateWorkout;