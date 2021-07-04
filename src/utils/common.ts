import TIngredientObject, { TWsOrderObject } from "./types";

export const filterData = (wsOrders: Array<TWsOrderObject>, ingredientsArrow: TIngredientObject) : any => {
  const templateOrders = [];
  // @ts-ignore
  templateOrders.push(wsOrders.map((order: TWsOrderObject) => {
    // @ts-ignore
    templateOrders.push({'number': order.number, 'status': order.status, 'name': order.name, 'ingredients': order.ingredients.map((ingredient) => ingredientsArrow.filter((baseIngredient) => baseIngredient._id === ingredient)[0]), 'price': order.ingredients.map((ingredient) => ingredientsArrow.filter((baseIngredient) => baseIngredient._id === ingredient)[0]).reduce((accum, currentValue) => {return accum + currentValue.price}, 0)
    })
  }))
  templateOrders.pop()
  return templateOrders;
}