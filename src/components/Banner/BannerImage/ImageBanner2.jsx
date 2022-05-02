import React, { useEffect, useState } from "react";
import { AllSetting, getSettingById } from "api/settingApi";
import { Link } from "react-router-dom";
function ImageBanner2() {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    const fetchSetting = async () => {
      const data = await getSettingById("setting-banner-home-3");
      if (data && data.data && data.data.value) setSettings(data.data.value);
    };
    fetchSetting();
  }, []);

  return (
    <div>
      {settings && settings.image && (
        <div className=" py-8  grid grid-cols-1 item-center justify-center  overflow-hidden">
          <img
            className="px-4 2xl:px-0 mx-auto relative transform hover:scale-105 transition-transform duration-1000 w-full"
            src={settings.image}
          />
          <div className="float-right absolute right-28 my-10  sm:right-32 sm:my-12 md:right-44 md:my-16  lg:right-72 lg:my-28 xl:right-72 xl:my-28 2xl:right-1/4 space-y-4">
            <p className=" lg:text-xl text-white xl:text-2xl text-center">
              {settings.text}
            </p>
            <div className="item-center justify-center mx-auto ">
              <Link
                to={settings?.url}
                className="blog-read btn bg-yellow-500"
                title="Read More"
              >
                Mua ngay
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageBanner2;
