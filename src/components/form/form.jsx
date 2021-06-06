import styles from './form.module.css';

const Form = ({children, title, description}) => {
  return (
    <form className={styles.container}>
      {title && <h2 className={styles.title}>{title}</h2>}
      {children}
      {description && <div className={styles.description}>{description}</div>}
    </form>
  )
}

export default Form;