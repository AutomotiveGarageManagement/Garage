$(document).ready(function () {
  // var storedData = localStorage.getItem("mockData");
  // var mockData = JSON.parse(storedData);

  // console.log(mockData);

  function renderTableStaffs(data) {
    var tableBody = $("#StaffListTable tbody");
    tableBody.empty(); // Xóa dữ liệu cũ trong bảng

    $.each(data, function (index, item) {
      var row = $("<tr>");
      //<th id="Td_ID_1" scope="row">1</th>
      row.append($("<th>").attr("scope", "row").text(item.MaTTNV));
      row.append($("<td>").text(item.HoTen));
      row.append($("<td>").text(item.SDT));
      var tdChucVu = $("<td>");

      if (item.TenChucVu == "Admin") {
        spanChucVu = $("<span>")
          .addClass("label label-purple")
          .text(item.TenChucVu);
      } else if (item.TenChucVu === "Accountant") {
        spanChucVu = $("<span>")
          .addClass("label label-success")
          .text(item.TenChucVu);
      } else {
        spanChucVu = $("<span>")
          .addClass("label label-primary")
          .text(item.TenChucVu);
      }
      tdChucVu.append(spanChucVu);
      row.append(tdChucVu);

      var btnXem = $("<button>")
        .attr("id", item.MaTTNV)
        .addClass("btn-info btn text-white")
        .append($("<span>").addClass("fw-bold").text("Xem"))
        .attr("data-toggle", "modal")
        .attr("data-target", "#popup");
      row.append($("<td>").append(btnXem));

      btnXem.click(function () {
        // Xử lý sự kiện nhấn nút Xoá
        var buttonId = $(this).attr("id");
        var modalBody = $("<div>").addClass("modal-body");

        var row1 = $("<div>").addClass("row");
        row1.append(
          $("<div>")
            .addClass("col-6")
            .text("Họ tên: " + item.HoTen)
        );
        row1.append(
          $("<div>")
            .addClass("col-6")
            .text("CMND: " + item.CMND)
        );

        var row2 = $("<div>").addClass("row");
        row2.append(
          $("<div>")
            .addClass("col-6")
            .text("Địa chỉ: " + item.DiaChi)
        );
        row2.append(
          $("<div>")
            .addClass("col-6")
            .text("SĐT:" + item.SDT)
        );
        modalBody.append(row1, row2);

        var row3 = $("<div>").addClass("row");
        row3.append(
          $("<div>")
            .addClass("col-6")
            .text("Tài khoản: " + item.TenTaiKhoan)
        );
        row3.append(
          $("<div>")
            .addClass("col-6")
            .text("Mật khẩu: " + item.MatKhau)
        );

        modalBody.append(row3);

        var row4 = $("<div>").addClass("row");
        row4.append($("<div>").addClass("col-6").text("Chúc vụ:"));
        row4.append($("<div>").addClass("col-6").text(item.TenChucVu));

        var row6 = $("<div>").addClass("row text-center mt-3");
        row6.append(
          $("<div>")
            .addClass("col-6")
            .append(
              $("<button>")
                .addClass("btn btn-primary text-white w-75")
                .text("Sửa")
                .click(function () {
                  console.log("Đã nhấn nút Sửa với ID: " + buttonId);
                })
            )
        );
        row6.append(
          $("<div>")
            .addClass("col-6")
            .append(
              $("<button>")
                .addClass("btn btn-danger text-white w-75")
                .text("Xoá")
                .click(function () {
                  console.log("Đã nhấn nút Xoá với ID: " + buttonId);
                })
            )
        );
        modalBody.append(row6);
        //xoá data popup khi tắt
        $("#popup .modal-body").append(modalBody);
        $("#popup").on("hidden.bs.modal", function () {
          $("#popup .modal-body").empty();
        });
      });

      tableBody.append(row);
    });
  }

  //get all staffs
  fetch("http://localhost:8888/api/staff/getAll", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      Tabledata = data.DT;

      renderTableStaffs(Tabledata);
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
    })
    .catch((error) => console.log(error));
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

    location.reload();
  });
});
