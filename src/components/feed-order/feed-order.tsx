import { FC, MouseEventHandler } from 'react';
import { useHistory, useRouteMatch, Link } from 'react-router-dom';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './feed-order.module.css'

import { TOrderObject } from '../../utils/types';
import { dateDay } from '../../utils/common';

interface IFeedOrder {
  order: TOrderObject;
  status?: string;
  key?: number;
}

const FeedOrder : FC<IFeedOrder> = ({ order }) => {
  const bigOrderImage: string = "https://code.s3.yandex.net/react/code/cheese.png";
  const { ingredients, number, price, name, status, createdAt } = order;

  let remainingOrder: number = ingredients.length - 5;
  
  const history = useHistory()
  const { path } = useRouteMatch()

  const clickHandler: MouseEventHandler = (): void => {
    history.push(path);
    history.replace(`${path}/${order.number}`)
  }

  if (!order) {
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
        <span className="text text_type_digits-default">{`#${number}`}</span>
        <span className="text text_type_main-default text_color_inactive">{dateDay(createdAt)} - GMT+3</span>
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
          {price}
          <CurrencyIcon type="primary" />
        </span>
      </div>
    </section>
  )
}

export default FeedOrder;