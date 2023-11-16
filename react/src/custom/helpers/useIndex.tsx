const useIndex = () => {
  const convertNegativeToZero = (num: number, arrLen: number) => {
    if (num < 0) {
      return arrLen - 1;
    } else if (num > arrLen - 1) {
      return 0;
    } else {
      return num;
    }
  };
  return [convertNegativeToZero];
};

export default useIndex;
