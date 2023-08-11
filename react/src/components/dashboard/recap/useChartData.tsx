import { useContext } from "react";
import { themeContext } from "../../../context/ThemContext";

const useChartData = (
  arr: { createdAt: string; cost?: number }[],
  head: string,
  type?: string
) => {
  const { theme } = useContext(themeContext);
  const dataByMonth = arr
    .slice(0)
    .reverse()
    ?.reduce((acc: any, product) => {
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
          "#136231",
          "#FF8A80",
          "#1877f2",
          "#0ff099",
          "#FF8A00",
          "black",
        ],
        borderColor: theme === "dark" ? "white" : "black",
        pointBackgroundColor: theme === "dark" ? "white" : "black",
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
