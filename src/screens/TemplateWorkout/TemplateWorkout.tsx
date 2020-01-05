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
  createRating,
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

class TemplateWorkout extends React.Component<Props> {
  public static navigationOptions: NavigationStackOptions = {
    title: "Template Workout",
  };
  public state = {
    exercises: [],
    comments: [],
    newComment: {
      ...initialCommentState,
    },
  };
  public workout: IWorkout = this.props.navigation.getParam("workout", null);

  public componentDidMount() {
    const callGetComments = async () => {
      try {
        const comments = getComments(this.workout.workoutId);
        const workoutExercises = getWorkoutExercises(this.workout.workoutId);
        const results = await Promise.all([comments, workoutExercises]);
        this.setState({
          comments: results[0],
          exercises: results[1],
        });
        console.log("comments are ", results[0]);
      } catch (err) {
        console.log("An error occurred when getting comments", err);
      }
    };
    callGetComments();
  }

  public getRatingObj = (
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
  public renderComment = ({ item }: { item: IComment }) => (
    <View style={styles.comment}>
      <Text>{item.comment}</Text>
      <Text>{item.commentTimestamp}</Text>
      <Text
        onPress={() => createRating(this.getRatingObj(item.commentId, null))}
      >
        Likes: {item.ratings.length}
      </Text>
    </View>
  );

  public handleInputChange = (replyTo: string = "") => (text: string) => {
    this.setState({
      newComment: {
        replyTo,
        comment: text,
      },
    });
  };

  // Create a new instance of the workout
  public handleSelectUseWorkout = () => {
    this.props.navigation.navigate("UserWorkout", {
      workout: {
        ...this.workout,
        exercises: this.state.exercises,
      },
      isNewWorkout: true,
    });
  };

  public handleSubmitComment = async () => {
    try {
      await createComment({
        workoutId: this.workout.workoutId,
        comment: this.state.newComment.comment,
        replyTo: this.state.newComment.replyTo,
        userId: "b5452a48-85d7-4900-8c90-bc81b8e5b485", // Creating temporary userid for no
        commentTimestamp: new Date(),
      } as IComment);
      this.setState({
        newComment: {
          ...initialCommentState,
        },
      });
      const comments = await getComments(this.workout.workoutId);
      this.setState({ comments });
    } catch (err) {
      alert("An error occurred when submitting comment");
      console.log("err is ", err);
    }
  };

  public render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.workout.name}</Text>
        <Text style={styles.createdBy}>{this.workout.createdBy}</Text>
        <Text style={styles.description}>
          Description: {this.workout.description}
        </Text>
        <Text
          onPress={() =>
            createRating(this.getRatingObj(null, this.workout.workoutId))
          }
        >
          Likes: {this.workout.ratings.length}
        </Text>
        <ExerciseList
          exercises={this.state.exercises}
          handleSelectItem={() => null}
        />
        <Text style={styles.commentHeading}>Comments:</Text>
        <TextInput
          style={styles.input}
          onChangeText={this.handleInputChange()}
          onSubmitEditing={this.handleSubmitComment}
          placeholder="Write a comment..."
          value={this.state.newComment.comment}
        />
        <FlatList
          data={this.state.comments}
          style={styles.commentsList}
          renderItem={this.renderComment}
          keyExtractor={(item: IComment) => item.commentId}
        />
        <Button title="Use Workout" onPress={this.handleSelectUseWorkout} />
      </View>
    );
  }
}

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
  input: {
    backgroundColor: "#eee",
    paddingLeft: 10,
    paddingRight: 1,
    borderRadius: 15,
  },
});

export default TemplateWorkout;
