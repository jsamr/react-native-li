export default function makeAlphanumMaxlenComputer(
  base: number,
  alpha: boolean
) {
  return function alphanumericMaxLenComputer(_min: number, max: number) {
    let remax = max - Number(alpha);
    let digits: number = 1;
    while (remax >= base) {
      remax /= base;
      digits++;
    }
    return digits;
  };
}
