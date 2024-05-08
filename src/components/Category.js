import styles from './Category.module.scss';
import { useReducer } from 'react';

export default function Category(props) {
  const { title, data, handler } = props;
  console.log('Props:', props);

  const returnSelection = item => {
    handler({ type: item.target.parentNode.id, payload: item.target.innerText });
  };

  return (
    <ul className={styles['ul']} id={title}>
      {data.length > 1 &&
        data.map((choice, index) => (
          <button className={styles['ul__button']} key={index} onClick={returnSelection}>
            {choice}
          </button>
        ))}
    </ul>
  );
}
