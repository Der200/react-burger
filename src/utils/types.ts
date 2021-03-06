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
  key?: number;
}

export type TOrderObject = {
  number: number;
  status: string;
  name: string;
  ingredients: Array<TIngredientObject>;
  price: number;
  createdAt: string;
}

export type TAuthorizationForm = {
  email?: string;
  name?: string;
  password?: string;
  token?: string;
  code?: string;
}

export type TWsOrderObject = {
  ingredients: string[];
  _id: string;
  name: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
}

export type TWsMessageObject = {
  success: boolean;
  total: number;
  totalToday: number;
  orders: Array<TWsOrderObject>
}

export type TSetCookieProps = {
  path?: string;
  expires?: string | number;
} & { 
  [extraAttribute: string]: string | number | boolean;
}

export type TUserData = {
  email: string;
  name: string;
}



export default TIngredientObject ;