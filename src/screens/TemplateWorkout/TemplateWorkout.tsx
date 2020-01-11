import React from "react";
import { Button, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { FlatList, TextInput } from "react-native-gesture-handler";
import {
  NavigationStackOptions,
  NavigationStackProp,
} from "react-navigation-stack";
import ExerciseList from "../../components/ExerciseList/ExerciseList";
import {
  IComment,
  IRating,
  IWorkout,
} from "../../logic/domains/Workout.domain";
import {
  createComment,
  updateRating,
  getComments,
  getWorkoutExercises,
} from "../../logic/functions/workout";

type Props = {
  navigation: NavigationStackProp;
};

const initialCommentState = {
  comment: "",
  replyTo: undefined,
};

const initialState = {
  exercises: [],
  comments: [],
  newComment: {
    ...initialCommentState,
  },
  isLikedWorkout: false,
  workoutRatings: 0,
};

const TemplateWorkout: React.FC<Props> = ({ navigation }) => {
  // TODO: Separate into separate vars so can use promise chaining for this rather than async await
  const [state, setState] = React.useState({ ...initialState });
  const workout: IWorkout = navigation.getParam("workout", null);

  React.useEffect(() => {
    const callGetData = async () => {
      try {
        const commentsPromise = getComments(workout.workoutId);
        const workoutsPromise = getWorkoutExercises(workout.workoutId);
        const results = await Promise.all([commentsPromise, workoutsPromise]);
        setState({
          ...state,
          comments: results[0],
          exercises: results[1],
          isLikedWorkout: checkIsLikedByUser(workout.ratings) !== -1,
          workoutRatings: workout.ratings.length,
        });
      } catch (err) {
        console.log("An error occurred when getting exercises", err);
        alert("An error occurred when getting exercises");
      }
    };
    callGetData();
  }, []);

  const getRatingObj = (
    commentId: string | null,
    workoutId: number | null
  ): IRating => {
    return {
      commentId,
      workoutId,
      userId: "b5452a48-85d7-4900-8c90-bc81b8e5b485",
      ratingTimestamp: new Date(),
    };
  };

  const checkIsLikedByUser = (ratings: IRating[]): number => {
    for (let i = 0; i < ratings.length; i++) {
      if (ratings[i].userId === "b5452a48-85d7-4900-8c90-bc81b8e5b485") {
        return i;
      }
    }
    return -1;
  };

  const setCommentRating = async (
    rating: IRating,
    ratingIndex: number,
    index: number
  ) => {
    try {
      const result: IRating | {} = await updateRating(rating);
      const comments = [...state.comments];

      if (ratingIndex === -1 && result) {
        comments[index].ratings.push(result);
      } else {
        comments[index].ratings.splice(ratingIndex, 1);
      }
      setState({
        ...state,
        comments,
      });
    } catch (err) {
      console.log("An error occurred when setting rating", err);
      alert("An error occurred when setting rating");
    }
  };

  const setWorkoutRating = async (rating: IRating) => {
    try {
      const result: IRating | {} = await updateRating(rating);
      const isLiked = Object.keys(result).length > 0; // If we received a rating response, a rating was created
      setState({
        ...state,
        isLikedWorkout: isLiked,
        workoutRatings: state.workoutRatings + (isLiked ? 1 : -1),
      });
    } catch (err) {
      console.log("An error occurred when setting rating", err);
      alert("An error occurred when setting rating");
    }
  };

  const renderComment = ({
    item,
    index,
  }: {
    item: IComment;
    index: number;
  }) => {
    const ratingIndex = checkIsLikedByUser(item.ratings);
    return (
      <View style={styles.comment}>
        <Text>{item.comment}</Text>
        <Text>{item.commentTimestamp}</Text>
        <Text
          style={ratingIndex !== -1 ? styles.likedRating : styles.rating}
          onPress={() =>
            setCommentRating(
              getRatingObj(item.commentId, null),
              ratingIndex,
              index
            )
          }
        >
          Likes: {item.ratings.length}
        </Text>
      </View>
    );
  };

  const handleInputChange = (replyTo: string = "") => (text: string) => {
    setState({
      ...state,
      newComment: {
        replyTo,
        comment: text,
      },
    });
  };

  // Create a new instance of the workout
  const handleSelectUseWorkout = () => {
    navigation.navigate("UserWorkout", {
      workout: {
        ...workout,
        exercises: state.exercises,
      },
      isNewWorkout: true,
    });
  };

  const handleSubmitComment = async () => {
    try {
      await createComment({
        workoutId: workout.workoutId,
        comment: state.newComment.comment,
        replyTo: state.newComment.replyTo,
        userId: "b5452a48-85d7-4900-8c90-bc81b8e5b485", // Creating temporary userid for no
        commentTimestamp: new Date(),
      } as IComment);
      setState({
        ...state,
        newComment: {
          ...initialCommentState,
        },
      });
      const comments = await getComments(workout.workoutId);
      setState({
        ...state,
        comments,
      });
    } catch (err) {
      alert("An error occurred when submitting comment");
      console.log("err is ", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{workout.name}</Text>
      <Text style={styles.createdBy}>{workout.createdBy}</Text>
      <Text style={styles.description}>Description: {workout.description}</Text>
      <Text
        style={state.isLikedWorkout ? styles.likedRating : styles.rating}
        onPress={() => setWorkoutRating(getRatingObj(null, workout.workoutId))}
      >
        Likes: {state.workoutRatings}
      </Text>
      <ExerciseList exercises={state.exercises} handleSelectItem={() => null} />
      <Text style={styles.commentHeading}>Comments:</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleInputChange()}
        onSubmitEditing={handleSubmitComment}
        placeholder="Write a comment..."
        value={state.newComment.comment}
      />
      <FlatList
        data={state.comments}
        style={styles.commentsList}
        renderItem={renderComment}
        extraData={state.comments}
        keyExtractor={(item: IComment) => item.commentId}
      />
      <Button title="Use Workout" onPress={handleSelectUseWorkout} />
    </View>
  );
};

// @ts-ignore
TemplateWorkout.navigationOptions = {
  title: "Template Workout",
} as NavigationStackOptions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    textAlign: "center",
  },
  createdBy: {
    fontSize: 16,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
  },
  commentHeading: {
    marginTop: 15,
  },
  commentsList: {
    flex: 1,
    marginTop: 5,
  },
  comment: {
    borderColor: "black",
    borderWidth: 1,
    fontSize: 18,
    padding: 5,
  },
  rating: {
    color: "black",
  },
  likedRating: {
    color: "blue",
  },
  input: {
    backgroundColor: "#eee",
    paddingLeft: 10,
    paddingRight: 1,
    borderRadius: 15,
  },
});

export default TemplateWorkout;
