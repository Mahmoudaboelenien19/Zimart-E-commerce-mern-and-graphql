import React, { useRef } from "react";
import { useAppSelector } from "../../../custom/reduxTypes";
import { Chart as ChartJS } from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";
import useChartData from "./useChartData";
import { motion, useInView } from "framer-motion";
import { ChildrenInterFace } from "../../../interfaces/general";
import LatestOrders from "./LatestOrders";
import FadeElement from "../../widgets/animation/FadeElement";
interface Props extends ChildrenInterFace {
  head: string;
}
const InViewPar = ({ head, children }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <motion.div
      className={`center chart-par col  between`}
      ref={ref}
      style={{ opacity: 0 }}
      transition={{ delay: 0.05 }}
      whileInView={{ opacity: [0, 0.2, 0.4, 0.6, 1] }}
    >
      <h3 className="header">{head}</h3>

      {inView && (
        <FadeElement cls="" delay={0.2}>
          {children}
        </FadeElement>
      )}
    </motion.div>
  );
};
const MainPageCharts = ({ width }: { width: number }) => {
  const { Allproducts } = useAppSelector((st) => st.Allproducts);
  const { user } = useAppSelector((st) => st.user);

  const { order } = useAppSelector((st) => st.order);
  const productChartData = useChartData(Allproducts, "products");
  const orderChartData = useChartData(order, "Orders");
  const EarningChartData = useChartData(order, "Earnings", "earn");
  const userChartData = useChartData(user, "users");
  ChartJS.register(CategoryScale);

  const options = {
    height: "100%",
    width: "100%",

    scales: {
      x: {
        grid: {
          color: "grey",
        },
      },
      y: {
        grid: {
          color: "grey",
        },
      },
    },
    animations: {
      tension: {
        duration: 1000,
        delay: 400,
        from: 1,
        to: 0,
      },
    },
  };

  return (
    <>
      <div className={`dash-main-charts ${width <= 800 ? "reverse" : ""} `}>
        <InViewPar head="Users Per Time">
          <Line data={userChartData || []} options={options} />
        </InViewPar>
        <InViewPar head="Latest Orders">
          <LatestOrders />
        </InViewPar>
        <InViewPar head="Earnings Per Time">
          <Pie data={orderChartData || []} options={options} />
        </InViewPar>
        <InViewPar head="Orders Per Time">
          <Bar data={EarningChartData || []} options={options} />
        </InViewPar>
        <InViewPar head="Added Products Per Time">
          <Line data={productChartData || []} options={options} />
        </InViewPar>
      </div>
    </>
  );
};

export default MainPageCharts;
