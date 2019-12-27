// Contains all interfaces for the template workouts

export enum SPLIT_TYPE {
  PUSH = "push",
  PULL = "pull",
  LEGS = "legs"
}

export enum BODY_PART {
  SHOULDERS = "shoulders",
  BICEPS = "biceps",
  TRICEPS = "triceps",
  CHEST = "chest",
  LEGS = "legs",
}
export interface IWorkout {
  workoutId?: string; // This is created when the workout is submitted to the backend
  name: string;
  description: string;
  exercises: IWorkoutExercise[];
  stars: number;
  shared: boolean;
  workoutTimestamp: Date
  createdBy: string;
}

export interface IExercise {
  exerciseId?: number; // This is created when the workout is submitted to the backend
  name: string;
  description: string;
  splitType: SPLIT_TYPE;
  bodyPart: BODY_PART;
  sets: ISet[];
}


export interface IWorkoutExercise extends IExercise {
  workoutExerciseId: string;
  workoutId: number;
  orderNumber: number;
  sets: ISet[];
}

export interface ISet {
  repetitions: number;
  restTime: number;
  setNumber: number;
}