type Data = { createdAt: string; cost?: number };
type Return = { name: string; value: number };

const useRechart = (arr: Data[], type?: string) => {
  const data = arr?.reduce((acc: Return[], product) => {
    const month = new Date(product?.createdAt).toLocaleString("default", {
      month: "short",
    });

    const existing = acc.find((m: Return) => m.name === month);
    if (existing) {
      existing.value =
        type === "earning"
          ? existing.value + (product.cost || 0)
          : existing.value + +1;
    } else {
      acc.push({
        name: month,
        value: type === "earning" ? product.cost || 0 : 1,
      });
    }

    return acc;
  }, []);

  console.log(data);
  return data;
};

export default useRechart;
