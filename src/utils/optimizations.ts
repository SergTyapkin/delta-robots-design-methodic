export {}
// function getDiff(foo: (...args: number[]) => number, args: number[], isInvert = false): number[] {
//   const TOLERANCE = 0.01;
//   // console.log("DIFF", "START")
//   const curVal = foo(...args);
//   const res: number[] = [];
//   args.forEach((arg, i) => {
//     // console.log("DIFF", i)
//     const argsCopy = args.concat();
//     argsCopy[i] = arg + TOLERANCE;
//     res.push((foo(...argsCopy) - curVal) / TOLERANCE * (isInvert ? 1 : -1));
//   });
//   return res;
// }
//
// function len(vector: number[]): number {
//   let length = 0;
//   vector.forEach(arg => {
//     length += arg * arg;
//   })
//   return Math.sqrt(length);
// }
//
// function norm(vector: number[]): number[] {
//   const length = len(vector);
//   return vector.map(arg => arg / length);
// }
//
// export function gradientMin(foo: (...args: number[]) => number, startArgsVal: number[], isFindMax = false, onIterationCallback: (i: number, maxIterations: number) => unknown = () => {}): Promise<number[] | null> {
//   const TOLERANCE = 0.1;
//   const MAX_ITERATIONS = 1000;
//   let curArgsVal = startArgsVal.concat();
//   let iteration = 0;
//   let prevRes = NaN;
//   let curRes = foo(...curArgsVal);
//   let displacementFactor = 10;
//   const decreaseDisplacementFactor = 0.7;
//   let prevDisplacement = NaN;
//   let curDisplacement = Infinity;
//   console.log("| FUNCTION:", curRes)
//   console.log("| ARGS", curArgsVal)
//
//   let resolvePromise: (_: number[] | null) => void;
//   const promise = new Promise<number[] | null>((resolve) => {resolvePromise = resolve});
//
//   function doIteration() {
//     const diff = getDiff(foo, curArgsVal, isFindMax);
//     const normDiff = norm(diff);
//     curArgsVal = curArgsVal.map((arg, i) => arg + displacementFactor * normDiff[i])
//
//     prevRes = curRes;
//     curRes = foo(...curArgsVal);
//     prevDisplacement = curDisplacement;
//     curDisplacement = curRes - prevRes;
//     console.log("IT", iteration)
//     console.log("| FUNCTION:", curRes)
//     console.log("| GRAD:", diff, normDiff, displacementFactor)
//     console.log("| DISPLACEMENT", curDisplacement)
//     console.log("| ARGS", curArgsVal)
//     if (Math.abs(curDisplacement) < 0.3 * displacementFactor * len(diff) || Math.abs(prevDisplacement) / Math.abs(prevDisplacement) < 1.1) {
//       displacementFactor *= decreaseDisplacementFactor;
//     } else if (Math.abs(curDisplacement) > 1/0.3 * displacementFactor * len(diff) || Math.abs(prevDisplacement) / Math.abs(prevDisplacement) > 0.6) {
//       displacementFactor /= decreaseDisplacementFactor;
//     }
//     iteration++;
//
//     if (iteration >= MAX_ITERATIONS) {
//       resolvePromise(null);
//       return;
//     }
//     if (Math.abs(curDisplacement) < TOLERANCE) {
//       resolvePromise(curArgsVal);
//       return;
//     }
//     onIterationCallback(iteration, MAX_ITERATIONS);
//     setTimeout(doIteration, 0); // unblocking calculations
//   }
//   setTimeout(doIteration, 0); // unblocking calculations
//
//   return promise;
// }
