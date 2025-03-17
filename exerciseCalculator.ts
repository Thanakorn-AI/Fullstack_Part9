// exerciseCalculator.ts
export interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyHours: number[], target: number): ExerciseResult => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(hours => hours > 0).length;
  const average = dailyHours.reduce((sum, hours) => sum + hours, 0) / periodLength;
  const success = average >= target;
  let rating: number;
  let ratingDescription: string;

  if (average < target * 0.5) {
    rating = 1;
    ratingDescription = 'bad';
  } else if (average < target) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 3;
    ratingDescription = 'great job!';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const parseExerciseArgs = (args: string[]): { dailyHours: number[]; target: number } => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const target = Number(args[2]);
  const dailyHours = args.slice(3).map(Number);

  if (isNaN(target) || dailyHours.some(isNaN)) {
    throw new Error('Provided values were not numbers!');
  }

  return { dailyHours, target };
};

if (require.main === module) {
  try {
    const { dailyHours, target } = parseExerciseArgs(process.argv);
    console.log(calculateExercises(dailyHours, target));
  } catch (error: unknown) {
    let message = 'Error: ';
    if (error instanceof Error) message += error.message;
    console.log(message);
  }
}

export { calculateExercises };