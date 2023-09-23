import { viewContext } from "@/context/gridView";
import useParams from "@/custom/useParams";
import React, { Fragment, useContext } from "react";
import useMeasure from "react-use-measure";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";

const SkeltonProducts = () => {
  const { gridView } = useContext(viewContext);
  const { getParam } = useParams();
  const showAsideFilter = getParam("showAsideFilter");
  const [sectionRef, { width: sectionWidth }] = useMeasure();

  return (
    <>
      {Array.from({ length: 12 }).map((_, index) => (
        <motion.section
          key={index}
          ref={sectionRef}
          className={`product-List center ${
            gridView ? "grid col" : "list between "
          }`}
          animate={{
            opacity: 0.3,
            height:
              sectionWidth <= 400 && !gridView && showAsideFilter
                ? 200
                : !gridView
                ? 320
                : 380,
          }}
        >
          <div className={` img-par center ${gridView ? "grid" : "list"}`}>
            <Skeleton
              circle
              count={1}
              baseColor="green"
              style={{ height: 150, width: 150 }}
            />
          </div>
          <div className="center col product-data">
            <div className="center">
              <Skeleton width={100} height={20} />
            </div>
            <p
              style={{
                padding: "0 20px",
                overflow: "initial",
              }}
            >
              <Skeleton
                count={gridView ? 3 : 6}
                style={{ marginTop: 5 }}
                height={15}
              />
            </p>
            <div className="product-links center  w-100">
              <Skeleton width={200} height={40} />
            </div>
          </div>
        </motion.section>
      ))}
    </>
  );
};

export default SkeltonProducts;
