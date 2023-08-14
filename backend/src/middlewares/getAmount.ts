interface orderInterface {
  price: number;
  count: number;
}
export const getAmount = (ar: orderInterface[]) =>
  ar.reduce((acc: number, cur: any) => acc + cur.price * cur.count, 0) * 100;
