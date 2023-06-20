$(document).ready(function () {
  var MaChucVuI;
  var GioiTinhI;
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
      GioiTinhI = item.GioiTinh;
      var tdChucVu = $("<td>");

      if (item.TenChucVu == "Admin") {
        spanChucVu = $("<span>")
          .addClass("label label-purple")
          .text(item.TenChucVu);
        MaChucVuI = 0;
      } else if (item.TenChucVu === "Accountant") {
        spanChucVu = $("<span>")
          .addClass("label label-success")
          .text(item.TenChucVu);
        MaChucVuI = 1;
      } else {
        spanChucVu = $("<span>")
          .addClass("label label-primary")
          .text(item.TenChucVu);
        MaChucVuI = 2;
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
        var buttonId = $(this).attr("id");
        var modalBody = $("<div>").addClass("modal-body");

        var row1 = $("<div>").addClass("row");

        var divCol6 = $("<div>").addClass("col-6");
        var inputElement = $("<input>")
          .attr("type", "text")
          .val(item.HoTen)
          .attr("id", "InputStaffDetail_Name");
        divCol6.append("Họ tên: ", inputElement);
        row1.append(divCol6);

        var divCol6 = $("<div>").addClass("col-6");
        var inputElement = $("<input>")
          .attr("type", "text")
          .val(item.CMND)
          .attr("id", "InputStaffDetail_CMND");
        divCol6.append("CMND: ", inputElement);
        row1.append(divCol6);

        var row2 = $("<div>").addClass("row");

        var divCol6 = $("<div>").addClass("col-6");
        var inputElement = $("<input>")
          .attr("type", "text")
          .val(item.DiaChi)
          .attr("id", "InputStaffDetail_DiaChi");
        divCol6.append("Địa chỉ: ", inputElement);
        row2.append(divCol6);

        var divCol6 = $("<div>").addClass("col-6");
        var inputElement = $("<input>")
          .attr("type", "text")
          .val(item.SDT)
          .attr("id", "InputStaffDetail_SDT");
        divCol6.append("SDT: ", inputElement);
        row2.append(divCol6);

        modalBody.append(row1, row2);

        var row3 = $("<div>").addClass("row");
        var divCol6 = $("<div>").addClass("col-6");
        var inputElement = $("<input>")
          .attr("type", "text")
          .val(item.TenTaiKhoan)
          .attr("id", "InputStaffDetail_TenTaiKhoan");
        divCol6.append("Tên tài khoản: ", inputElement);
        row3.append(divCol6);

        var divCol6 = $("<div>").addClass("col-6");
        var inputElement = $("<input>")
          .attr("type", "text")
          .val(item.MatKhau)
          .attr("id", "InputStaffDetail_MatKhau");
        divCol6.append("Mật khẩu: ", inputElement);
        row3.append(divCol6);

        modalBody.append(row3);

        var row6 = $("<div>").addClass("row text-center mt-3");

        row6.append(
          $("<div>")
            .addClass("col-6")
            .append(
              $("<button>")
                .addClass("btn btn-primary text-white w-75")
                .text("Sửa")
                .click(function () {
                  var CMND = $("#InputStaffDetail_CMND").val();
                  var DiaChi = $("#InputStaffDetail_DiaChi").val();
                  var SDT = $("#InputStaffDetail_SDT").val();
                  var HoTen = $("#InputStaffDetail_Name").val();
                  var TenTaiKhoan = $("#InputStaffDetail_TenTaiKhoan").val();
                  var MatKhau = $("#InputStaffDetail_MatKhau").val();
                  console.log("Đã nhấn nút Sửa với ID: " + buttonId);
                  console.log(HoTen, CMND, DiaChi, SDT, TenTaiKhoan, MatKhau);
                  fetch("http://localhost:8888/api/staff/update/" + buttonId, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                      HoTen: HoTen,
                      GioiTinh: GioiTinhI,
                      CMND: CMND,
                      DiaChi: DiaChi,
                      SDT: SDT,
                      MaChucVu: parseInt(MaChucVuI),
                      TenTaiKhoan: TenTaiKhoan,
                      MatKhau: MatKhau,
                    }),
                  })
                    .then((res) => {
                      return res.json();
                    })
                    .then((data) => {
                      console.log(data);
                      location.reload();
                    })
                    .catch((error) => console.log("ERROR"));

                  // location.reload();
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
                  fetch("http://localhost:8888/api/staff/delete/" + buttonId, {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  })
                    .then((res) => {
                      return res.json();
                    })
                    .then((data) => {
                      console.log(data);
                      location.reload();
                    })
                    .catch((error) => console.log(error));
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
