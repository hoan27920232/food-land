import React, { useEffect, useState } from "react";
import UserInfoForm from "./UserInfoForm";
import { useDispatch, useSelector } from "react-redux";
import { me, saveUser } from "api/userApi";
import moment from "moment";
import { getMe, setToken } from "../Login/loginSlice";
import { store } from "react-notifications-component";

UserInfo.propTypes = {};

function UserInfo() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.me.user);
  const [initialValues, setInitialValues] = useState({
    // TenKhachHang: user && user.TenKhachHang ? user.TenKhachHang : "",
    // DiaChi: user && user.DiaChi ? user.DiaChi : "",
    // email: user && user.email ? user.email : "",
    // SDT: user && user.SDT ? user.SDT : "",
    // NgaySinh: user && user.NgaySinh ? moment(user.NgaySinh).format('YYYY-MM-DD') : "",
  });
  const handleSubmit = async (values) => {
    // console.log({...values, password : user.password, NgaySinh : Date.parse(values.NgaySinh), _id : user._id, TrangThai : 1})
    const action = await saveUser({
      ...values,
      password: user.password,
      _id: user._id,
    })
      .then((data) => {
        const actionToken = setToken(data.token);
        dispatch(actionToken);
        store.addNotification({
          title: "Wonderful!",
          message: "Update information successfully",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: false,
          },
        });
      })
      .catch((err) => {
        store.addNotification({
          title: "Oops!",
          message: "Update information failed\n" + err,
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated animate__fadeIn"],
          animationOut: ["animate__animated animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: false,
          },
        });
      });
    const actionMe = getMe();
    await dispatch(actionMe);
  };
  useEffect(() => {
    async function fectchAPI() {
      const actionMe = await me().then((data) => {
        console.log(data, "data");
        setInitialValues({
          TenKhachHang: data && data.TenKhachHang ? data.TenKhachHang : "",
          DiaChi: data && data.DiaChi && data.DiaChi,
          email: data && data.email && data.email,
          SDT: data && data.SDT && data.SDT,
          NgaySinh:
            data && data.NgaySinh && moment(data.NgaySinh).format("YYYY-MM-DD"),
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
        });
      });
    }
    fectchAPI();
  }, []);
  return (
    <>
      <UserInfoForm onSubmit={handleSubmit} initialValues={initialValues} />
    </>
  );
}

export default UserInfo;
