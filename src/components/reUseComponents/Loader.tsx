import React from 'react';
import './Loader.scss'; // предположим, что ваши стили находятся в этом файле

const Loader = () => (
  <div className="loader">
    <div className="loader_overlay"></div>
    <div className="loader_cogs">
      <div className="loader_cogs__top">
        <div className="top_part"></div>
        <div className="top_part"></div>
        <div className="top_part"></div>
        <div className="top_hole"></div>
      </div>
      <div className="loader_cogs__left">
        <div className="left_part"></div>
        <div className="left_part"></div>
        <div className="left_part"></div>
        <div className="left_hole"></div>
      </div>
      <div className="loader_cogs__bottom">
        <div className="bottom_part"></div>
        <div className="bottom_part"></div>
        <div className="bottom_part"></div>
        <div className="bottom_hole"></div>
      </div>
    </div>
  </div>
);

export default Loader;
