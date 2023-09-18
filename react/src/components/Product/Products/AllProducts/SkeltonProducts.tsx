import { viewContext } from "@/context/gridView";
import useIsMobile from "@/custom/useIsMobile";
import useParams from "@/custom/useParams";
import { motion } from "framer-motion";
import React, { useContext } from "react";
import useMeasure from "react-use-measure";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeltonProducts = () => {
  const { gridView } = useContext(viewContext);

  const { getParam } = useParams();
  const showAsideFilter = getParam("showAsideFilter");
  const [sectionRef, { width: sectionWidth }] = useMeasure();

  return (
    <>
      {Array.from({ length: 12 }).map((_, index) => (
        <section
          key={index}
          ref={sectionRef}
          className={`product-List center ${
            gridView ? "grid col" : "list between "
          }`}
          style={{
            opacity: 0.3,
            height:
              sectionWidth <= 400 && !gridView && showAsideFilter
                ? 200
                : !gridView
                ? 320
                : 380,
          }}
        >
          {/* <Skeleton count={1}  />

            <div className="center col product-data">
              <Skeleton count={2} />

              <>
                {!gridView && sectionWidth >= 400 && (
                  <Skeleton count={3} width={"100%"} />
                )}
              </>

              <Skeleton
                count={1}
                className="product-rate-filter center "
                width={"100%"}
                height={20}
                baseColor="green"
              />
            </div> */}

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
        </section>
      ))}
    </>
  );
};

export default SkeltonProducts;
