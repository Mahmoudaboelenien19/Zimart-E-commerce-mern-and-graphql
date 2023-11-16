const ShowCount = ({ length }: { length: number }) => {
  return (
    <>
      {length >= 1 && (
        <div key={length} className="show-count center">
          {length}
        </div>
      )}
    </>
  );
};

export default ShowCount;
