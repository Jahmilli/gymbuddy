import { post, get } from './core/fetch';
import { IWorkout } from '../domains/Workout.domain';

export const getWorkouts = async () => {
  return await get('http://192.168.0.8:3001/api/v1/workout');
}
export const createWorkout = async (workout: IWorkout) => {
  return await post('http://192.168.0.8:3001/api/v1/workout/create', JSON.stringify(workout))
}