import React from "react";
import { StyleSheet, FlatList, View, Dimensions, Text } from "react-native";
import { IWorkoutExercise } from "../../logic/domains/Workout.domain";

type ExerciseListProps = {
  exercises: IWorkoutExercise[];
  removeExercise?: Function;
  handleSelectItem: Function;
}

const numColumns = 3;
const ExerciseList: React.FunctionComponent<ExerciseListProps> = ({ exercises, removeExercise, handleSelectItem }) => {

  const renderExercise = ({ item }: { item: IWorkoutExercise }) => (
    <View style={styles.exercise}>
      { removeExercise ? 
        <Text style={styles.removeExercise} onPress={() => removeExercise(item)}>X</Text>
        : null
      }
      <Text onPress={() => handleSelectItem(item)}>{item.name}</Text>
      <Text>{item.bodyPart}</Text>
      <Text>{item.splitType}</Text>
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
}

const styles = StyleSheet.create({
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
  }
});

export default ExerciseList;

