import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

export function readFile(filePath, fileName) {
  try {
    const data = JSON.parse(
      readFileSync(join(process.cwd(), filePath, fileName))
    );
    return data;
  } catch (error) {
    console.log(error);
    return { error: error.stack };
  }
}

export function writeFile(filePath, fileName, data) {
  try {
    return writeFileSync(
      join(process.cwd(), filePath, fileName),
      JSON.stringify(data, null, 2)
    );
  } catch (error) {
    console.log(error);
    return { error: error.stack };
  }
}
