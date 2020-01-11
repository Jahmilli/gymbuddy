import React from "react";
import {
  Button,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import {
  ISet,
  IWorkoutExercise,
  WEIGHT_UNIT,
} from "../../logic/domains/Workout.domain";

type Props = {
  navigation: NavigationStackProp;
};

const numColumns = 3;
const initialSet = {
  repetitions: 0,
  restTime: 0,
  setNumber: 0,
  weight: 0,
};
const AddExerciseInfo: React.FC<Props> = ({ navigation }) => {
  const exercise: IWorkoutExercise = navigation.getParam("exercise", null);
  const isUserWorkout: boolean = navigation.getParam(
    "isUserWorkoutExercise",
    false
  );
  const [sets, setSets] = React.useState<ISet[]>([]);
  const [currentSet, setCurrentSet] = React.useState<ISet>(initialSet);
  const [updatingSet, setUpdatingSet] = React.useState<boolean>(false);

  React.useEffect(() => {
    const sets = isUserWorkout
      ? transformSetsToUserSets(exercise.sets)
      : exercise.sets;

    if (sets) {
      const currentSet = {
        ...sets[sets.length - 1],
      };
      currentSet.setNumber = currentSet.setNumber + 1;
      setSets(sets);
      setCurrentSet(currentSet);
    }
  }, []);

  const transformSetsToUserSets = (sets: ISet[]) => {
    return sets.map((set: ISet) => {
      return {
        ...set,
        weight: set.weight || 0,
        weightUnit: set.weightUnit || WEIGHT_UNIT.KILOGRAM,
      };
    });
  };

  const handleInputChange = (key: string) => (text: string) => {
    const tempCurrentSet = { ...currentSet };
    tempCurrentSet[key] = parseInt(text, 10) || 0;
    setCurrentSet(tempCurrentSet);
  };

  // When add set is pressed
  const handleAddSet = () => {
    setSets([...sets, currentSet]);
    setCurrentSet({
      ...currentSet,
      setNumber: currentSet.setNumber + 1,
    });
  };

  // When update button is pressed
  const handleUpdateSet = () => {
    const tempSets = [...sets];
    tempSets[currentSet.setNumber] = { ...currentSet }; // Using spread to create a new object but might not need to do this
    setSets(tempSets);
    setUpdatingSet(false);
    setCurrentSet({
      ...currentSet,
      setNumber: tempSets.length,
    });
  };

  // When a set is pressed
  const handlePressSet = (set: ISet) => {
    setCurrentSet(set);
    setUpdatingSet(true);
  };

  const renderSet = ({ item }: { item: ISet }) => {
    return (
      <TouchableOpacity style={styles.set} onPress={() => handlePressSet(item)}>
        <Text style={styles.setNumber}>Set Number: {item.setNumber + 1}</Text>
        <Text style={styles.setRepetitions}>Reps: {item.repetitions}</Text>
        <Text style={styles.setRestTime}>Rest Time: {item.restTime}</Text>
        {isUserWorkout ? (
          <Text style={styles.setRepetitions}>
            weight: {item.weight} {item.weightUnit}
          </Text>
        ) : null}
      </TouchableOpacity>
    );
  };

  const handleSubmit = () => {
    navigation.state.params.updateSets(exercise, sets);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>{exercise.name}</Text>
        <Text>{exercise.description}</Text>
        <Text>{exercise.splitType}</Text>
        <Text>{exercise.bodyPart}</Text>
      </View>
      <View>
        <Text>Set: {currentSet.setNumber + 1}</Text>
        <Text>Repetitions</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleInputChange("repetitions")}
          keyboardType="numeric"
          value={currentSet.repetitions.toString()}
        />
        <Text>Rest Time (Seconds)</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleInputChange("restTime")}
          keyboardType="numeric"
          value={currentSet.restTime.toString()}
        />

        {isUserWorkout ? (
          <>
            <Text>Weight:</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleInputChange("weight")}
              onSubmitEditing={handleUpdateSet}
              keyboardType="numeric"
              value={currentSet.weight.toString()}
            />
          </>
        ) : null}
        {updatingSet ? (
          <Button
            title={`Update Set Number ${currentSet.setNumber + 1}`}
            onPress={handleUpdateSet}
          />
        ) : (
          <Button title="Add Set" onPress={handleAddSet} />
        )}
      </View>
      <FlatList
        data={sets}
        style={styles.setList}
        renderItem={renderSet}
        keyExtractor={(set: ISet) => set.setNumber.toString()}
        numColumns={numColumns}
      />
      {sets.length > 0 ? <Button title="Done" onPress={handleSubmit} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    backgroundColor: "#eee",
    marginBottom: 25,
    paddingLeft: 10,
    paddingRight: 1,
  },
  setList: {
    flex: 1,
    marginVertical: 20,
  },
  set: {
    backgroundColor: "#00bfff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 1,
    height: Dimensions.get("window").width / numColumns,
    borderRadius: 5,
  },
  setNumber: {},
  setRepetitions: {},
  setRestTime: {},
});

export default AddExerciseInfo;
