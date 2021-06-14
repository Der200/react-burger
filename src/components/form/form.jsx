import styles from './form.module.css';

const Form = ({children, title, description, submitHandler}) => {
  return (
    <form className={styles.container} onSubmit={submitHandler}>
      {title && <h2 className={styles.title}>{title}</h2>}
      {children}
      {description && <div className={styles.description}>{description}</div>}
    </form>
  )
}

export default Form;