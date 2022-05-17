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
  const [delay, setDelay] = useState(0);
  useEffect(() => {
    const fetchSetting = async () => {
      const data = await getSettingById("setting-banner-slide");
      if (data && data.data && data.data.value) {
        setSettings(data?.data?.value);
      }
    };
    fetchSetting();
  }, []);
  const onDown = () => {
    setDelay(Date.now())
  }
  const onUp = () => {
    setDelay(Date.now() - delay);
  }
  const clickBanner = () => {
    if(delay < 500) {
      
    }
  }
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
                <div className="each-slide h-full" key={index}>
                  <div style={{ height: '100%' }} onMouseDown={() => onDown()} onMouseUp={() => onUp()} onClick={() => clickBanner(img?.url)}>
                  <img src={img?.image} alt="" className="selector w-full object-cover" />
                  </div>
                </div>
              ))}
          </Slide>
        </div>
      )}
    </div>
  );
}

export default Banner;
