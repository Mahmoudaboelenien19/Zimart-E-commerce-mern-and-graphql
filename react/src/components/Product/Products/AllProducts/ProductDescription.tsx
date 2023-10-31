interface Props {
  description: string;
}
const ProductDescription = ({ description }: Props) => {
  return (
    <p
      key={description}
      // initial={{
      //   height: 0,
      //   opacity: 0,
      // }}
      // animate={{
      //   height: 70,
      //   opacity: [0, 0.2, 0.5],
      //   transition: { delay: 0.3, duration: 0.3 },
      // }}
    >
      {description}
    </p>
  );
};

export default ProductDescription;
