import TIngredientObject, { TWsOrderObject } from "./types";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState, AppDispatch } from "../store";

export const filterData = (wsOrders: Array<TWsOrderObject>, ingredientsArrow: TIngredientObject[]) : any => {
  const templateOrders = [];
  // @ts-ignore
  templateOrders.push(wsOrders.map((order: TWsOrderObject) => {
    // @ts-ignore
    return templateOrders.push({'number': order.number, 'createdAt': order.createdAt, 'status': order.status, 'name': order.name, 'ingredients': order.ingredients.map((ingredient) => ingredientsArrow.filter((baseIngredient) => baseIngredient._id === ingredient)[0]), 'price': order.ingredients.map((ingredient) => ingredientsArrow.filter((baseIngredient) => baseIngredient._id === ingredient)[0]).reduce((accum, currentValue) => {return accum + currentValue.price}, 0)
    })
  }))
  templateOrders.pop()
  return templateOrders;
}

export const dateDay = (orderDate: string) : string => {
  const today = new Date();
  const nowDate: string = `${today.getFullYear()}-${today.getMonth() + 1 < 10
  ? `0${today.getMonth() + 1}`
  : today.getMonth() + 1
  }-${today.getDate() < 10 ? `0${today.getDate()}` : today.getDate()}`

  if (nowDate === orderDate.slice(0, 10)) {
    return `Сегодня, ${orderDate.slice(11, 16)}`
  } else {
    return `${orderDate.slice(0, 10)}, ${orderDate.slice(11, 16)}`
  }
}

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
