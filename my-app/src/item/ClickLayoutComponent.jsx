import React, { Component ,useState} from "react";
import ClickLayoutCss from "../styles/ClickLayoutCss.css";
import Link from 'next/link';

class ClickLayoutComponent extends Component {
  
  static defaultProps = {
    list: 1,
    title: "제목",
  };

  render() {
    
    
    return (
      <div className="ClickLayout">
        <div className="LayoutContent">
          <div className="Layout">
            <div className="LeftLayout">
                <div className="LeftLayoutItem">
                  <div className="Litem">
                    <p>
                      <Link href="./"><span className="back">&lt;</span></Link>{this.props.title} |{" "}
                      {this.props.list}화
                    </p>
                  </div>
                </div>
            </div>
            <div className="RigthLayout">
              <div className="RightLayoutItem">
                <div className="Ritem">
                <p>
                  <Link href="../"><span className="BackEpisode">&lt;이전화</span></Link>
                  <Link href="../"><span>목록</span></Link>
                  <Link href="../"><span className="NextEpisode">다음화&gt;</span></Link>
                </p>
                </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ClickLayoutComponent;
