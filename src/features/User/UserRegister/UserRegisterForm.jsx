import React, { useEffect, useRef } from "react";
import BreadCrumb from "components/BreadCrumb";
import AsideAccount from "components/Aside/AsideAcountOutside";
import { FastField, Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import InputField from "components/InputField";
import PropTypes from "prop-types";
import * as Yup from "yup";
import SelectField from "components/SelectField";
import { useState } from "react";
import axios from "axios";

UserRegisterForm.propTypes = {
  onSubmit: PropTypes.func,
  initialValues: PropTypes.object,
};

UserRegisterForm.defaultProps = {
  onSubmit: null,
  initialValues: {
    TenKhachHang: "",
    email: "",
    SDT: "",
    password: "",
    repassword: "",
    NgaySinh: "",
    DiaChi: {
      provinceOrCity: null,
      district: null,
      ward: null,
      DiaChiDetail: "",

    },
  },
};

function UserRegisterForm(props) {
  const { onSubmit, initialValues } = props;
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const refForm = useRef(null);
  const validationSchema = Yup.object().shape({
    TenKhachHang: Yup.string().required("This field is required"),
    email: Yup.string()
      .email()
      .required("This field is required")
      .matches(/^\S+@\S+\.\S+$/),
    SDT: Yup.string()
      .required("This field is required")
      .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g),
    password: Yup.string().required("This field is required").min(6),
    repassword: Yup.string()
      .required("This field is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    NgaySinh: Yup.date(),
    DiaChi: Yup.object().shape({
      provinceOrCity: Yup.string().required(),
      district: Yup.string().required(),
      ward: Yup.string().required(),
      DiaChiDetail: Yup.string().required("This field is required"),
    }),
  });
  const getCities = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}ghtk/vnlocations/0`
    );
    setCities(res.data);
  };
  useEffect(() => {
    getCities();
  }, []);
  const onChangeCity = async (e) => {
    console.log("AAAAAAAAAAAAAAA");
    if (e.target.value) {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}ghtk/vnlocations/${e.target.value}`
      );
      setDistricts(res.data);
    } else {
      setDistricts([]);
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
  const formatAddress = (data) => {
    return {
      id: data?.id ? data.id : null,
      name: data?.name ? data.name : null,
      pid: data?.pid ? data.pid : null,
      code: data?.id ? data.id : null,
    };
  };
  return (
    <Formik
      enableReinitialize={true}
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={(values) =>
        onSubmit({
          ...values,
          DiaChi: {
            ...values.DiaChi,
            provinceOrCity: formatAddress(
              cities.find((p) => p.id == values.DiaChi.provinceOrCity)
            ),
            district: formatAddress(
              districts.find((p) => p.id == values.DiaChi.district)
            ),
            ward: formatAddress(
              wards.find((p) => p.id == values.DiaChi.ward)
            ),
            DiaChiDetail: values.DiaChi?.DiaChiDetail
          },
        })
      }
    >
      {(formikProps) => {
        const {
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          setFieldValue,
        } = formikProps;
        console.log(errors);
        return (
          <Form className="user-register">
            <div className="container">
              <BreadCrumb currentPage="Register" lastPage="My account" />
            </div>

            <div className="container">
              <div className="row">
                <aside id="column-left" className="col-sm-3">
                  <AsideAccount />
                </aside>

                <div id="content" className="col-sm-9">
                  <div className="row">
                    <div className="well">
                      <h2>Register</h2>
                      <p>
                        Nếu bạn đã có tài khoản bạn có thể đăng nhập ở <Link to="/account/login">
                        trang đăng nhập
                        </Link>
                        
                        .
                      </p>
                      <div className="form-horizontal">
                        <fieldset id="account">
                          <legend>Thông tin đăng ký</legend>
                          <div className="form-group required">
                            <FastField
                              component={InputField}
                              type="text"
                              name="TenKhachHang"
                              placeholder="Name"
                              id="input-name"
                              label="Họ tên"
                              breakDown
                            />
                          </div>
                          <div className="form-group required">
                            <FastField
                              component={InputField}
                              type="text"
                              name="DiaChi.DiaChiDetail"
                              placeholder="Address"
                              id="input-address"
                              label="Địa chỉ"
                            />
                          </div>
                          {/* <div className="form-group pl-12">
                            <FastField
                              component={SelectField}
                              name="DiaChi.provinceOrCity"
                              placeholder="City"
                              id="input-city"
                              label="City"
                              options={cities}
                            />
        
                          </div> */}
                          <div className="flex mb-10">
                            <div className="ml-8">
                              <label htmlFor="city" className="mr-2">
                                Thành phố
                              </label>
                              <Field
                                id="city"
                                name="DiaChi.provinceOrCity"
                                as="select"
                                onChange={(e) => {
                                  handleChange(e);
                                  onChangeCity(e);
                                  setFieldValue("DiaChi.ward", "");
                                  setFieldValue("DiaChi.district", "");
                                }}
                                className="h-10"
                                style={{
                                  borderRadius: "20px",
                                  border: `2px dotted`,
                                  padding: "1px 5px",
                                }}
                              >
                                                                <option value="">Chọn thành phố</option>

                                {cities.map((city) => (
                                  <option key={city.id} value={city.id}>
                                    {city.name}
                                  </option>
                                ))}
                              </Field>
                              {errors?.DiaChi &&
                                touched?.DiaChi &&
                                touched?.DiaChi?.provinceOrCity &&
                                errors?.DiaChi?.provinceOrCity && (
                                  <p className="text-red-700 text-center">
                                    Chưa có thành phố
                                  </p>
                                )}
                            </div>
                            <div className="ml-8">
                              <label htmlFor="district" className="mr-2">
                              Quận/huyện
                              </label>
                              <Field
                                id="district"
                                name="DiaChi.district"
                                as="select"
                                onChange={(e) => {
                                  handleChange(e);
                                  onChangeDistrict(e);
                                  setFieldValue("DiaChi.ward", "");
                                }}
                                className="h-10"
                                style={{
                                  borderRadius: "20px",
                                  border: `2px dotted`,
                                  padding: "1px 5px",
                                }}
                              >
                                <option value="">Chọn Quận/huyện</option>

                                {districts.map((district) => (
                                  <option key={district.id} value={district.id}>
                                   {district.name}
                                  </option>
                                ))}
                              </Field>
                              {errors?.DiaChi &&
                                touched?.DiaChi &&
                                touched?.DiaChi?.district &&
                                errors?.DiaChi?.district && (
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
                                name="DiaChi.ward"
                                as="select"
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                                className="h-10"
                                style={{
                                  borderRadius: "20px",
                                  border: `2px dotted`,
                                  padding: "1px 5px",
                                }}
                              >
                                <option value="">Chọn xã</option>

                                {wards.map((ward) => (
                                  <option key={ward.id} value={ward.id}>
                                    {ward.name}
                                  </option>
                                ))}
                              </Field>
                              {errors?.DiaChi &&
                                touched?.DiaChi &&
                                touched?.DiaChi?.ward &&
                                errors?.DiaChi?.ward && (
                                  <p className="text-red-700 text-center">
                                    Chưa có xã
                                  </p>
                                )}
                            </div>
                          </div>

                          <div className="form-group required">
                            <FastField
                              component={InputField}
                              type="email"
                              name="email"
                              placeholder="E-Mail"
                              id="input-email"
                              label="E-mail"
                            />
                          </div>
                          <div className="form-group required">
                            <FastField
                              component={InputField}
                              type="tel"
                              name="SDT"
                              placeholder="Telephone"
                              id="input-telephone"
                              label="Telephone"
                            />
                          </div>
                          <div className="form-group required">
                            <FastField
                              component={InputField}
                              type="date"
                              name="NgaySinh"
                              placeholder="Date of birth"
                              id="input-dob"
                              label="Ngày sinh"
                            />
                          </div>
                        </fieldset>
                        <fieldset>
                          <legend>Mật khẩu</legend>
                          <div className="form-group required">
                            <FastField
                              component={InputField}
                              type="password"
                              name="password"
                              value=""
                              placeholder="Password"
                              id="input-password"
                              label="Password"
                            />
                          </div>
                          <div className="form-group required">
                            <FastField
                              component={InputField}
                              type="password"
                              name="repassword"
                              value=""
                              placeholder="Confirm Password"
                              id="input-confirm"
                              label="Confirm Password"
                            />
                          </div>
                        </fieldset>

                        <div className="buttons">
                          <div className="centered">
                            <button
                              type="submit"
                              className="btn btn-primary flex"
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
                              Continue
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default UserRegisterForm;
