import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import LoginScreen from './src/screens/login/LoginScreen';
import HomeScreen from './src/screens/home/HomeScreen';
import CreateWorkout from "./src/screens/createWorkout/CreateWorkout";

const AppNavigation = createStackNavigator(
  {
    Login: {
      screen: LoginScreen
    },
    Home: {
      screen: HomeScreen
    },
    CreateWorkout: {
      screen: CreateWorkout
    }
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
)

// @ts-ignore
// HomeScreen.navigationOptions = {
//   title: 'Home'
// }

export default createAppContainer(AppNavigation);
