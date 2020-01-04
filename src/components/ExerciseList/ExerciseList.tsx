import React from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { IWorkoutExercise } from "../../logic/domains/Workout.domain";

interface ExerciseListProps {
  exercises: IWorkoutExercise[];
  removeExercise?: () => void;
  handleSelectItem: () => void;
}

const numColumns = 3;
// Note, requires a container with `flex: 1` to display atm...
const ExerciseList: React.FC<ExerciseListProps> = ({
  exercises,
  removeExercise,
  handleSelectItem,
}) => {
  React.useEffect(() => {}, [exercises]);

  const renderExercise = ({ item }: { item: IWorkoutExercise }) => (
    <View style={styles.exercise}>
      {removeExercise ? (
        <Text
          style={styles.removeExercise}
          onPress={() => removeExercise(item)}
        >
          X
        </Text>
      ) : null}
      <Text onPress={() => handleSelectItem(item)}>{item.name}</Text>
      <Text>{item.bodyPart}</Text>
      <Text>{item.splitType}</Text>
      <Text>Sets: {item.sets.length}</Text>
    </View>
  );

  return (
    <FlatList
      data={exercises}
      style={styles.exerciseList}
      renderItem={renderExercise}
      keyExtractor={(item: IWorkoutExercise) => item.name}
      numColumns={numColumns}
    />
  );
};

const styles = StyleSheet.create({
  exerciseList: {
    flex: 1,
    marginVertical: 20,
  },
  exercise: {
    backgroundColor: "#00bfff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 1,
    height: Dimensions.get("window").width / numColumns,
    borderRadius: 5,
  },
  removeExercise: {
    position: "absolute",
    top: 0,
    right: 0,
  },
});

export default ExerciseList;
