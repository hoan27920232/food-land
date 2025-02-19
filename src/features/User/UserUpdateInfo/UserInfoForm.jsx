import React, { useEffect, useRef, useState } from "react";
import BreadCrumb from "components/BreadCrumb";
import AsideAccountInside from "components/Aside/AsideAccountInside";
import { FastField, Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import InputField from "components/InputField";
import PropTypes from "prop-types";
import * as Yup from "yup";
import axios from "axios";

UserInfoForm.propTypes = {
  onSubmit: PropTypes.func,
  initialValues: PropTypes.object,
};

UserInfoForm.defaultProps = {
  onSubmit: null,
  initialValues: {
    TenKhachHang: "",
    email: "",
    SDT: "",
    NgaySinh: "",
    DiaChi: {
      provinceOrCity: null,
      district: null,
      ward: null,
      DiaChiDetail: "",

    },
  },
};

function UserInfoForm(props) {
  const { onSubmit, initialValues } = props;
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const ref = useRef(null);

  const handleReset = (resetForm) => {
    resetForm();
  };
  const validationSchema = Yup.object().shape({
    TenKhachHang: Yup.string().required("This field is required"),
    email: Yup.string().required("This field is required"),
    SDT: Yup.number().required("This field is required"),
    NgaySinh: Yup.date().required("This field is required"),
    DiaChi: Yup.object().shape({
      provinceOrCity: Yup.string().required(),
      district: Yup.string().required(),
      ward: Yup.string().required(),
      DiaChiDetail: Yup.string().required("This field is required"),
    }),
  });
  const getInfor = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}ghtk/vnlocations/0`
    );
    setCities(res.data);
    const res2 = await axios.get(
      `${process.env.REACT_APP_API_URL}ghtk/vnlocations/${ref?.current?.values?.DiaChi?.provinceOrCity}`
    );
    setDistricts(res2.data);
    const res3 = await axios.get(
      `${process.env.REACT_APP_API_URL}ghtk/vnlocations/${ref?.current?.values?.DiaChi?.district}`
    );
    setWards(res3.data);
  };
  useEffect(() => {
    setTimeout(() => {
      console.log(ref?.current?.values);
      getInfor();
    }, 1000);
  }, []);
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
    innerRef={ref}
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
      enableReinitialize
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
        return (
          <Form className="user-update">
            <div className="container">
              <BreadCrumb currentPage="My account" />
            </div>

            <div className="container">
              <div className="row">
                <aside id="column-left" className="col-sm-3">
                  <AsideAccountInside />
                </aside>

                <div id="content" className="col-sm-9">
                  <div className="row">
                    <div className="well">
                      <h2>Thông tin tài khoản</h2>
                      <div class="form-horizontal">
                        <fieldset id="account">
                          <div class="form-group required">
                            <FastField
                              component={InputField}
                              type="text"
                              name="TenKhachHang"
                              placeholder="Name"
                              id="input-name"
                              class="form-control margin-bottom-20px"
                              label="Họ tên"
                            />
                          </div>
                          <div class="form-group required">
                            <FastField
                              component={InputField}
                              type="text"
                              name="DiaChi.DiaChiDetail"
                              placeholder="Address"
                              id="input-address"
                              class="form-control margin-bottom-20px"
                              label="Địa chỉ"
                            />
                          </div>
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
                          <div class="form-group required">
                            <FastField
                              component={InputField}
                              type="email"
                              name="email"
                              placeholder="E-Mail"
                              id="input-email"
                              class="form-control margin-bottom-20px"
                              label="E-mail"
                            />
                          </div>
                          <div class="form-group required">
                            <FastField
                              component={InputField}
                              type="tel"
                              name="SDT"
                              placeholder="Telephone"
                              id="input-telephone"
                              class="form-control margin-bottom-20px"
                              label="Telephone"
                            />
                          </div>
                          <div class="form-group required">
                            <FastField
                              component={InputField}
                              type="date"
                              name="NgaySinh"
                              placeholder="Date of birth"
                              id="input-dob"
                              class="form-control margin-bottom-20px"
                              label="Ngày sinh"
                            />
                          </div>
                        </fieldset>
                        <div class="buttons">
                          <div class="centered">
                            <button
                              type="button"
                              class="btn btn-primary"
                              style={{ marginRight: "10px" }}
                              onClick={handleReset.bind(
                                null,
                                formikProps.resetForm
                              )}
                            >
                              Back
                            </button>
                            <button type="submit" class="btn btn-primary">
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
                              Cập nhật
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

export default UserInfoForm;
