import { post, get } from './core/fetch';
import { IWorkout, IComment, IWorkoutExercise } from '../domains/Workout.domain';

export const getWorkouts = async (userId?: string): Promise<IWorkout> => {
  // If user id is not specified we will get all "shared" workouts
  const queryParam = userId ? `?userId=${userId}` : '';
  const result: any = await get(`http://192.168.0.8:3001/api/v1/workout${queryParam}`);
  return await result.json();
}

export const getWorkoutExercises = async (workoutId: number): Promise<IWorkoutExercise[]> => {
  const exercisesRes: any = await get(`http://192.168.0.8:3001/api/v1/workout/exercises?workoutId=${workoutId}`);
  return await exercisesRes.json();
}

export const createWorkout = async (workout: IWorkout) => {
  return await post('http://192.168.0.8:3001/api/v1/workout/create', JSON.stringify(workout));
}


export const getComments = async (workoutId: number): Promise<IComment[]> => {
  const result: any = await get(`http://192.168.0.8:3001/api/v1/workout/comments?workoutId=${workoutId}`);
  return await result.json();
}

export const createComment = async (comment: IComment) => {
  return await post('http://192.168.0.8:3001/api/v1/workout/comments/create', JSON.stringify(comment));
}
