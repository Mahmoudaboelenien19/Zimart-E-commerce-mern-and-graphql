const useChartData = (
  arr: { createdAt: string; cost?: number }[],
  head: string,
  type?: string
) => {
  const dataByMonth = arr?.reduce((acc: any, product) => {
    const month = new Date(product?.createdAt).toLocaleString("default", {
      month: "long",
    });
    acc[month] = (acc[month] || 0) + (type === "earn" ? product.cost : 1);
    return acc;
  }, {});

  const barChartData = {
    labels: Object.keys(dataByMonth || []),
    datasets: [
      {
        label: head,
        data: Object.values(dataByMonth || []),
        backgroundColor: [
          "#FF8A80",
          "#80DEEA",
          "#1877f2",
          "#ff0100",
          "#0ff000",
          "black",
          "darkblue",
          "#FF8A00",
        ],
        borderColor: "white",
        pointBackgroundColor: "white",
        borderWidth: 0.5,
      },
    ],
    plugins: {
      colors: {
        enabled: false,
      },
    },
  };

  return barChartData;
};

export default useChartData;
