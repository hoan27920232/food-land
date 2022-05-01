import React, { useState, useEffect } from "react";
import { getAllCatBlog } from "api/categoryBlogApi";
import { useHistory } from "react-router-dom";
import { getAllProduct } from "api/productApi";
import { Link } from "react-router-dom";
import { formatCurrency } from "app/format";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import qs from "qs";

Aside.propTypes = {
  filter: PropTypes.bool,
  handleChange: PropTypes.func,
  isCategory: PropTypes.bool,
};

Aside.defaultProps = {
  filter: false,
  handleChange: null,
  isCategory: false,
};

function Aside(props) {
  const history = useHistory();
  const [productList, setProductList] = useState([]);
  const location = useLocation();
  const { filter, handleChange, isCategory } = props;
  const [categoryList, setCategoryList] = useState([]);



  const handleChangeCategory = (value) => {
    console.log(filter);
    if (handleChange && isCategory) {
      handleChange(value);
    } else {
      history.push({
        pathname: `/blogs/category/${value}`,
        search: "",
      });
    }
  };
  useEffect(() => {
    const decodeUrl = qs.parse(location.search.substring(1));
    const filter = decodeUrl["filter"];
    console.log(filter, "test")
    const fetchCategoryList = async () => {
      try {
        const params = {};
        const response = await getAllCatBlog(params);
        setCategoryList(response.result.data);
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    };
    const fetchProductList = async () => {
      try {
        const params = {
          pageNo: 1,
          pageSize: 3,
          sort: {
            updatedAt: -1,
          },
        };
        const response = await getAllProduct(params);
        setProductList(response.result.data);
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    };
    fetchCategoryList();

    fetchProductList();
  }, []);

  return (
    <>
      <div className="category-list">
        <div className="box-category">
          <h3 className="toggled relative">Danh mục</h3>
          <ul className="list-unstyled parent" id="selectMe-desk">
            {categoryList.map((category) => {
              return (
                <li className="" key={category._id}>
                  <span
                    className="list-group-item cursor-pointer"
                    onClick={() => handleChangeCategory(category._id)}
                  >
                    <span>{category.TenDanhMucBlog}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="box-content special">
        <div className="page-title toggled">
          <h3>Sản phẩm đặc biệt</h3>
        </div>
        <div
          className="block_box row"
          style={{ display: "block", padding: "20px" }}
        >
          <div
            id="special-carousel"
            className="box-product  product-carousel  clearfix"
          >
            <div className="product-layout  col-xs-12">
              {productList.map((product, index) => {
                return (
                  <div className="product-thumb transition" key={index}>
                    <div className="image">
                      <Link to={`/products/${product.slug}`}>
                        <a className="cursor-pointer">
                          <img
                            src={`${product.AnhMoTa[0].source}`}
                            alt={product.TenSanPham}
                            title={product.TenSanPham}
                            className="img-responsive"
                          />
                        </a>
                      </Link>
                    </div>
                    <div className="thumb-description clearfix">
                      <div className="caption">
                        <div className="desc-inner">
                          <h4 className="product-title">
                            <Link to={`/products/${product.slug}`}>
                              <a className="cursor-pointer">
                                {product.TenSanPham}
                              </a>
                            </Link>
                          </h4>
                        </div>
                        <p className="price">
                          <span className="price-new">
                            {formatCurrency(product.DonGia)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Aside;
