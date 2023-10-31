const StyledPrice = ({ price }: { price: number }) => {
  return (
    <span className="price-product center">
      <span>$</span>
      {Math.floor(price)}
      <span className="price-top float">
        {(price - Math.floor(price)).toFixed(2).replace("0.", "")}
      </span>
    </span>
  );
};

export default StyledPrice;
