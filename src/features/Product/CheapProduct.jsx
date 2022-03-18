import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import { getAllProduct } from "api/productApi";
import { formatCurrency } from "app/format";
import { useParams,useLocation } from "react-router-dom";
import { addToCard } from "features/Cart/cartSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Modal } from "react-responsive-modal";
//import "react-responsive-modal/styles.css";
import { Link } from "react-router-dom";
function ImageInSlider({ picture, handleChangeImage }) {
  return (
    <div class="owl-item" style={{ width: "108px" }}>
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
}

function CheapProduct(props) {
  const slideRef = useRef();
  //=========add to cart
  const dispatch = useDispatch();
  const history = useHistory();
  const handleAddToCart = (product) => {
    if(product.SoLuong>0){
      dispatch(addToCard({ ...product, quantity: amount }));
      history.push("/cart");
    }
    
  };
  //============

  //============lay sp tu api
  const [productList, setProductList] = useState([]);
  const [params, setParams] = useState({
    pageNo: 1,
    pageSize: 6,
    sort: "DonGia",
  });
  const [pictures, setPictures] = useState([]);
  const [currentPic, setCurrentPic] = useState({});
  useEffect(
    () => {
      const fetchProductList = async () => {
        try {
          const response = await getAllProduct(params);
          setProductList(response.result.data);
        } catch (error) {
          console.log("Failed to fetch product list: ", error);
        }
      };
      fetchProductList();
    },
    [],
    
  );

  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const handleModal = (value) => {
    setCurrentProduct(value);
    setPictures(value.AnhMoTa);
    setCurrentPic(value.AnhMoTa[0]);
    setOpen(true);
  };
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  //======================== modal
  const { slug } = useParams();

  const [amount, setAmount] = useState(1);

  const handleAmount = (number) => {
    if (number > 0 && amount < currentProduct.SoLuong) {
      setAmount((prev) => prev + number);
    }
    if (number < 0 && amount > 1) {
      setAmount((prev) => prev + number);
    }
  };

  const handleChangeImage = (picture) => {
    setCurrentPic(picture);
  };
  //===========================================
  const settings = {
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

  return (
    <div>
      <div className="relative">
        <div className="h-12 py-5 relative">
          <div className="absolute top-0 right-0 space-x-3 mx-4">
            <button
              className="border-dashed border border-black items-center justify-center rounded-full h-8 w-8 hover:bg-yellow-400 "
              onClick={() => slideRef?.current?.slickPrev()}
            >
              <i className="fa fa-angle-left"></i>
            </button>
            <button
              className="border-dashed border border-black items-center justify-center rounded-full h-8 w-8 hover:bg-yellow-400 "
              onClick={() => slideRef?.current?.slickNext()}
            >
              <i className="fa fa-angle-right"></i>
            </button>
          </div>
        </div>
        <Slider ref={slideRef} {...settings} className="space">
          {productList.map((product,_id) => (
            <div key={_id} className="px-4">
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
        <Modal open={open} onClose={onCloseModal} center>
          <div
            id="product-page"
            className="container "
            style={{width:'auto'}}
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
                              {pictures.length > 3 ? (
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
                                    handleAmount(-1);
                                  }}
                                >
                                  <i class="fa fa-minus"></i>
                                </button>
                                <input
                                  type="text"
                                  name="quantity"
                                  value={amount}
                                  size="2"
                                  id="input-quantity"
                                  class="form-control"
                                />
                                <button
                                  class="w-10 h-10 flex items-center justify-center rounded-full border-dashed"
                                  onClick={() => {
                                    handleAmount(1);
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
                              onClick={() => handleAddToCart(currentProduct)}
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
  );
}

export default CheapProduct;
