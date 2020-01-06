import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import LoginScreen from "./src/screens/login/LoginScreen";
import HomeScreen from "./src/screens/home/HomeScreen";
import CreateWorkout from "./src/screens/CreateWorkout/CreateWorkout";
import AddExerciseType from "./src/screens/AddExerciseType/AddExerciseType";
import AddExercise from "./src/screens/AddExercise/AddExercise";
import AddExerciseInfo from "./src/screens/AddExerciseInfo/AddExerciseInfo";
import TemplateWorkout from "./src/screens/TemplateWorkout/TemplateWorkout";
import SharedWorkouts from "./src/screens/SharedWorkouts/SharedWorkouts";
import UserWorkout from "./src/screens/UserWorkout/UserWorkout";
import InProgressWorkout from "./src/screens/InProgressWorkout/InProgressWorkout";
import WorkoutHistory from "./src/screens/WorkoutHistory/WorkoutHistory";

const AppNavigation = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
    },
    Home: {
      screen: HomeScreen,
    },
    CreateWorkout: {
      screen: CreateWorkout,
    },
    AddExerciseType: {
      screen: AddExerciseType,
    },
    AddExercise: {
      screen: AddExercise,
    },
    AddExerciseInfo: {
      screen: AddExerciseInfo,
    },
    TemplateWorkout: {
      screen: TemplateWorkout,
    },
    SharedWorkouts: {
      screen: SharedWorkouts,
    },
    UserWorkout: {
      screen: UserWorkout,
    },
    InProgressWorkout: {
      screen: InProgressWorkout,
    },
    WorkoutHistory: {
      screen: WorkoutHistory,
    },
  },
  {
    initialRouteName: "Login",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#f4511e",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    },
  }
);

export default createAppContainer(AppNavigation);
