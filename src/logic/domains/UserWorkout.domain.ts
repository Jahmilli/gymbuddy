import { IExercise, ISet } from "./Workout.domain";

// Contains all the interfaces for the user specific workouts

export interface IUserWorkout {
  userWorkoutId?: string;
  userId: string;
  workoutId: number;
  name: string;
  description: string;
  notes: string;
  exercises: IUserWorkoutExercise[]; // Currently not returning this
  workoutDate: Date;
  startTime?: Date;
  endTime?: Date;
  satisfaction?: number;
}

export interface IUserWorkoutExercise extends IExercise {
  userWorkoutExerciseId?: string;
  userWorkoutId?: string;
  orderNumber: number;
  sets: ISet[];
}
