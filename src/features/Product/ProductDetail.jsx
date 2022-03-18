import React, { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom"
import BreadCrumb from "components/BreadCrumb";
import { getProductBySlug, getAllProduct, getProductByCategory } from "api/productApi"
import Slider from "react-slick";
import { formatCurrency } from 'app/format';
import { addToCard } from "features/Cart/cartSlice";
import { useDispatch } from "react-redux"
import { useHistory } from "react-router";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Link } from "react-router-dom";



function ImageInSlider({ picture, handleChangeImage }) {
  return (
    <div class="owl-item" style={{ width: "108px" }}>
      <div class="image-additional">
        <a style={{ cursor: "pointer" }} onClick={() => { handleChangeImage(picture) }}>
          <img src={`${picture.source}`} alt={picture._id} width="80" height="80" />
        </a>
      </div>
    </div>
  );
}



function ProductDetail() {

  const slideRef = useRef();
  const slideRef2 = useRef();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: false,
  };
  const setting2 = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  const setting3 = {
    dots: false,
    infinite: false,
    speed: 500,
    autoplay: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  const { slug } = useParams();
  const [pictures, setPictures] = useState([]);
  const [productList, setProductList] = useState([]);
  const [currentPic, setCurrentPic] = useState({});
  const [amount, setAmount] = useState(1);
  const [relateProduct, setRelateProduct] = useState([]);
  const [currentDm, setcurrentDm] = useState();


  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const params = slug;
        const response = await getProductBySlug(params);
        setProductList(response.data);
        setPictures(response.data.AnhMoTa);
        setCurrentPic(response.data.AnhMoTa[0]);
        setcurrentDm(response.data.DanhMucSP._id)
        const response2 = await getAllProduct({
          DanhMucSP: currentDm
        });
        setRelateProduct(response2.result.data.filter(p => p._id != response.data._id));
      }
      catch (error) {
        console.log('Failed to fetch product list: ', error);
      }
    }
    fetchProductList();
  }, [slug]);






  const handleChangeImage = (picture) => {
    setCurrentPic(picture);
  }

  const handleAmount = (number) => {
    if (number > 0 && amount < productList.SoLuong) {
      setAmount(prev => prev + number);
    }
    if (number < 0 && amount > 1) {
      setAmount(prev => prev + number);
    }
  }
  


  const dispatch = useDispatch();
  const history = useHistory();
  const handleAddToCart = (product) => {
    if(product.SoLuong>0){
      dispatch(addToCard({ ...product, quantity: amount }));
      history.push("/cart");
    }
    
  };

  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const handleModal = (value) => {
    setCurrentProduct(value);
    setPictures(value.AnhMoTa);
    setCurrentPic(value.AnhMoTa[0]);
    setOpen(true);
    console.log(value.SoLuong);
    
  };
  const [amount1,setAmount1]=useState(1);
  const handleAmount1 = (number) => {
    if (number > 0 && amount1 < currentProduct.SoLuong) {
      setAmount1(prev => prev + number);
    }
    if (number < 0 && amount1 > 1) {
      setAmount1(prev => prev + number);
    }
  }
  const handleAddToCart1 = (product) => {
    if(product.SoLuong>0){
      dispatch(addToCard({ ...product, quantity: amount1 }));
      history.push("/cart");
    }
    
  };
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <div className="product-detail-main">
      <div className="container">
        <BreadCrumb currentPage={productList.TenSanPham} lastPage="food" />
      </div>

      <div id="product-page" className="container">
        <div className="row">
          <div id="content" className="col-sm-12">
            <div class="pro-deatil clearfix row">
              <div class="col-sm-6 product-img">
                <div class="thumbnails">
                  <div class="product-additional">
                    <div class="pro-image">
                      <span class="thumbnail">
                        <img src={`${currentPic?.source}`} title={currentPic._id} id="zoom" alt={currentPic._id} style={{maxHeight: "544px"}}/>
                      </span>
                    </div>

                    <div id="additional-carousel" class="owl-carousel owl-theme clearfix owl-loaded">
                      <div class="owl-stage-outer" style={{ marginBottom: "10px" }}>
                        <div class="owl-stage" style={{ transition: "all 0.25s ease 0s" }}>
                          {pictures.length > 5 ?
                            (<Slider ref={slideRef} {...settings}>
                              {pictures.map((picture, index) => {
                                return <ImageInSlider picture={picture} handleChangeImage={handleChangeImage} key={index} />
                              })}
                            </Slider>)
                            :
                            (
                              <>
                                {pictures.map((picture, index) => {
                                  return (
                                    <div class="owl-item" style={{ width: "108px" }} key={index}>
                                      <div class="image-additional">
                                        <a style={{ cursor: "pointer" }} onClick={() => { handleChangeImage(picture) }}>
                                          <img src={`${picture.source}`} alt={picture._id} width="80" height="80" />
                                        </a>
                                      </div>
                                    </div>
                                  );
                                })}
                              </>
                            )
                          }
                          {/* list ảnh của product */}
                        </div>
                      </div>

                      <div class="owl-nav">
                        <div class="owl-prev" onClick={() => slideRef?.current?.slickPrev()}>
                          <i class="fa fa-angle-left"></i>
                        </div>
                        <div class="owl-next" onClick={() => slideRef?.current?.slickNext()}>
                          <i class="fa fa-angle-right"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-sm-6">
                <div class="right_info">
                  <h1 class="">{productList.TenSanPham}</h1>

                  <hr />

                  <ul class="list-unstyled">
                    <li>
                      <span class="disc">Product Code:</span>
                      <span class="disc1"> {productList.code}</span></li>
                    <li>
                      <span class="disc">Availability:</span>
                      <span class="disc1"> {productList.SoLuong > 0 ? `In stock (${productList.SoLuong})` : "Out stock"}</span>
                    </li>
                  </ul>

                  <hr />
                  <ul class="list-unstyled">
                    <li>
                      <span class="pro_price">{formatCurrency(productList.DonGia)}</span>
                    </li>

                  </ul>

                  <hr />

                  <div id="product" class="product-options">
                    <div class="form-group">
                      <label class="control-label qty" for="input-quantity">Qty</label>
                      <div class="product-btn-quantity">
                        <div class="pro-quantity">
                          <div class="minus-plus">
                            <button class="w-10 h-10 flex items-center justify-center rounded-full border-dashed" onClick={() => { handleAmount(-1) }}>
                              <i class="fa fa-minus"></i>
                            </button>
                            <input type="text" name="quantity" value={amount} size="2" id="input-quantity" class="form-control" />
                            <button class="w-10 h-10 flex items-center justify-center rounded-full border-dashed" onClick={() => { handleAmount(1) }}>
                              <i class="fa fa-plus"></i>
                            </button>
                          </div>
                        </div>
                        <input type="hidden" name="product_id" value="35" />
                        <button type="button" id="button-cart" onClick={() => handleAddToCart(productList)} data-loading-text="Loading..." class="btn btn-primary btn-lg btn-block" disabled={productList.SoLuong > 0 ? false : true}>
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
            </div>

            <div className="col-sm-12" style={{ marginBottom: "50px" }}>
              <div className="row pro-tab">
                <ul class="nav nav-tabs">
                  <li><a>Description</a></li>
                </ul>
                <div className="tab-content">
                  <div className="tab-pane">
                    <div dangerouslySetInnerHTML={{ __html: productList.MoTa }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="py-10 ">
              <p className=" xl:text-3xl">Relate product</p>
              <div>
                <div>
                  <div className="relative">
                    <div className="h-12 py-5 relative">
                      <div className="absolute top-0 right-0 space-x-3 mx-4">
                        <button
                          className="border-dashed border border-black items-center justify-center rounded-full h-8 w-8 hover:bg-yellow-400 "
                          onClick={() => slideRef2?.current?.slickPrev()}
                        >
                          <i className="fa fa-angle-left"></i>
                        </button>
                        <button
                          className="border-dashed border border-black items-center justify-center rounded-full h-8 w-8 hover:bg-yellow-400 "
                          onClick={() => slideRef2?.current?.slickNext()}
                        >
                          <i className="fa fa-angle-right"></i>
                        </button>
                      </div>
                    </div>
                    {relateProduct.length > 4 ? (
                      <Slider ref={slideRef2} {...setting2} className="space">
                        {relateProduct.map((product) => (
                          <div key={product._id} className="px-4">
                            <div className="bg-white relative">
                              <div className=" aspect-w-1 aspect-h-1 group ">
                                <img
                                  className=""
                                  src={product.AnhMoTa[0].source}
                                  alt={product.TenSanPham}
                                />
                                {product.SoLuong<1&&(<div className="absolute top-6 left-1 "><span className="text-red-500">Out stock</span></div>)}
                                <div className=" absolute  opacity-0 group-hover:opacity-100 flex transition-all duration-500 flex-wrap items-center justify-center ">
                                  <div className="text-center">
                                    <button
                                      className="bg-red-500 hover:bg-yellow-300 w-10 h-10 flex items-center justify-center rounded-full"
                                      onClick={() => handleModal(product)}
                                    >
                                      <i className="fas fa-eye" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <button
                                className="bg-yellow-300 hover:bg-red-500 w-10 h-10 flex items-center justify-center rounded-full absolute right-4 top-4"
                                onClick={() => handleAddToCart(product)}
                              >
                                <i className="fas fa-cart-plus" />
                              </button>
                              <div className="py-5 px-5">
                                <div className="hover:text-yellow-400 text-lg text-center capitalize-first h-14">
                                  <Link to={`/products/${product.slug}`}>
                                    {product.TenSanPham}
                                  </Link>
                                </div>
                                <div className=" text-center">
                                  {formatCurrency(product.DonGia)}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </Slider>
                    ) : (
                      <>
                      <Slider ref={slideRef2} {...setting3} className="space">
                        {relateProduct.map((product) => (
                          <div key={product._id} className="px-4 ">
                            <div className="bg-white relative">
                              <div className=" aspect-w-1 aspect-h-1 group ">
                                <img
                                  className=""
                                  src={product.AnhMoTa[0].source}
                                  alt={product.TenSanPham}
                                />
                                {product.SoLuong<1&&(<div className="absolute top-6 left-1 "><span className="text-red-500">Out stock</span></div>)}
                                <div className=" absolute  opacity-0 group-hover:opacity-100 flex transition-all duration-500 flex-wrap items-center justify-center ">
                                  <div className="text-center">
                                    <button
                                      className="bg-red-500 hover:bg-yellow-300 w-10 h-10 flex items-center justify-center rounded-full"
                                      onClick={() => handleModal(product)}
                                    >
                                      <i className="fas fa-eye" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <button
                                className="bg-yellow-300 hover:bg-red-500 w-10 h-10 flex items-center justify-center rounded-full absolute right-4 top-4"
                                onClick={() => handleAddToCart(product)}
                              >
                                <i className="fas fa-cart-plus" />
                              </button>
                              <div className="py-5 px-5">
                                <div className="hover:text-yellow-400 text-xl text-center capitalize-first h-14">
                                  <Link to={`/products/${product.slug}`}>
                                    {product.TenSanPham}
                                  </Link>
                                </div>
                                <div className=" text-center">
                                  {formatCurrency(product.DonGia)}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </Slider>
                      </>
                    )}
                    <Modal open={open} onClose={onCloseModal} center>
                      <div
                        id="product-page"
                        className="container "
                        style={{ width: "auto" }}
                      >
                        <div className="row">
                          <div id="content" className="col-sm-12">
                            <div class="pro-deatil clearfix row">
                              <div class="col-sm-6 product-img">
                                <div class="thumbnails">
                                  <div class="product-additional">
                                    <div class="pro-image">
                                      <span class="thumbnail">
                                        <img
                                          src={`${currentPic?.source}`}
                                          title={currentPic._id}
                                          id="zoom"
                                          alt={currentPic._id}
                                        />
                                      </span>
                                    </div>

                                    <div
                                      id="additional-carousel"
                                      class="owl-carousel owl-theme clearfix owl-loaded"
                                    >
                                      <div
                                        class="owl-stage-outer"
                                        style={{ marginBottom: "10px" }}
                                      >
                                        <div
                                          class="owl-stage"
                                          style={{ transition: "all 0.25s ease 0s" }}
                                        >
                                          {pictures.length > 5 ? (
                                            <Slider ref={slideRef} {...settings}>
                                              {pictures.map((picture, index) => {
                                                return (
                                                  <ImageInSlider
                                                    picture={picture}
                                                    handleChangeImage={handleChangeImage}
                                                    key={index}
                                                  />
                                                );
                                              })}
                                            </Slider>
                                          ) : (
                                            <>
                                              {pictures.map((picture, index) => {
                                                return (
                                                  <div
                                                    class="owl-item"
                                                    style={{ width: "108px" }}
                                                    key={index}
                                                  >
                                                    <div class="image-additional">
                                                      <a
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => {
                                                          handleChangeImage(picture);
                                                        }}
                                                      >
                                                        <img
                                                          src={`${picture.source}`}
                                                          alt={picture._id}
                                                          width="80"
                                                          height="80"
                                                        />
                                                      </a>
                                                    </div>
                                                  </div>
                                                );
                                              })}
                                            </>
                                          )}
                                        </div>
                                      </div>

                                      <div class="owl-nav">
                                        <div
                                          class="owl-prev"
                                          onClick={() => slideRef?.current?.slickPrev()}
                                        >
                                          <i class="fa fa-angle-left"></i>
                                        </div>
                                        <div
                                          class="owl-next"
                                          onClick={() => slideRef?.current?.slickNext()}
                                        >
                                          <i class="fa fa-angle-right"></i>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div class="col-sm-6">
                                <div class="right_info">
                                  <h1 class="">{currentProduct?.TenSanPham}</h1>

                                  <hr />

                                  <ul class="list-unstyled">
                                    <li>
                                      <span class="disc">Product Code:</span>
                                      <span class="disc1"> {currentProduct?.code}</span>
                                    </li>
                                    <li>
                                      <span class="disc">Availability:</span>
                                      <span class="disc1">
                                        {" "}
                                        {currentProduct?.SoLuong > 0
                                          ? `In stock (${currentProduct?.SoLuong})`
                                          : "Out stock"}
                                      </span>
                                    </li>
                                  </ul>

                                  <hr />
                                  <ul class="list-unstyled">
                                    <li>
                                      <span class="pro_price">
                                        {formatCurrency(currentProduct?.DonGia)}
                                      </span>
                                    </li>
                                  </ul>

                                  <hr />

                                  <div id="product" class="product-options">
                                    <div class="form-group">
                                      <label class="control-label qty" for="input-quantity">
                                        Qty
                                      </label>
                                      <div class="product-btn-quantity">
                                        <div class="pro-quantity">
                                          <div class="minus-plus">
                                            <button
                                              class="w-10 h-10 flex items-center justify-center rounded-full border-dashed"
                                              onClick={() => {
                                                handleAmount1(-1);
                                              }}
                                            >
                                              <i class="fa fa-minus"></i>
                                            </button>
                                            <input
                                              type="text"
                                              name="quantity"
                                              value={amount1}
                                              size="2"
                                              id="input-quantity"
                                              class="form-control"
                                            />
                                            <button
                                              class="w-10 h-10 flex items-center justify-center rounded-full border-dashed"
                                              onClick={() => {
                                                handleAmount1(1);
                                              }}
                                            >
                                              <i class="fa fa-plus"></i>
                                            </button>
                                          </div>
                                        </div>
                                        <input type="hidden" name="product_id" value="35" />
                                        <button
                                          type="button"
                                          id="button-cart"
                                          onClick={() => handleAddToCart1(currentProduct)}
                                          data-loading-text="Loading..."
                                          class="btn btn-primary btn-lg btn-block"
                                        >
                                          Add to Cart
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                  <hr />
                                </div>
                              </div>
                            </div>

                            <div className="col-sm-12" style={{ marginBottom: "50px" }}>
                              <div className="row pro-tab">
                                <ul class="nav nav-tabs">
                                  <li>
                                    <a>Description</a>
                                  </li>
                                </ul>
                                <div className="tab-content">
                                  <div className="tab-pane">
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: currentProduct?.MoTa,
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;