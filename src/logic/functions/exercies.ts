import { get } from "./core/fetch"

export const getAllExercises = async (payload: string) => {
  console.log('payload is ', payload);
  return await get(`http://192.168.0.7:3001/api/v1/exercise?splitType=${payload}`)
}