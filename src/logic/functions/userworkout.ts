import {
  IUserWorkout,
  IUserWorkoutExercise,
} from "../domains/UserWorkout.domain";
import { get, post } from "./core/fetch";
import AppConfig from "../../../AppConfig";

export const createUserWorkout = async (userWorkout: IUserWorkout) => {
  return post(
    `${AppConfig.apiUrl}api/v1/userworkout/create`,
    JSON.stringify(userWorkout)
  );
};

export const updateUserWorkout = async (userWorkout: IUserWorkout) => {
  return post(
    `${AppConfig.apiUrl}api/v1/userworkout/update`,
    JSON.stringify(userWorkout)
  );
};

export const getUserWorkouts = async (
  userId: string,
  isHistoric: boolean = false
): Promise<IUserWorkout[]> => {
  let queryParam = userId ? `?userId=${userId}` : "";
  queryParam += isHistoric && userId ? `&isHistoric=true` : "";
  const result: any = await get(
    `${AppConfig.apiUrl}api/v1/userworkout${queryParam}`
  );
  return result.json();
};

export const getUserWorkoutExercises = async (
  userWorkoutId: string
): Promise<IUserWorkoutExercise[]> => {
  const result: any = await get(
    `${AppConfig.apiUrl}api/v1/userworkout/exercises?userWorkoutId=${userWorkoutId}`
  );
  return result.json();
};
