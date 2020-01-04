import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  FlatList,
  TouchableNativeFeedback,
} from "react-native-gesture-handler";
import {
  NavigationStackOptions,
  NavigationStackProp,
} from "react-navigation-stack";
import { IExercise, SPLIT_TYPE } from "../../logic/domains/Workout.domain";
import { getAllExercisesBySplitType } from "../../logic/functions/exercises";

interface Props {
  navigation: NavigationStackProp<{ exerciseType: SPLIT_TYPE }>;
}

class AddExercise extends React.Component<Props> {

  public static navigationOptions = ({ navigation }): NavigationStackOptions => {
    return {
      title: "Add Exercise Type",
    };
  };
  public state = {
    exercises: [],
  };
  public splitType: SPLIT_TYPE = this.props.navigation.getParam(
    "splitType",
    "No Type Provided"
  );

  public componentDidMount() {
    const getExercises = async () => {
      try {
        const exercises: any = await getAllExercisesBySplitType(this.splitType);
        this.setState({ exercises });
      } catch (err) {
        console.log("An error occurred when getting all exercises", err);
      }
    };
    getExercises();
  }

  public handlePress(item: IExercise) {
    this.props.navigation.navigate("CreateWorkout", { newExercise: item });
    // this.props.navigation.navigate({routeName: "CreateWorkout", params: item})
  }

  public render() {
    return (
      <View style={styles.container}>
        <Text>Type is {this.splitType}</Text>
        <FlatList<IExercise>
          data={this.state.exercises}
          keyExtractor={(item: IExercise) => item.name}
          renderItem={({ item }) => (
            <TouchableNativeFeedback
              onPress={() => this.handlePress(item)}
              style={styles.item}
            >
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
    padding: 25,
  },
  item: {
    borderColor: "black",
    borderWidth: 1,
    fontSize: 18,
    height: 44,
    marginTop: 4,
  },
});

export default AddExercise;
