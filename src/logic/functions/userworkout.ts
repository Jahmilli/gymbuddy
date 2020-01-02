import { post, get } from './core/fetch';
import { IUserWorkout } from "../domains/UserWorkout.domain";

export const createUserWorkout = async (workout: IUserWorkout) => {
  return await post('http://192.168.0.8:3001/api/v1/userworkout/create', JSON.stringify(workout));
}

export const getUserWorkouts = async (userId: string): Promise<IUserWorkout[]> => {
  const queryParam = userId ? `?userId=${userId}` : '';
  const result: any = await get(`http://192.168.0.8:3001/api/v1/userworkout${queryParam}`);
  return await result.json();
}
