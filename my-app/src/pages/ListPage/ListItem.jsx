import React from "react";
import Link from 'next/link';

class ListItem extends React.Component {
  render() {
    const { webtoonName, uploadDate } = this.props;

    return (
      <Link href="/WebToonPage/WebToonPage">
        <div className="ListItem">
          <div className="ListImg">
            <img src="1.jpg" alt="s" />
          </div>
          <div className="ListItemContent">
            <p className="Episode">
              {webtoonName} <br />
              <span className="tab">{this.props.title}</span>
            </p>
            <p className="SU">
              <span className="tab">{uploadDate}</span>
            </p>
          </div>
        </div>
      </Link>
    );
  }
}

export default ListItem;
