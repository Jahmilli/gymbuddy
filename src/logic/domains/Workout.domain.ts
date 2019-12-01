export interface Workout {
  name: string;
  description: string;
  exercises: Exercise[];
}

export interface Exercise {
  name: string;
  description: string;
}