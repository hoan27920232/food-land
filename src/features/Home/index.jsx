import React from 'react';
import CardService from '../../components/Item/CardService'
import Banner from '../../components/Banner/index'
import ImageBanner from '../../components/Banner/BannerImage/ImageBanner'
import BlogSlide from '../Blog/BlogSlide'
import ImageBanner2 from '../../components/Banner/BannerImage/ImageBanner2'
import Cart1 from '../../components/Item/Card1'
import CheapProduct from '../Product/CheapProduct'
import HotProduct from '../Product/HotProduct'
import NewProduct from '../Product/NewProduct'
import useMetaTags from 'react-metatags-hook'


Home.propTypes = {
    
};

function Home(props) {
    useMetaTags({
        title: 'Tay Bac Food'
      })
    return (
        <div className="home">
            <div>
                <Banner/>
                <div className="bg-white"><CardService/></div>
                <div className="hidden md:block"><Cart1/></div>
            </div>
            <div className="py-6 flex flex-col items-center">
                <div className="md:text-2xl lg:text-3xl text-left w-4/5 px-4 2xl:px-48">SẢN PHẨM HOT</div>
                <div className="w-4/5  2xl:px-44"><HotProduct /></div>
            </div>
            <div className="bg-white flex flex-col items-center ">
                <div className="w-4/5 2xl:px-44"><ImageBanner/></div>
            </div>
            <div className="py-6 flex flex-col items-center">
                <div className="md:text-2xl lg:text-3xl  text-left w-4/5 px-4 2xl:px-48">SẢN PHẨM MỚI</div>
                <div className="w-4/5 2xl:px-44 "><NewProduct /></div>
            </div>
            <div className="bg-white flex flex-col items-center ">
                <div className="w-4/5 2xl:px-48"><ImageBanner2/></div>
            </div>
            <div className="py-6 flex flex-col items-center  ">
                <div className="md:text-2xl lg:text-3xl  text-left w-4/5 px-4 2xl:px-48">SẢN PHẨM GIÁ RẺ</div>
                <div className="w-4/5 2xl:px-44 "><CheapProduct /></div>
            </div>
            <div className="py-6 bg-white flex flex-col items-center ">
                <div className="md:text-2xl lg:text-3xl  text-left w-4/5 px-4 2xl:px-48">BLOG MỚI NHẤT</div>
                <div className=" w-4/5 2xl:px-44 "><BlogSlide/></div>
            </div>
        </div>
    );
}

export default Home;