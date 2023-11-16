interface Props {
  description: string;
}
const ProductDescription = ({ description }: Props) => {
  return <p key={description}>{description}</p>;
};

export default ProductDescription;
