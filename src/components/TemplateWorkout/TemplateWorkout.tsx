import React from "react";
import { NavigationStackProp, NavigationStackOptions } from "react-navigation-stack";
import { View, StyleSheet,Text } from "react-native";
import { IWorkout, IComment } from "../../logic/domains/Workout.domain";
import { FlatList } from "react-native-gesture-handler";
import { getComments } from "../../logic/functions/workout";

type Props = {
  navigation: NavigationStackProp;
}

class TemplateWorkout extends React.Component<Props> {
  static navigationOptions: NavigationStackOptions = {
    title: "Template Workout", 
  }
  state = {
    comments: []
  }
  workout: IWorkout = this.props.navigation.getParam("workout", null);

  componentDidMount() {
    const callGetComments = async () => {
      try {
        const comments = await getComments(this.workout.workoutId);
        this.setState({ comments })
      } catch(err) {
        console.log('An error occurred when getting comments', err);
      }
    }
    callGetComments();
  }

  renderComment = ({ item }: { item: IComment }) => (
    <View style={styles.comment}>
      <Text>{item.comment}</Text>
      <Text>{item.commentTimestamp}</Text>
      <Text>Likes: {item.stars}</Text>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.workout.name}</Text>
        <Text>{this.workout.description}</Text>
        <Text>{this.workout.createdBy}</Text>
        <Text>Likes: {this.workout.stars}</Text>
        <Text>Comments: </Text>
        <FlatList
          data={this.state.comments}
          style={styles.commentsList}
          renderItem={this.renderComment}
          keyExtractor={(item: IComment) => item.commentId}
          />
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commentsList: {

  },
  comment: {

  }
});

export default TemplateWorkout;