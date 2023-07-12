import { updateTaskSchema } from './schemas.js';

export function parseTaskBody(body) {
  try {
    return updateTaskSchema.parse(body);
  } catch (error) {
    return error;
  }
}
