import CounterStyle from '../CounterStyle';
import makeAlphanumMaxlenComputer from '../makeAlphanumMaxlenComputer';

// Default implementation is faster than invoking CounterStyle.numeric
const decimal = CounterStyle.raw((index) => index.toString())
  .withMaxLengthComputer(makeAlphanumMaxlenComputer(10, false))
  .withNegative('-');

export default decimal;
