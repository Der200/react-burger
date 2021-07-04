type TIngredientObject = {
  _id: string;
  type: string;
  name: string;
  image: string;
  price: number;
  calories: number;
  carbohydrates: number;
  fat: number;
  proteins: number;
  image_large: string;
  image_mobile: string;
  __v: number;
}

export type TOrderObject = {
  number: number;
  status: string;
  name: string;
  ingredients: Array<TIngredientObject>;
  price: number;
}

export default TIngredientObject ;