import React from "react";
import { Link, useHistory } from "react-router-dom";
import { logout } from "features/User/Login/loginSlice";
import { useSelector, useDispatch } from "react-redux";

function AsideAccountInside() {
    const history = useHistory();
    const dispatch = useDispatch();
    const handleLogout = () => {
        localStorage.removeItem("token");
        const action = logout();
        dispatch(action);
        history.push("/");
      };
	return (
		<div className="category-list">
            <div className="box-category">
                <h3 className="toggled relative">TÀI KHOẢN</h3>
                <ul className="list-unstyled parent" id="selectMe-desk">
                    <li className="">
                        <Link to="/account">
                            <a className="list-group-item ">Thông tin tài khoản<span></span></a>
                        </Link>
                    </li>
                    <li className="">
                        <Link to="/account/history-purchase">
                            <a className="list-group-item ">Lịch sử mua hàng<span></span></a>
                        </Link>
                    </li>
                    <li className="">
                        <Link to="/account/change-password">
                            <a className="list-group-item ">Đổi mật khẩu<span></span></a>
                        </Link>
                    </li>
                    <li className="">
                        <Link to="/account">
                            <a className="list-group-item " onClick={()=> {handleLogout()}}>Đăng xuất<span></span></a>
                        </Link>
                    </li>
                </ul>
	        </div>
        </div>
	);
}

export default AsideAccountInside;