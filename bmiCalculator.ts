// bmiCalculator.ts
const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / ((height / 100) * (height / 100));
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal range';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  };
  
  const parseBmiArgs = (args: string[]): { height: number; weight: number } => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    const height = Number(args[2]);
    const weight = Number(args[3]);
  
    if (isNaN(height) || isNaN(weight)) {
      throw new Error('Provided values were not numbers!');
    }
  
    return { height, weight };
  };
  
  if (require.main === module) {
    try {
      const { height, weight } = parseBmiArgs(process.argv);
      console.log(calculateBmi(height, weight));
    } catch (error: unknown) {
      let message = 'Error: ';
      if (error instanceof Error) message += error.message;
      console.log(message);
    }
  }
  
  export { calculateBmi };