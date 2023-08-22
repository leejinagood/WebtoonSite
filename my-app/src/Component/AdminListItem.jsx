import styles from "../pages/listpage/styles/ListPageCss.module.css";
import style from "./AdminListItem.module.css";
const AdminListItem = ({ thumbnail,webtoonName, ep /*uploadDate*/, handleClick ,handleDelete }) => {

  return (

      <div id={style.lit} className={styles.ListItem} onClick={handleClick}>

        <div className={styles.ListImg}>
          
          <img src={thumbnail} alt={thumbnail} />
        </div>
        <div id={style.H}className={styles.ListItemContent}>
          <p className={styles.Episode} id={style.Aep}>
            {webtoonName} <br />
            <span className={styles.tab}>{ep}화</span>
            <button onClick={handleDelete}>에피소드삭제</button>
          </p>

        </div>
      </div>
  );
};

export default AdminListItem;
