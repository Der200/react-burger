import { FC } from 'react';

import styles from './form.module.css';

interface IForm {
  title?: string;
  description?: () => JSX.Element;
  submitHandler: (e: any) => void;
}

const Form : FC<IForm> = ({children, title, description, submitHandler}) => {
  return (
    <form className={styles.container} onSubmit={submitHandler}>
      {title && <h2 className={styles.title}>{title}</h2>}
      {children}
      {description && <div className={styles.description}>{description}</div>}
    </form>
  )
}

export default Form;