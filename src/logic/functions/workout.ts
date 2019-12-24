import { post } from './core/fetch';
import { Workout } from '../domains/Workout.domain';

export const createWorkout = async (workout: Workout) => {
  return await post('http://192.168.0.7:3001/api/v1/workout/create', JSON.stringify(workout))
}