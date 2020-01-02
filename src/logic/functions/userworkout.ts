import { post } from './core/fetch';
import { IUserWorkout } from "../domains/UserWorkout.domain";

export const createUserWorkout = async (workout: IUserWorkout) => {
  return await post('http://192.168.0.34:3001/api/v1/userworkout/create', JSON.stringify(workout));
}