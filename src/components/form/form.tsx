import { FC } from 'react';

import styles from './form.module.css';

interface IForm {
  title?: string;
  submitHandler: (e: any) => void;
}

const Form : FC<IForm> = ({children, title, submitHandler}) => {
  return (
    <form className={styles.container} onSubmit={submitHandler}>
      {title && <h2 className={styles.title}>{title}</h2>}
      {children}
    </form>
  )
}

export default Form;