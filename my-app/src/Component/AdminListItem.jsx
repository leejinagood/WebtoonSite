import styles from "../pages/listpage/styles/ListPageCss.module.css";
import style from "./AdminListItem.module.css";
const AdminListItem = ({ thumbnail,webtoonName, ep /*uploadDate*/, handleClick ,handleDelete }) => {

  return (

      <div className={styles.ListItem} onClick={handleClick}>

        <div className={styles.ListImg}>
          
          <img src={thumbnail} alt={thumbnail} />
        </div>
        <div className={styles.ListItemContent}>
          <p className={styles.Episode}>
            {webtoonName} <br />
            <span className={styles.tab}>{ep}화</span>
            <div className={style.addDeleteBTN}>
            <button onClick={handleDelete}>에피소드삭제</button>
            </div>
          </p>

        </div>
      </div>
  );
};

export default AdminListItem;
