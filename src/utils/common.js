export const filterData = (wsOrders, ingredientsArrow) => {
  const templateOrders = [];
  templateOrders.push(wsOrders.map((order) => {
    templateOrders.push({'number': order.number, 
                         'status': order.status, 
                         'name': order.name,
                         'ingredients': order.ingredients.map((ingredient) => ingredientsArrow.filter((baseIngredient) => baseIngredient._id === ingredient)[0]),
                         'price': order.ingredients.map((ingredient) => ingredientsArrow.filter((baseIngredient) => baseIngredient._id === ingredient)[0]).reduce((accum, currentValue) => {return accum + currentValue.price}, 0)
    })
  }))
  templateOrders.pop()
  return templateOrders;
}