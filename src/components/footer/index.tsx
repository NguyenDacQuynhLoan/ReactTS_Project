import './style.scss';
export default function Footer() {
  return (
    <div>
      <div className="footer text-white py-5">
        <div className="wrapped">
          <div className="footer-container flex justify-between">
            <div className="store text-left">
              <div className="title font-bold py-2">
                <h5>Tìm cửa hàng</h5>
              </div>
              <div className="content">
                <ul>
                  <li>Tìm cửa hàng gần nhất</li>
                  <li>Mua hàng từ xa</li>
                </ul>
              </div>
              <div className="title font-bold py-2">
                <h5>Phương thức thanh toán</h5>
              </div>
            </div>
            <div className="contact text-left">
              <div className="content">
                <ul>
                  <li>
                    Gọi mua hàng : <b>1800.2097</b>(8h00 - 22h00)
                  </li>
                  <li>
                    Gọi khiếu nại : <b>1800.2063</b> (8h00 - 21h30)
                  </li>
                  <li>
                    Gọi bảo hành : <b>1800.2064</b> (8h00 - 21h00)
                  </li>
                </ul>
              </div>
              <div className="title">
                <h5>Đối tác dịch vụ bảo hành</h5>
              </div>
            </div>
            <div className="rules text-left">
              <div className="content">
                <ul>
                  <li>Mua hàng và thanh toán Online</li>
                  <li>Mua hàng trả góp Online</li>
                  <li>Tra cứu thông tin đơn hàng</li>
                  <li>Tra thông tin bảo hành</li>
                  <li>Tra thông tin hóa đơn điện tử</li>
                  <li>Trung tâm bảo hành chính hãng</li>
                  <li>Dịch vụ và Chính sách bảo hành </li>
                  <li>Quy chế hoạt động</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
