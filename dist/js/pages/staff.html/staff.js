$(document).ready(function () {
  // var storedData = localStorage.getItem("mockData");
  // var mockData = JSON.parse(storedData);

  // console.log(mockData);
  // Kích hoạt DataTables
  $("#StaffListTable").DataTable({
    // Cấu hình thanh tìm kiếm
    searching: true,
    // Cấu hình điều hướng trang
    paging: true,
    // Cấu hình số bản ghi hiển thị trên mỗi trang
    pageLength: 10,
    // Cấu hình ngôn ngữ hiển thị
    language: {
      search: "Tìm kiếm:",
      lengthMenu: "Hiển thị _MENU_ bản ghi",
      info: "Hiển thị từ _START_ đến _END_ của _TOTAL_ bản ghi",
      infoEmpty: "Hiển thị từ 0 đến 0 của 0 bản ghi",
      infoFiltered: "(được lọc từ tổng số _MAX_ bản ghi)",
      paginate: {
        first: "Đầu",
        last: "Cuối",
        next: "Tiếp",
        previous: "Trước",
      },
    },
  });

  //get all staffs
  fetch("http://localhost:8888/api/staff/getAll", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => console.log(data))
    .catch((error) => console.log("ERROR"));

  $("#BtnThemNV").click(function (e) {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của nút submit (nếu có)

    // Lấy giá trị từ các trường nhập liệu
    var HoTen = $("#InputTenNV").val();
    var GioiTinh;
    // Lấy radio buttons bằng tên name
    var gioiTinhNam = document.getElementById("InputGioiTinhNam");
    var gioiTinhNu = document.getElementById("InputGioiTinhNu");

    // Kiểm tra radio button đã được chọn hay chưa
    if (gioiTinhNam.checked) {
      GioiTinh = gioiTinhNam.value; // Lấy giá trị của radio button Nam
    } else {
      GioiTinh = gioiTinhNu.value; // Lấy giá trị của radio button Nữ
    }

    var CMND = $("#InputCMND").val();
    var DiaChi = $("#InputDiaChi").val();
    var SDT = $("#InputSDT").val();
    var MaChucVu = $("#InputChucVu").val();
    var TenTaiKhoan = $("#InputTaiKhoan").val();
    var MatKhau = $("#InputMatKhau").val();
    console.log(
      HoTen,
      GioiTinh,
      CMND,
      DiaChi,
      SDT,
      MaChucVu,
      TenTaiKhoan,
      MatKhau
    );
    // gửi tại đây!
    var API = "http://localhost:8888/api/staff/create";
    fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        HoTen: HoTen,
        GioiTinh: GioiTinh,
        CMND: CMND,
        DiaChi: DiaChi,
        SDT: SDT,
        MaChucVu: MaChucVu,
        TenTaiKhoan: TenTaiKhoan,
        MatKhau: MatKhau,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.log("ERROR"));

    //location.reload();
  });
});
