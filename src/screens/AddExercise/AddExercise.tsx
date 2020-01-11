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

type Props = {
  navigation: NavigationStackProp<{ exerciseType: SPLIT_TYPE }>;
};

const AddExercise: React.FC<Props> = ({ navigation }) => {
  const [exercises, setExercises] = React.useState([]);

  const splitType: SPLIT_TYPE = navigation.getParam(
    "splitType",
    "No Type Provided"
  );

  // Might not need this
  React.useEffect(() => {
    const getExercises = async () => {
      try {
        const exercises: any = await getAllExercisesBySplitType(splitType);
        setExercises(exercises);
      } catch (err) {
        console.log("An error occurred when getting all exercises", err);
      }
    };
    getExercises();
  }, []);

  const handlePress = (item: IExercise) => {
    navigation.navigate("CreateWorkout", { newExercise: item });
  };

  return (
    <View style={styles.container}>
      <Text>Type is {splitType}</Text>
      <FlatList<IExercise>
        data={exercises}
        keyExtractor={(item: IExercise) => item.name}
        renderItem={({ item }) => (
          <TouchableNativeFeedback
            onPress={() => handlePress(item)}
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
};

// @ts-ignore
AddExercise.navigationOptions = {
  title: "Add Exercise",
} as NavigationStackOptions;

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
