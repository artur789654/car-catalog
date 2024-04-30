import styles from './Pag.module.css';

export default function Pag({ activePage, changePage, pag }) {
  return pag.length > 1 ? (
    <div className={styles.pag} key='d2'>
      {pag.map((item) => (
        <span
          onClick={() => changePage(item)}
          className={`${activePage === item ? styles.active : null}`}
          key={item}
        >
          {item}
        </span>
      ))}
    </div>
  ) : null;
}
