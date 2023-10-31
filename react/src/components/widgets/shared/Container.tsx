import clsx from "clsx";
import { HTMLAttributes, ReactNode } from "react";

type Props = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const Container = ({ children, className, ...props }: Props) => {
  return (
    <div {...props} className={clsx("container center", className)}>
      {children}
    </div>
  );
};

export default Container;
