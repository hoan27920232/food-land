import React from 'react'
import Image1 from 'assets/images/vanchuyen.png'
import Image2 from 'assets/images/money.png'
import Image3 from 'assets/images/gift.png'
import Image4 from 'assets/images/help.png'
import '../../assets/styles/Flipcard.css'

function CardService() {
    return (
        <div className="bg-white ">
            <div className="md:grid grid-cols-2 lg:flex flex-row item-center justify-center">
                <div className=" grid grid-cols-1 item-center justify-center m-11">
                    <div className="mx-auto item-center justify-center my-3">
                              <div className="flip-card">
                              <div className="flip-card-inner">
                                  <div className="flip-card-front">
                                  <img src={Image1} alt="#" className="rounded-full" />
                                  </div>
                                  <div className="flip-card-back">
                                  <img src={Image1} alt="#"className="rounded-full"/>
                                  </div>
                              </div>
                              </div>
                    </div>
                    <p className="text-xl hover:text-yellow-400 text-center">Hỗ trợ giao hàng</p>
                    <p className="text-gray-400 text-center">Giao hàng mọi tỉnh thành Việt Nam</p>
                </div>


                <div className="grid grid-cols-1 item-center justify-center m-11">
                    <div className="mx-auto item-center justify-center my-3">
                              <div className="flip-card">
                              <div className="flip-card-inner">
                                  <div className="flip-card-front">
                                  <img src={Image2} alt="#" className="rounded-full" />
                                  </div>
                                  <div className="flip-card-back">
                                  <img src={Image2} alt="#" className="rounded-full" />
                                  </div>
                              </div>
                              </div>
                    </div>
                    <p className="text-xl hover:text-yellow-400 text-center">Hoàn trả nếu có lỗi</p>
                    <p className="text-gray-400 text-center">100% hoàn trả nếu hàng hóa có vấn đề</p>
                </div>


                <div className="grid grid-cols-1 item-center justify-center m-11">
                    <div className="mx-auto item-center justify-center my-3">
                              <div className="flip-card">
                              <div className="flip-card-inner">
                                  <div className="flip-card-front">
                                  <img src={Image3} alt="#" className="rounded-full"/>
                                  </div>
                                  <div className="flip-card-back">
                                  <img src={Image3} alt="#"className="rounded-full" />
                                  </div>
                              </div>
                              </div>
                    </div>
                    <p className="text-xl hover:text-yellow-400 text-center">Qùa tặng kèm</p>
                    <p className="text-gray-400 text-center">Được tặng kèm quà khi mua hàng</p>
                </div>


                <div className="grid grid-cols-1  justify-center m-11">
                    <div className="mx-auto item-center justify-center my-3">
                              <div className="flip-card">
                              <div className="flip-card-inner">
                                  <div className="flip-card-front">
                                  <img src={Image4} alt="#"className="rounded-full" />
                                  </div>
                                  <div className="flip-card-back">
                                  <img src={Image4} alt="#" className="rounded-full" />
                                  </div>
                              </div>
                              </div>
                    </div>
                    <p className="text-xl hover:text-yellow-400 text-center">24/7 hỗ trợ</p>
                    <p className="text-gray-400 text-center">Hỗ trợ khách 24/7</p>
                </div>
            </div>
        </div>
    )
}

export default CardService

