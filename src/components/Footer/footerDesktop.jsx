import React,{useEffect,useState} from 'react'
import {AllSetting,getSettingById} from 'api/settingApi'
import Momo from '../../assets/images/momo.png'
import Cod from '../../assets/images/cod.png'



function FooterDesktop() {
  const [phone,setphone]=useState({});
  const [address,setadress]=useState({});
  const [email,setemail]= useState({});
    useEffect(() => {
        const fetchSetting = async () => {
          const data = await getSettingById('setting-phone');
              if(data&&data.data)
                setphone(data.data);
        };
        fetchSetting();
      }, []);
      useEffect(() => {
        const fetchSetting = async () => {
          const data1 = await getSettingById('setting-address');
          if(data1&&data1.data)
                setadress(data1.data)
        };
        fetchSetting();
      }, []);
      useEffect(() => {
        const fetchSetting = async () => {
          const data2 = await getSettingById('setting-email');
          if(data2&&data2.data)
           setemail(data2.data)

        };
        fetchSetting();
      }, []);
      


    return (
            <div className="flex bg-gray-800 px-6 lg:p-20 lg:space-x-6 justify-center flex-col lg:flex-row py-6" style={{width: "100%"}}>
                <div className="container" style={{display: "flex", justifyContent: "space-between", flexWrap: "wrap"}}>
                  <div className="flex flex-col text-white space-y-2 lg:space-y-4" style={{marginBottom: "20px"}}>
                    <div className="text-lg text-yellow-400">
                        Liên hệ
                    </div>
                    <div className="flex space-x-2 items-center">
                      <i className="fas fa-paper-plane"></i>

                      <p>{address && address.value ? address.value : ""}</p>
                    </div>
                    <div className="flex space-x-2 items-center">
                    <i className="fas fa-phone-alt"></i>
                      <p>{phone && phone.value ? phone.value : ""}</p>
                    </div>  
                    <div className="flex space-x-2 items-center">
                    <i className="fas fa-envelope"></i>
                      <p>{email && email.value ? email.value : ""}</p>

                    </div>


                    <div className="flex space-x-2">
                        <div className="bg-black hover:bg-yellow-400 w-10 h-10 flex items-center justify-center rounded-full">
                            <i className="fab fa-facebook-f"></i>
                        </div>
                        <div className="bg-black hover:bg-yellow-400 w-10 h-10 flex items-center justify-center rounded-full">
                          <i className="fab fa-twitter"></i>
                        </div>
                        <div className="bg-black hover:bg-yellow-400 w-10 h-10 flex items-center justify-center rounded-full">
                            <i className="fab fa-youtube"></i>
                        </div>
                        <div className="bg-black hover:bg-yellow-400 w-10 h-10 flex items-center justify-center rounded-full">
                            <i className="fab fa-pinterest"></i>
                        </div>

                    </div>
                  </div>
                  <div className="flex flex-col text-white space-y-4" style={{marginBottom: "20px"}}>
                    <div className="text-lg text-yellow-400">
                        Thông tin
                    </div>
                    <div className="flex space-x-2 items-center">
                    <a href='/contacts#ve-trang-web' className='text-white'>Về trang web</a>
                    </div>
                    <div className="flex space-x-2 items-center">
                      <a href='/contacts#thong-tin-van-chuyen' className='text-white'>Thông tin vận chuyện</a>
                    </div>
                    <div className="flex space-x-2 items-center">
                    <a href='/contacts#dieu-khoan-hoan-tra' className='text-white'>Điều khoản hoàn trả</a>
                    </div>
                    
                  </div>
                  <div className="flex flex-col text-white space-y-4" style={{marginBottom: "20px"}}>
                    <div className="text-lg text-yellow-400">
                        Dịch vụ
                    </div>
                    <div className="flex space-x-2 items-center">
                    <a href='/contacts#thuong-hieu' className='text-white'>Thương hiệu</a>

                    </div>
                    <div className="flex space-x-2 items-center">
                    
                    <a href='/contacts#qua-tang' className='text-white'>Qùa tặng</a>
                    </div>
      
                    
                  </div>

                    <div className="flex flex-col text-white space-y-4" style={{marginBottom: "20px"}}>
                      <div className="text-lg text-yellow-400">
                          Thanh toán
                      </div>
                      <div className="flex space-x-2 items-center">
                        <img src={Momo} style={{width:"40px", height:"40px"}} alt="#"/>
                        
                         <img src={Cod} style={{ height:"80px"}} alt="#"></img>
                        
                      </div>
                        
                        
                    </div>
                </div>
           
            </div>
    );
}

export default FooterDesktop;
