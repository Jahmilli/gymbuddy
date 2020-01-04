import { post, get } from './core/fetch';
import { IUserWorkout, IUserWorkoutExercise } from "../domains/UserWorkout.domain";

export const createUserWorkout = async (userWorkout: IUserWorkout) => {
  return await post('http://192.168.0.21:3001/api/v1/userworkout/create', JSON.stringify(userWorkout));
}

export const updateUserWorkout = async (userWorkout: IUserWorkout) => {
  return await post('http://192.168.0.21:3001/api/v1/userworkout/update', JSON.stringify(userWorkout));
}

export const getUserWorkouts = async (userId: string): Promise<IUserWorkout[]> => {
  const queryParam = userId ? `?userId=${userId}` : '';
  const result: any = await get(`http://192.168.0.21:3001/api/v1/userworkout${queryParam}`);
  return await result.json();
}

export const getUserWorkoutExercises = async (userWorkoutId: string): Promise<IUserWorkoutExercise[]> => {
  const result: any = await get(`http://192.168.0.21:3001/api/v1/userworkout/exercises?userWorkoutId=${userWorkoutId}`);
  return await result.json();
}
