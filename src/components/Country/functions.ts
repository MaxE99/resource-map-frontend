const formatNumberWithSuffix = (num: number): string => {
  if (isNaN(Number(num)) || Number(num) === 0) {
    return "No Data found!";
  }
  if (num >= 1e12) {
    return (num / 1e12).toFixed(2) + " T.";
  } else if (num >= 1e9) {
    return (num / 1e9).toFixed(2) + " B.";
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(2) + " M.";
  } else {
    return num.toFixed(2);
  }
};

export { formatNumberWithSuffix };
