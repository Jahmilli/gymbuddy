import { IExercise } from "../domains/Workout.domain";
import { get } from "./core/fetch";

export const getAllExercisesBySplitType = async (
  splitType: string
): Promise<IExercise[]> => {
  const exercisesRes: any = await get(
    `http://192.168.0.21:3001/api/v1/exercise?splitType=${splitType}`
  );
  return exercisesRes.json();
};
