import Link from "next/link";
import styles from "@/src/pages/listpage/styles/ListPageCss.css";
const ListItem = ({ EnName,thumbnail,webtoonName, ep /*uploadDate*/, handleClick }) => {


  return (
    <Link href={`/webtoonpage?EnName=${EnName}&ep=${encodeURIComponent(ep)}`}>
      <div className="ListItem" onClick={handleClick}>
        <div className="ListImg">
          <img src={thumbnail} alt={thumbnail} />
        </div>
        <div className="ListItemContent">
          <p className="Episode">
            {webtoonName} <br />
            <span className="tab">{ep}화</span>
          </p>
          <p className="SU">
            {/* <span className="tab">{uploadDate}</span> */}
          </p>
        </div>
      </div>
      <div className={styles.dn}></div>
    </Link>
  );
};

export default ListItem;
