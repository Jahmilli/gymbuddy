import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack';
import { getWorkouts } from '../../logic/functions/workout';

type Props = {
  navigation: NavigationStackProp<{ userId?: string }>
}

class HomeScreen extends React.Component<Props> {
  static navigationOptions: NavigationStackOptions = {
    title: "Home Screen", 
  }

  componentDidMount() {
    const callGetWorkouts = async () => {
      try {
        const results: any = await getWorkouts();
        const jsonResults = await results.json();
        console.log('workouts are ', jsonResults);
      } catch(err) {
        console.log('An error occurred when getting workouts', err);
      }
    }
    callGetWorkouts();
  }

  render() {
    return (
    <View style={styles.container}>
      <Text>This is the Home Screen</Text>
      <Button
        title="Create Workout"
        onPress={() => this.props.navigation.navigate('CreateWorkout')} 
        // onPress{() => navigation.navigate('Home', { userId: 2, randomKey: 'asdasd' })}
        // onPress={() => navigation.push('Home')}
        // onPress={() => navigation.goBack()} 
      />
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});


export default HomeScreen;