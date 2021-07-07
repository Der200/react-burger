import { useRef, FC } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop, DropTargetMonitor} from 'react-dnd';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components/dist/index.js';

import styles from './order-item.module.css';

import { sortingIngredients } from '../../services/redux/order-slice/order-slice';

import  TIngredientObject  from '../../utils/types'

interface IOrderItem {
  ingredient: TIngredientObject;
  position: "top" | "bottom" | undefined;
  isLocked: boolean;
  index: number;
  handleClose?: () => void;
}

const OrderItem : FC<IOrderItem> = ({ingredient, position, index, isLocked, handleClose}) => {
  const dispatch = useDispatch();
  
  const handleDrop =(item, monitor) => {
    if(item.ingredient.type === 'bun') return
    if(item.index !== index) {
      console.log(`'indexFrom:' ${item.index}, 'indexTo:' ${index}`)
      dispatch(sortingIngredients({indexFrom: item.index, indexTo: index}))
    }
  }

  const ref = useRef<HTMLLIElement>(null);

  const [{ isDrag } , drag] = useDrag({
    type: 'orderElement',
    item: {index, ingredient},
    collect(monitor) {
      return {
        isDrag: monitor.isDragging()
      }
    }
  });

  const [, drop] = useDrop({
    accept: 'orderElement',
    hover(item:{index: any, ingredient: TIngredientObject}, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return
      }

      if (item.index === undefined) return
      if (item.ingredient.type === 'bun') return
      const dragIndex = item?.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      
      dispatch(sortingIngredients({indexFrom: item.index, indexTo: index}))
      item.index = hoverIndex
    }
  })

  // const [, drop] = useDrop({
  //   accept: 'orderElement',
  //   drop(item, monitor) {
  //     handleDrop(item, monitor)
  //   },
  // });

  const opacity: number = isDrag ? 0 : 1

  return (
    // @ts-ignore: Unreachable code error
    <li className="text text_type_main-default pb-4" ref={drag(drop(ref))} style={{opacity: opacity}}>
      <section className={styles.section}>
      {ingredient.type === 'bun' ? <span className="pl-6"></span> : <div className={styles.dragicon}><DragIcon type="primary"/></div>}
        <ConstructorElement 
          text={ingredient.name} 
          type={position} 
          thumbnail={ingredient.image} 
          price={ingredient.price} 
          isLocked={isLocked} 
          handleClose={handleClose}
        />
      </section>
    </li> 
  )
}

export default OrderItem;