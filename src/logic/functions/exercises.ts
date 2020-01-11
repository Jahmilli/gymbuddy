import { IExercise } from "../domains/Workout.domain";
import { get } from "./core/fetch";
import AppConfig from "../../../AppConfig";

export const getAllExercisesBySplitType = async (
  splitType: string
): Promise<IExercise[]> => {
  const exercisesRes: any = await get(
    `${AppConfig.apiUrl}api/v1/exercise?splitType=${splitType}`
  );
  return exercisesRes.json();
};
