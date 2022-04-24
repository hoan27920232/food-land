import React from "react";
import PropTypes from "prop-types";
import UserRegisterForm from "./UserRegisterForm";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveUser } from "api/userApi";
import { store } from 'react-notifications-component';

UserRegister.propTypes = {};

function UserRegister() {
    const history = useHistory();
    const dispatch = useDispatch();
    const initialValues = {
        TenKhachHang: "",
        DiaChi: "",
        email: "",
        SDT: "",
        password: "",
        repassword: "",
        NgaySinh: "",
        shippingAddress: {
            provinceOrCity: null,
            district: null,
            ward: null,
        },
    }
    const handleSubmit =async (values) => {
        console.log(values)
        const action = await saveUser({...values, NgaySinh : Date.parse(values.NgaySinh), _id : 0, TrangThai : 1})
        .then(data => {
            store.addNotification({
                title: "Wonderful!",
                message: "Register successfully",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: false
                }
            })
            history.push("/account");
        }
            
        )
        .catch(err => store.addNotification({
            title: "Oops!",
            message: "Register failed \n" + err.message,
            type: 'danger',
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated animate__fadeIn"],
            animationOut: ["animate__animated animate__fadeOut"],
            dismiss: {
                duration: 5000,
                onScreen: false
            }
        }))
    };
    return (
        <>
            <UserRegisterForm onSubmit={handleSubmit} initialValues={initialValues} />
        </>
    );
}

export default UserRegister;
