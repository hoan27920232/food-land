import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Slide } from "react-slideshow-image";
// import Images from '../../constants/images.js'
import SlideBanner from "../Button/SliceBanner.jsx";
//import Images from 'constants/images.js';
import { AllSetting, getSettingById } from "api/settingApi";
Banner.propTypes = {
  listBanner: PropTypes.func,
};
Banner.defaultProps = {
  listBanner: [],
};
function Banner(props) {
  const slideRef = useRef();
  const properties = {
    arrows: false,
    transitionDuration: 300,
  };
  const pre = () => {
    slideRef.current.goBack();
  };
  const next = () => {
    slideRef.current.goNext();
  };

  const [settings, setSettings] = useState([]);

  useEffect(() => {
    const fetchSetting = async () => {
      const data = await getSettingById("setting-banner-slide");
      if (data && data.data && data.data.value) {
        setSettings(data?.data?.value);
      }
    };
    fetchSetting();
  }, []);

  return (
    <div className="relative">
      {settings && settings.length && (
        <div>
          <SlideBanner right={true} onClickArrow={pre} />
          <SlideBanner right={false} onClickArrow={next} />
          <Slide ref={slideRef} {...properties}>
            {settings &&
              settings.length &&
              settings.map((img, index) => (
                <div className="each-slide" key={index}>
                  <img src={img?.image} alt="" className="selector w-full object-cover" />
                </div>
              ))}
          </Slide>
        </div>
      )}
    </div>
  );
}

export default Banner;
