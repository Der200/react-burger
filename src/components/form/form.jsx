import styles from './form.module.css';

const Form = ({children, title, description}) => {
  return (
    <form className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      {children}
      <div className={styles.description}>{description}</div>
    </form>
  )
}

export default Form;