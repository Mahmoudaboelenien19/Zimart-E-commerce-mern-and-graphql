import useTuple from "./useTuple";

const useCarousel = (index: number) => {
  const { dir } = useTuple(index);
  const variant = {
    start: ({ dir, width }: { dir: string; width: number }) => ({
      x: dir === "increase" ? -width : width,
      opacity: 0,
    }),
    end: {
      x: 0,
      opacity: 1,
      transition: { delay: 0.25, type: "tween", duraion: 0.05 },
    },
    exit: ({ dir, width }: { dir: string; width: number }) => ({
      x: dir === "increase" ? width : -width,
      opacity: 0,
      transition: { type: "tween", duraion: 0.25, delay: 0.05 },
    }),
  };

  return [variant, dir];
};

export default useCarousel;
