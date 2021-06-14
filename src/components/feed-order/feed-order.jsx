import { useHistory, useRouteMatch } from 'react-router-dom'
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './feed-order.module.css'
import { Link } from 'react-router-dom';

const FeedOrder = ({ order, status }) => {
  const bigOrderImage = "https://code.s3.yandex.net/react/code/cheese.png";
  const { ingredients, id, cost, name } = order;

  let remainingOrder = ingredients.length - 5;
  
  const history = useHistory()
  const { path } = useRouteMatch()

  const clickHandler = () => {
    history.replace(`${path}/${order.id}`)
  }

  if (order.length === 0) {
    return (
      <div className={`${styles.container} ${styles.empty} p-6 mt-4`}>
        <div className={`${styles.body} mb-6`}>
          <h3>Наш репликатор готов создать твой заказ! <Link to='/'>Собрать бургер</Link></h3>
        </div>
      </div>
    )
  }

  return (
    <section className={`${styles.container} p-6 mt-4`} onClick={clickHandler}>
      <div className={`${styles.header} mb-6`}>
        <span className="text text_type_digits-default">{`#0${id}`}</span>
        <span className="text text_type_main-default text_color_inactive">Сегодня, 00:00 i-GMT+3</span>
      </div>
      <div className={`mb-6`}>
        {name}
      </div>
      {status === 'canceled'
          ? <span className={`${styles.canceled} text text_type_main-small`}>Отменен</span>
          : status === 'done'
              ? <span className={`${styles.done} text text_type_main-small`}>Выполнен</span>
              : status === 'cooking'
                  ? <span className={`${styles.cooking} text text_type_main-small`}>Готовится</span>
                  : null
      }
      <div className={`${styles.footer} mt-6`}>
        <div className={styles.images}>
          {ingredients.length < 6 && ingredients.map((ingredient, index) => (
            <div className={styles.element} style={{ zIndex: 6 - index, left: `-${25 * (index)}px` }} key={ingredient._id + (Math.random() * (200 - 10) + 10)}>
              <img src={ingredient.image} alt={ingredient.name} />
            </div>
          ))}
          {ingredients.length > 5 && ingredients.slice(0, 5).map((ingredient, index) => (
            <div className={styles.element} style={{ zIndex: 6 - index, left: `-${25 * (index)}px` }} key={ingredient._id + (Math.random() * (200 - 10) + 10)}>
              <img src={ingredient.image} alt={ingredient.name} />
            </div>
          ))}
          {ingredients.length > 5 && (
            <div className={styles.element} style={{ zIndex: 1, left: `-125px` }} key={(Math.random() * (200 - 10) + 10)}>
              <img className={styles.bigOrder__image} src={bigOrderImage} alt={`+${remainingOrder} дополнительны${remainingOrder === 1 ? 'й' : 'х'} ингредиент${remainingOrder === 1 ? '' : remainingOrder > 4 ? 'ов' : 'а'} в заказе`} />
              <span className={styles.bigOrder}>{`+${remainingOrder}`}</span>
            </div>
          )}
        </div>
        <span className={`${styles.total__cost} text text_type_digits-default`}>
          {cost}
          <CurrencyIcon type="primary" />
        </span>
      </div>
    </section>
  )
}

export default FeedOrder;