import React,{useEffect,useState} from 'react'

import {AllSetting,getSettingById} from 'api/settingApi'
import { Link } from 'react-router-dom';



function ImageBanner() {
    const [settings, setSettings] = useState({});
    const [setting2, setSetting2] = useState({});
    
    useEffect(() => {
        const fetchSetting = async () => {
          const data = await getSettingById('setting-banner-home-1');
          if(data && data.data && data.data.value)
          setSettings(data.data.value);
        };
        fetchSetting();
      },[]);

      
    
    useEffect(() => {
        const fetchSetting = async () => {
          const data = await getSettingById('setting-banner-home-2');
          if(data && data.data && data.data.value)
          setSetting2(data.data.value);

        };
        fetchSetting();
      },[]);
      
    






    return (
        
        <div className="md:grid py-6 grid-cols-2 lg:grid-flow-row items-center mx-auto xl:flex flex-row item-center justify-center ">
            {
              settings && settings.image && (
                <div className="  grid grid-cols-1  justify-center  overflow-hidden m-4">
                
                <img className="mx-auto transform hover:scale-105 transition-transform duration-1000" src={settings?.image}/>
                <div className="mx-3 my-2 md:mx-3 md:my-3 sm:mx-12 sm:my-4  absolute xl:mx-8  xl:my-14 2xl:mx-16 2xl:my-12 space-y-4">
                    <div className=" lg:text-xl text-white xl:text-2xl">{settings?.text}</div>
                    <div>
                      <Link to={settings?.url} className="blog-read btn bg-yellow-500" title="Read More">Mua ngay</Link>
                    </div>
                </div>

            </div>
              )
            }
          {
            setting2 && setting2.image && (
              <div className=" grid grid-cols-1 justify-center  overflow-hidden  m-4">
                
              <img className="mx-auto  transform hover:scale-105 transition-transform duration-1000" src={setting2?.image}/>
              <div className=" mx-3 my-2 md:mx-3 md:my-3 sm:mx-12 sm:my-4  absolute xl:mx-8 xl:my-14  2xl:mx-16 2xl:my-12 space-y-4">
                  <div className=" lg:text-xl text-white xl:text-2xl">{setting2?.text}</div>
                  <div>
                    <Link to={setting2?.url} className="blog-read btn bg-yellow-500" title="Read More">Mua ngay</Link>
                  </div>
              </div>
          </div>
            )
          }
        </div>
    )
}

export default ImageBanner
