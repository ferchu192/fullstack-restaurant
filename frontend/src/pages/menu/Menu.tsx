export interface Menu {
  name: string,
  description: string,
  price: number,
  type: string,
  image: string,
  ingredients: string[],
  isVegan: boolean,
  isCeliac: boolean,
  _id: string,
};