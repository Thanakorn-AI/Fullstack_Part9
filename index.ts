// index.ts
import express, { Request, Response } from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises, ExerciseResult } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req: Request, res: Response) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: Request, res: Response) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight) || !req.query.height || !req.query.weight) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const bmi = calculateBmi(height, weight);
  return res.json({ weight, height, bmi });
});

interface ExerciseRequestBody {
  daily_exercises: number[];
  target: number;
}

app.post('/exercises', (req: Request, res: Response) => {
  // Type the request body
  const { daily_exercises, target } = req.body as ExerciseRequestBody;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  
  const dailyHours: number[] = daily_exercises;
  const targetValue = Number(target);

  if (isNaN(targetValue) || !Array.isArray(dailyHours) || dailyHours.some(h => isNaN(Number(h)))) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const result: ExerciseResult = calculateExercises(dailyHours, targetValue);
  return res.json(result);
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});