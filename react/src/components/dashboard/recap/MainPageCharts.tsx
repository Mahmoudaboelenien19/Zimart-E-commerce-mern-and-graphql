import LatestOrders from "./LatestOrders";
import InViewAnimation from "@/components/widgets/animation/InViewAnimation";
import clsx from "clsx";
import useRechart from "./useRechartData";
import {
  AreaChart,
  Area,
  XAxis,
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
  Bar,
  BarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from "recharts";
import { Product } from "@/types/product";
import { ReactNode } from "react";

interface Props {
  head: string;
  className?: string;
  children: ReactNode;
}

const ChartParent = ({ head, children, className }: Props) => {
  return (
    <InViewAnimation
      className={clsx("center chart-par col  between", className)}
      once={false}
    >
      <h2 className="header">{head}</h2>

      {children}
    </InViewAnimation>
  );
};

type MainProps = {
  AllProducts: Product[];
  order: [];
  user: { createdAt: string }[];
};
const MainPageCharts = ({ AllProducts, user, order }: MainProps) => {
  const productRechartData = useRechart(AllProducts);
  const EraningData = useRechart(order, "earning");
  const totalOrdersData = useRechart(order);
  const totalusers = useRechart(user);

  return (
    <div className={`dash-main-charts `}>
      <div className="order w-100 ">
        <ChartParent head={"Latest Orders"}>
          <LatestOrders />
        </ChartParent>

        <ChartParent head={"Total Earning per month"} className="eraning">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart width={500} height={400} data={EraningData}>
              <XAxis dataKey="name" />

              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="var(--green)"
                fill="var(--green)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartParent>
      </div>
      <ChartParent head={"added products per month"}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={productRechartData || []} width={320} height={350}>
            <Line
              type="monotone"
              dataKey="value"
              fill="var(--green)"
              stroke="var(--green)"
              fillOpacity={0.6}
              strokeWidth={3}
            />
            <XAxis dataKey={"name"} />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </ChartParent>

      <ChartParent head="total users per month">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={totalusers}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis />
            <Radar
              name="total users"
              dataKey="value"
              stroke="var(--green)"
              fill="var(--green)"
              fillOpacity={0.6}
            />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </ChartParent>
      <ChartParent head="total Orders per month">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={150} height={40} data={totalOrdersData}>
            <Bar dataKey="value" fill="var(--green)" />
            <XAxis dataKey="name" />

            <Tooltip />
          </BarChart>
        </ResponsiveContainer>
      </ChartParent>
    </div>
  );
};

export default MainPageCharts;
