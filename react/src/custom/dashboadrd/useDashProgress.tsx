const useDashProgress = (
  arr: { createdAt: string; cost?: number }[],
  type?: string
) => {
  const thisMonth = new Date().getMonth();
  const lastMonth = new Date().getMonth() - 1;

  const lastMonthArr = arr?.filter((obj) => {
    return new Date(obj.createdAt).getMonth() === lastMonth;
  });

  const thisMonthArr = arr?.filter((obj) => {
    return new Date(obj.createdAt).getMonth() === thisMonth;
  });

  const progress =
    ((thisMonthArr?.length - lastMonthArr?.length) /
      (lastMonthArr?.length === 0 ? 1 : lastMonthArr?.length)) *
    100;
  let earningProgress = 0;
  let earnings = 0;
  if (type === "order") {
    const thisMonthEarning = thisMonthArr?.reduce(
      (ac, cur) => ac + cur.cost!,
      0
    );
    const lastMonthEarning = lastMonthArr?.reduce(
      (ac, cur) => ac + cur.cost!,
      0
    );

    earnings = lastMonthEarning + thisMonthEarning;
    earningProgress =
      ((thisMonthEarning - lastMonthEarning) /
        (lastMonthEarning === 0 ? 1 : lastMonthEarning)) *
      100;
  }

  return [progress, earnings, earningProgress];
};

export default useDashProgress;
