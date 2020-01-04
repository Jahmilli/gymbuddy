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
  workoutId?: number; // This is created when the workout is submitted to the backend
  name: string;
  description: string;
  exercises?: IWorkoutExercise[];
  ratings?: IRating[];
  shared: boolean;
  workoutTimestamp: Date;
  createdBy: string;
}

export interface IComment {
  commentId?: string;
  workoutId: number;
  comment: string;
  ratings: IRating[];
  replyTo: string;
  userId: string;
  commentTimestamp: Date;
}

export interface IRating {
  ratingId?: string;
  commentId: string | null;
  workoutId: number | null;
  userId: string;
  ratingTimestamp: Date;
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
  workoutExerciseId?: string;
  workoutId?: number;
  orderNumber: number;
  sets: ISet[];
}

export interface ISet {
  repetitions: number;
  restTime: number;
  setNumber: number;
  actualRestTime?: number;
  weight?: number;
  weightUnit?: WEIGHT_UNIT;
}

export enum WEIGHT_UNIT {
  KILOGRAM = 'kg',
  POUND = 'lb'
}
