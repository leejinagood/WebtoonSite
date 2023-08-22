import Link from "next/link";
import styles from "../pages/listpage/styles/ListPageCss.module.css";
const ListItem = ({ ID,EnName,thumbnail,webtoonName, ep , handleClick }) => {

  return (
    <Link href={`/webtoonpage?EnName=${EnName}&ID=${ID}&ep=${encodeURIComponent(ep)}`}>
      <div className={styles.ListItem} onClick={handleClick}>
        <div className={styles.ListImg}>
          <img src={thumbnail} alt={thumbnail} />
        </div>
        <div className={styles.ListItemContent}>
          <p className={styles.Episode}>
            {webtoonName} <br />
            <span className={styles.tab}>{ep}화</span>
          </p>
          <p className={styles.SU}>
            {/* <span className="tab">{uploadDate}</span> */}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ListItem;
