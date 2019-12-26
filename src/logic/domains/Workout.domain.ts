export interface Workout {
  name: string;
  description: string;
  exercises: WorkoutExercise[];
}

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

export interface Exercise {
  exercise_id: number;
  name: string;
  description: string;
  splitType: SPLIT_TYPE;
  bodyPart: BODY_PART,
}

export interface WorkoutExercise extends Exercise{
  workoutExerciseId: string;
  workoutId: number;
  orderNumber: number;
  sets: Set[];
}

export interface Set {
  repetitions: number;
  restTime: number;
  setNumber: number;
}