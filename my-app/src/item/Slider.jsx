import React, { Component } from "react";
import Slider from "react-slick";
import SliderCss from "./SliderCss.css"
export default class SimpleSlider extends Component {
  render() {
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div className="Slider">
        <h2> Single Item</h2>
        <Slider {...settings}>
          <div className="Test">
            1
          </div>
          <div className="Test">
            1
          </div>
          <div className="Test">
            1
          </div>
          <div className="Test">
            1
          </div>
          <div className="Test">
            1
          </div>
          <div className="Test">
            1
          </div>
        </Slider>
      </div>
    );
  }
}