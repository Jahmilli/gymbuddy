import { post, get } from './core/fetch';
import { IWorkout } from '../domains/Workout.domain';

export const getWorkouts = async (userId?: string): Promise<IWorkout> => {
  const queryParam = userId ? `?userId=${userId}` : '';
  const result: any = await get(`http://192.168.0.8:3001/api/v1/workout${queryParam}`);
  return await result.json();
}

export const createWorkout = async (workout: IWorkout) => {
  return await post('http://192.168.0.8:3001/api/v1/workout/create', JSON.stringify(workout));
}