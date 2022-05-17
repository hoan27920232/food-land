import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Aside from "components/Aside";
import { FastField, Field, Form, Formik } from "formik";
import InputField from "components/InputField";
import * as Yup from "yup";
import { formatCurrency } from "app/format";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createOrd, setMessage } from "features/CheckOut/checkoutSlice";
import { useHistory } from "react-router";
import momo from "../../../../assets/images/momo.png";
import cod from "../../../../assets/images/cod.png";
import { me } from "api/userApi";
import { checkDiscount, createOrder } from "api/orderApi";
import axios from "axios";
import InputArea from "components/InputArea";

CheckoutForm.propTypes = {};

function CheckoutForm(props) {
  const [initialValues, setInitialValues] = useState({
    email: "",
    address: "",
    sdt: "",
  });
  const history = useHistory();
  const [cartProduct, setCartProduct] = useState([]);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.checkout.loading);
  const [payment, setPayment] = useState("cod");
  const token = useSelector((state) => state.me.token);
  const user = useSelector((state) => state.me.user);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const ref = useRef(null);
  const [load, setLoad] = useState(false);
  const [idDiscount, setIdDiscount] = useState('');
  const [text, setText] = useState('');
  const [code, setCode] = useState("");
  const [display, setDisplay] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("cartItems")) {
      setCartProduct(JSON.parse(localStorage.getItem("cartItems")));
    }
  }, []);
  useEffect(() => {
    async function fectchAPI() {
      const actionMe = await me().then((data) => {
        setInitialValues({
          address: data && data.DiaChi && data.DiaChi,
          email: data && data.email && data.email,
          sdt: data && data.SDT && data.SDT,
          shippingAddress: {
            provinceOrCity:
              data &&
              data?.shippingAddress &&
              data?.shippingAddress?.provinceOrCity &&
              data?.shippingAddress?.provinceOrCity?.id &&
              data?.shippingAddress?.provinceOrCity?.id,
            district:
              data &&
              data?.shippingAddress &&
              data?.shippingAddress?.district &&
              data?.shippingAddress?.district?.id &&
              data?.shippingAddress?.district?.id,
            ward:
              data &&
              data?.shippingAddress &&
              data?.shippingAddress?.ward &&
              data?.shippingAddress?.ward?.id &&
              data?.shippingAddress?.ward?.id,
          },
          note:  '',
          MaDiscount: ''
        });
      });
    }
    fectchAPI();
    const total = cartProduct
      .map((p) => p.DonGia * p.cartQuantity)
      .reduce((a, b) => {
        return a + b;
      }, 0);
    setTotal(total);
  }, [cartProduct]);
  const validateSchema = Yup.object().shape({
    address: Yup.string().required(),

    email: Yup.string().required().email(),
    sdt: Yup.string()
      .required()
      .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g),
    shippingAddress: Yup.object().shape({
      provinceOrCity: Yup.string().required(),
      district: Yup.string().required(),
      ward: Yup.string().required(),
    }),
    note: Yup.string(),
    discount: Yup.string()
  });
  const handlePayment = (value) => {
    setPayment(value);
  };
  const getInfor = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}ghtk/vnlocations/0`
    );
    setCities(res.data);
    const res2 = await axios.get(
      `${process.env.REACT_APP_API_URL}ghtk/vnlocations/${ref?.current?.values?.shippingAddress?.provinceOrCity}`
    );
    setDistricts(res2.data);
    const res3 = await axios.get(
      `${process.env.REACT_APP_API_URL}ghtk/vnlocations/${ref?.current?.values?.shippingAddress?.district}`
    );
    setWards(res3.data);
  };
  const discountChange = (e) => {
    setCode(e.target.value);
  };
  const checkDiscountFunction = async () => {
    const now = new Date()
    let check;
    if (code) {
      try{
        check = await checkDiscount(code);
      }catch(err){

      }
    }
    if(check && check.data) {
      if(Date.parse(check.data.startDate) > Date.parse(now))
      {
        setText("Chưa đến thời điểm code được sử dụng")
      }
      else if(Date.parse(check.data.endDate) < Date.parse(now)) {
        setText("Hết thời điểm code được sử dụng")
      }
      else if(!check.data.active) {
        setText("Code đã bị vô hiệu hóa")
      }
      else if(check.data.discount == 0) {
        setText("Code không có tỉ lệ giảm giá")
      }
      else{
        setText("Áp dụng code thành công bạn được giảm giá " + check.data.discount + " phần trăm")
        setTotal(total * (100 - check.data.discount) / 100)
        setIdDiscount(check.data._id)
      }
    }else {
      setText("Code bạn nhập không đúng")
    }
    setDisplay(true);
  };
  const onSubmit = async (values) => {
    const city = formatAddress(
      cities.find((p) => p.id == values.shippingAddress.provinceOrCity)
    );
    const district = formatAddress(
      districts.find((p) => p.id == values.shippingAddress.district)
    );
    const ward = formatAddress(
      wards.find((p) => p.id == values.shippingAddress.ward)
    );
    setLoad(true);
    let payUrl = "";
    const items = cartProduct.map((p) => ({
      sanpham: {
        _id: p._id,
      },
      soluong: p.cartQuantity,
    }));
    let weight = 0
    for (let i = 0; i < cartProduct.length; i++) {
      weight +=
      cartProduct[i].KhoiLuong * cartProduct[i].cartQuantity
    }
    console.log(weight)
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}ghtk/calculateShip`,
      {
        params: {
          province: city.name,
          district: district.name,
          weight: weight,
        },
      }
    );
    const finalData = {
      items: items,
      email: values.email,
      SDT: values.sdt,
      DiaChi: values.address,
      MaKhachHang: user._id,
      TrangThai: 0,
      KieuThanhToan: payment,
      TinhTrangThanhToan: 0,
      shippingAddress: {
        provinceOrCity: city,
        district: district,
        ward: ward
      },
      note: values.note,
      shipMoney: res.data?.ship?.fee?.fee || 0,
      MaDiscount: idDiscount,

    };
    console.log(finalData)
    const action = await createOrder(finalData)
      .then((res) => {
        payUrl = res.data.payUrl;
        setMessage("");
      })
      .catch((err) => setMessage(err.response.data.message));
    setTimeout(() => {
      if (payUrl !== "" && finalData.KieuThanhToan == "momo") {
        window.location.replace(payUrl);
      } else {
        history.push("/checkout/confirm");
      }
      setLoad(false);
    }, 2000);
  };
  const onChangeCity = async (e) => {
    if (e.target.value) {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}ghtk/vnlocations/${e.target.value}`
      );
      setDistricts(res.data);
      setWards([]);
    } else {
      setDistricts([]);
      setWards([]);
    }
  };
  const onChangeDistrict = async (e) => {
    if (e.target.value) {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}ghtk/vnlocations/${e.target.value}`
      );
      setWards(res.data);
    } else {
      setWards([]);
    }
  };
  const onChangeWard = async (e) => {
    
  }
  const formatAddress = (data) => {
    return {
      id: data?.id ? data.id : null,
      name: data?.name ? data.name : null,
      pid: data?.pid ? data.pid : null,
      code: data?.id ? data.id : null,
    };
  };
  useEffect(() => {
    setTimeout(() => {
      console.log(ref?.current?.values);
      getInfor();
    }, 1000);
  }, []);
  return (
    <div>
      {token != "" || cartProduct.length < 1 ? (
        <div>
          {load && (
            <div className="h-screen w-screen z-50 bg-gray-400 opacity-50 text-white flex justify-center items-center fixed top-0 left-0">
              <div className="flex flex-col items-center text-lg">
                <i class="fas fa-sync fa-spin"></i>
                <p>Đang xử lý</p>
              </div>
            </div>
          )}
          <div className="w-full border bg-white border-dashed border-gray-300 px-6 py-3 mb-4 text-xl uppercase">
            Checkout
          </div>
          <div className="w-full border bg-white border-dashed border-gray-300 pt-12">
            <Formik
              innerRef={ref}
              validationSchema={validateSchema}
              onSubmit={onSubmit}
              initialValues={initialValues}
              enableReinitialize
            >
              {(formikProps) => {
                // do something here
                const {
                  values,
                  errors,
                  touched,
                  isSubmitting,
                  handleChange,
                  setFieldValue,
                } = formikProps;
                return (
                  <Form className="flex justify-center flex-col items-start space-y-1">
                    <FastField
                      name="address"
                      component={InputField}
                      label="Địa chỉ(*)"
                      placeholder="Địa chỉ"
                    />
                    <div className="flex pb-10">
                      <div className="ml-8">
                        <label htmlFor="city" className="mr-2">
                          Thành phố
                        </label>
                        <Field
                          id="city"
                          name="shippingAddress.provinceOrCity"
                          as="select"
                          onChange={(e) => {
                            handleChange(e);
                            onChangeCity(e);
                            setFieldValue("shippingAddress.ward", "");
                            setFieldValue("shippingAddress.district", "");
                          }}
                          className="h-10 w-48"
                          style={{
                            borderRadius: "20px",
                            border: `2px dotted`,
                            padding: "1px 5px",
                          }}
                        >
                          <option value="">Chọn thành phố</option>
                          {cities.map((city) => (
                            <option key={city.id} value={city.id}>
                              {city.id} {city.name}
                            </option>
                          ))}
                        </Field>
                        {errors?.shippingAddress &&
                          touched?.shippingAddress &&
                          touched?.shippingAddress?.provinceOrCity &&
                          errors?.shippingAddress?.provinceOrCity && (
                            <p className="text-red-700 text-center">
                              Chưa có thành phố
                            </p>
                          )}
                      </div>
                      <div className="ml-8">
                        <label htmlFor="district" className="mr-2">
                          Quận/Huyện
                        </label>
                        <Field
                          id="district"
                          name="shippingAddress.district"
                          as="select"
                          onChange={(e) => {
                            handleChange(e);
                            onChangeDistrict(e);
                            setFieldValue("shippingAddress.ward", "");
                          }}
                          className="h-10 w-48"
                          style={{
                            borderRadius: "20px",
                            border: `2px dotted`,
                            padding: "1px 5px",
                          }}
                        >
                          <option value="">Chọn Quận/huyện</option>

                          {districts.map((district) => (
                            <option key={district.id} value={district.id}>
                              {district.id} {district.name}
                            </option>
                          ))}
                        </Field>
                        {errors?.shippingAddress &&
                          touched?.shippingAddress &&
                          touched?.shippingAddress?.district &&
                          errors?.shippingAddress?.district && (
                            <p className="text-red-700 text-center">
                              Chưa có Quận/huyện
                            </p>
                          )}
                      </div>
                      <div className="ml-8">
                        <label htmlFor="ward" className="mr-2">
                          Xã
                        </label>
                        <Field
                          id="ward"
                          name="shippingAddress.ward"
                          as="select"
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          className="h-10 w-48"
                          style={{
                            borderRadius: "20px",
                            border: `2px dotted`,
                            padding: "1px 5px",
                          }}
                        >
                          <option value="">Chọn xã</option>

                          {wards.map((ward) => (
                            <option key={ward.id} value={ward.id}>
                              {ward.id} {ward.name}
                            </option>
                          ))}
                        </Field>
                        {errors?.shippingAddress &&
                          touched?.shippingAddress &&
                          touched?.shippingAddress?.ward &&
                          errors?.shippingAddress?.ward && (
                            <p className="text-red-700 text-center">
                              Chưa có xã
                            </p>
                          )}
                      </div>
                    </div>
                    <FastField
                      name="email"
                      component={InputField}
                      label="Email(*)"
                      placeholder="Email"
                    />
                    <FastField
                      name="sdt"
                      component={InputField}
                      label="Phone(*)"
                      placeholder="Phone"
                    />
                     <FastField
                      name="note"
                      component={InputArea}
                      label="Note"
                      placeholder="Note"
                    />
                    <div className="grid grid-cols-12 pl-12 w-full">
                      <div className="col-span-1 flex items-center">
                        Discount
                      </div>
                      <input
                        className={`border-2 col-start-3 col-span-7 border-gray-500 border-dotted rounded-full py-2 px-3 outline-none`}
                        value={code}
                        onChange={discountChange}
                      />
                      <span
                        className="btn-yellow col-span-2 ml-3 cursor-pointer flex justify-center items-center"
                        onClick={() => checkDiscountFunction()}
                      >
                        Apply
                      </span>
                    </div>
                    <div className="w-full ml-12 mt-2">
                      <span className="w-10/12 float-right">{text}</span>
                    </div>
                    <div className="w-full">
                      <section className="py-1 bg-blueGray-50">
                        <div className="w-full mb-12 xl:mb-0 px-4 mx-auto mt-4">
                          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                            <div className="rounded-t mb-0 px-4 py-3 border-0">
                              <div className="flex flex-wrap items-center">
                                <div className="relative w-full max-w-full flex-grow flex-1">
                                  <h3 className="font-semibold text-base text-blueGray-700">
                                    Danh sách sản phẩm
                                  </h3>
                                </div>
                              </div>
                            </div>

                            <div className="block w-full overflow-x-auto">
                              <table className="items-center bg-transparent w-full border-collapse ">
                                <thead>
                                  <tr>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                      Ảnh
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                      Tên sản phẩm
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                      Gía
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                      Số lượng
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                     Tổng tiền
                                    </th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {cartProduct &&
                                    cartProduct.length &&
                                    cartProduct.map((item, index) => (
                                      <tr key={index}>
                                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                          <img
                                            src={item.AnhMoTa[0].source}
                                            style={{ width: "100px" }}
                                          />
                                        </th>
                                        <td className="capitalize-first border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                          {item.TenSanPham}
                                        </td>
                                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                          {formatCurrency(item.DonGia)}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                          {item.cartQuantity}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                          {formatCurrency(
                                            item.cartQuantity * item.DonGia
                                          )}
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
                            </div>
                            <div className="text-right uppercase font-bold mr-14 mb-4">
                              Tổng tiền: {formatCurrency(total)}
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                    <div className="w-full">
                      <div
                        className={`flex space-x-2 items-center border border-dashed px-12 mx-5 mb-4 rounded-xl cursor-pointer ${
                          payment == "cod" &&
                          "shadow-lg bg-gray-200 text-gray-900"
                        }`}
                        onClick={() => handlePayment("cod")}
                      >
                        <img
                          src={cod}
                          alt="cod"
                          className="w-20 h-20 object-cover"
                        />
                        <p>
                          Đối với phương thức này bạn sẽ thanh toán khi nhận
                          hàng
                        </p>
                      </div>
                      <div
                        className={`flex space-x-2 items-center border border-dashed px-14 py-4 mx-5 mb-4 rounded-xl cursor-pointer ${
                          payment == "momo" &&
                          "shadow-lg bg-gray-200 text-gray-900"
                        }`}
                        onClick={() => handlePayment("momo")}
                      >
                        <img
                          src={momo}
                          alt="momo"
                          className="w-12 h-12 object-cover"
                        />
                        <p>
                          Đối với phương thức này bạn sẽ thanh toán qua ứng dụng
                          momo
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center w-full pb-4">
                      <button
                        className="btn-yellow flex items-center"
                        type="submit"
                      >
                        {isSubmitting && (
                          <svg
                            className="animate-spin h-4 w-4 text-white mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx={12}
                              cy={12}
                              r={10}
                              stroke="currentColor"
                              strokeWidth={4}
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                        )}
                        Submit
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      ) : (
        <div className="w-full border bg-white border-dashed border-gray-300 h-96 flex justify-center items-center text-3xl px-16">
          Vui lòng đăng nhập và thêm sản phẩm vào giỏ trước khi đặt hàng
        </div>
      )}
    </div>
  );
}

export default CheckoutForm;
