import React from "react";
import thucpham from '../../assets/images/thuc-pham.jpg'
import gift from '../../assets/images/gift.jpg'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

Contact.propTypes = {};

function Contact(props) {
  const center = {
    lat: 59.95,
    lng: 30.33,
  };
  const zoom = 11;
  return (
    <div>
      <section id="ve-trang-web" className="py-1 px-24 bg-blueGray-50">
        <div className="w-full mb-12 xl:mb-0 px-4 mx-auto mt-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t mb-0 px-4 py-3 border-0 flex-row lg:flex lg:flex-col-2">
              <div className="rounded-t mb-0 px-6 py-4 border-0 m-6 lg:w-1/2">
                <p className="text-2xl lg:text-4xl py-4">Thông tin</p>
                <div className="text-base lg:text-xl space-y-3">
                  <p>
                    <span className="ml-0 underline">Tên đề tài:</span>
                    <span className="italic ">
                      Đề tài xây dựng website bán thực phẩm Tây Bắc{" "}
                    </span>
                  </p>
                  <p>Người thực hiện đồ án: Đỗ Bá Hoàn</p>
                  <p>GVHD: ThS Vũ Đức Huy</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center lg:w-1/2">
                <div className="relative w-full max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">
                    <div style={{ height: "80vh", width: "100%" }}>
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14890.731957720101!2d105.70353978612658!3d21.085319996549597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313455c70a56c4e9%3A0xb794570100f480c8!2zVMOibiBM4bqtcCwgxJBhbiBQaMaw4bujbmcsIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1637030285923!5m2!1svi!2s"
                        width="600"
                        height="450"
                        style={{
                          height: "80vh",
                          width: "100%",
                          padding: "50px",
                          display: "block",
                        }}
                        loading="lazy"
                      ></iframe>
                    </div>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="thong-tin-van-chuyen" className="py-1 px-24 bg-blueGray-50">
        <div className="w-full mb-12 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t px-4 py-3 border-0 flex-row lg:flex lg:flex-col-2">
              <div className="rounded-t px-32 py-4 border-0 m-6 lg:w-full">
                <p className="text-2xl lg:text-4xl py-4">
                  Thông tin vận chuyện
                </p>
                <div className="text-base lg:text-xl space-y-3">
                  <span className="font-bold italic ml-0">
                    Nhân viên sẽ gọi xác nhận về hình thức giao hàng và biểu phí
                    sau khi quý khách đặt hàng thành công
                  </span>
                  <br /> <br />
                  <p className="font-bold">Thời gian giao hàng</p>
                  <ul className="list-disc text-base">
                    <li>
                      Đối với các đơn hàng giao tại Hồ Chí Minh – Hà Nội thời
                      gian chuyển bị và giao hàng sẽ từ 01 – 03 ngày làm việc
                      đối với sản phẩm theo kích thước tiêu chuẩn, và từ 03-07
                      ngày làm việc theo kích thước khách yêu cầu.{" "}
                    </li>
                    <li>
                      Đối với khách hàng ở các tỉnh thành khác thì thời gian
                      chuyển bị và giao hàng dự kiến từ 03 – 12 ngày kể từ lúc
                      bạn lên đơn hàng và được xác định chính xác qua đơn vị
                      giao vận như GHTK
                    </li>
                  </ul>
                  <p className="font-bold">Hủy đơn hàng</p>
                  <ul className="list-disc text-base">
                    <li>
                      Đơn hàng của bạn sẽ bị hủy nếu sau 03 lần nhân viên giao
                      hàng hay nhân viên chăm sóc khách hàng liên lạc với bạn.{" "}
                      <br />
                      Nếu bạn đã nhận đơn hàng nhưng không đồng ý nhận sản phẩm
                      vì một lý do nào đó, thì bạn sẽ là người trực tiếp thanh
                      toán tiền vận chuyển cho nhân viên giao nhận.
                    </li>
                    <li>
                      Nếu đơn hàng của bạn đã được đóng gói và chưa được gửi đi,
                      bạn có quyền được hủy đơn hàng mà không phải chịu bất cứ
                      chi phí phát sinh nào cả.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="dieu-khoan-hoan-tra" className="py-1 px-24 bg-blueGray-50">
        <div className="w-full mb-12 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t px-4 py-3 border-0 flex-row lg:flex lg:flex-col-2">
              <div className="rounded-t px-32 py-4 border-0 m-6 lg:w-full">
                <p className="text-2xl lg:text-4xl py-4">Điều khoản hoàn trả</p>
                <div className="text-base lg:text-xl space-y-3">
                  <p className="font-bold">
                    Các trường hợp được đổi trả sản phẩm:
                  </p>

                  <p className="text-lg italic">– Sản phẩm mua bị lỗi</p>
                  <p className="text-lg">
                    Quý khách vui lòng kiểm tra sản phẩm trước khi thanh toán.
                    Trong trường hợp sản phẩm bị hư hại trong quá trình vận
                    chuyển, quý khách vui lòng từ chối và gửi lại sản phẩm cho
                    chúng tôi
                  </p>
                  <p className="text-lg italic">
                    {" "}
                    – Sản phẩm giao không đúng theo đơn đặt hàng:
                  </p>
                  <p className="text-lg">
                    Bạn nghĩ rằng sản phẩm giao cho bạn không đúng với đơn đặt
                    hàng? Hãy liên hệ với chúng tôi càng sớm càng tốt, hệ thống
                    của chúng tôi sẽ kiểm tra nếu hàng của bạn bị gửi nhầm.
                    Trong trường hợp đó, chúng tôi sẽ thay thế đúng mặt hàng bạn
                    yêu cầu (khi có hàng).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="thuong-hieu" className="py-1 px-24 bg-blueGray-50">
        <div className="w-full mb-12 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t px-4 py-3 border-0 flex-row lg:flex lg:flex-col-2">
              <div className="rounded-t px-32 py-4 border-0 m-6 lg:w-full">
                <p className="text-2xl lg:text-4xl py-4">Thương hiệu</p>
                <div className="text-base lg:text-xl space-y-3 flex flex-wrap justify-center">
                  <img src={thucpham} alt="" />
                  <p className="text-lg">
                    Tây Bắc được mệnh danh là thiên đường ẩm thực của rất nhiều
                    món ăn ngon, đẹp và lạ mắt. Khi nhắc đến văn hóa ẩm thực Tây
                    Bắc người ta thường nhớ tới các món ăn được chế biến theo
                    cách riêng của đồng bào dân tộc nơi đây. Những món ăn có lẽ
                    đã đi vào tiềm thức của mỗi người mà mỗi khi nhắc dù đã có
                    cơ hội thưởng thức hay chưa người ta đều có thể kể tên ra
                    các món đó là: món thắng cố ngựa, xôi màu, cơm lam, thịt
                    trâu, bò sấy gác bếp, cá nướng, lạp sườn hay khẩu nhục….
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="qua-tang" className="py-1 px-24 bg-blueGray-50">
        <div className="w-full mb-12 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t px-4 py-3 border-0 flex-row lg:flex lg:flex-col-2">
              <div className="rounded-t px-32 py-4 border-0 m-6 lg:w-full">
                <p className="text-2xl lg:text-4xl py-4">Quà tặng</p>
                <div className="text-base lg:text-xl space-y-3 flex flex-wrap justify-center">
                <img src={gift} alt="" />

                  <p className="text-lg w-full text-center">
                    Khi mua hàng quý khách sẽ được tặng các phần quà ngẫu nhiên...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
