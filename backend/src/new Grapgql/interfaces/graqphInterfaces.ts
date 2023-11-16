export type IdInterface = {
  id: string;
};

export type SkipAndLimit = {
  skip: number;
  limit: number;
};

export type ShopType = {
  input: {
    id: string;
    userId: string;
    target: string;
  };
};
