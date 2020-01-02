import { get } from "./core/fetch"
import { IExercise } from "../domains/Workout.domain";

export const getAllExercisesBySplitType = async (splitType: string): Promise<IExercise[]> => {
  const exercisesRes: any = await get(`http://192.168.0.34:3001/api/v1/exercise?splitType=${splitType}`);
  return await exercisesRes.json();
}
