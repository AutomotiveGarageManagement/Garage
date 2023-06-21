//car brands
$(document).ready(function () {
  // Kích hoạt DataTables
  fetch("http://localhost:8888/api/parameter/get/parameters", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      param = data.DT[0];
      console.log(param.SoLuongXeToiDa, param.PhanTramTienLoiCuaSanPham);

      $("#InputSoxeToiDa").val(param.SoLuongXeToiDa);
      $("#InputTiLe").val(param.PhanTramTienLoiCuaSanPham);
      $("#BtnDieuChinh").click(function (e) {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của nút submit (nếu có)
        var xetoida = parseInt($("#InputSoxeToiDa").val());
        var tilephantram = parseInt($("#InputTiLe").val());
        // gửi tại đây!
        fetch("http://localhost:8888/api/parameter/update/parameters", {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            SoLuongXeToiDa: xetoida,
            PhanTramTienLoiCuaSanPham: tilephantram,
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
      });
    })
    .catch((error) => console.log("ERROR"));

  function renderTableCarBrands(data) {
    var tableBody = $("#CarBrandTable tbody");
    tableBody.empty(); // Xóa dữ liệu cũ trong bảng
    console.log(data);
    $.each(data, function (index, item) {
      var row = $("<tr>");
      console.log(item.id);
      row.append($("<th>").attr("scope", "row").text(item.id));
      row.append($("<td>").text(item.TenHX));
      tableBody.append(row);
    });
  }
  fetch("http://localhost:8888/api/carBrand/get/brands", {
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
      renderTableCarBrands(Tabledata);
      $("#CarBrandTable").DataTable({
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
    .catch((error) => console.log("ERROR"));
});

// table wage
$(document).ready(function () {
  // Kích hoạt DataTables

  function renderTableWageTypes(data) {
    var tableBody = $("#WageListTable tbody");
    tableBody.empty(); // Xóa dữ liệu cũ trong bảng
    //   {
    //     "id": 1,
    //     "LoaiTienCong": "Làm sạch",
    //     "GiaTriTienCong": 50000
    // }

    $.each(data, function (index, item) {
      console.log(item.id, item.LoaiTienCong, item.GiaTriTienCong);
      var roww = $("<tr>");
      roww.append($("<th>").attr("scope", "row").text(item.id));
      console.log(item.id);
      roww.append($("<td>").text(item.LoaiTienCong));
      roww.append($("<td>").text(item.GiaTriTienCong));

      var buttonsw = $("<div>").addClass("row");

      var colw2 = $("<div>").addClass("col");

      var btnwXoa = $("<button>")
        .attr("id", item.id)
        .addClass("btn-danger btn text-white")
        .append($("<span>").addClass("fw-bold").text("Xoá"))
        .click(() => {
          // Thực hiện các thao tác cần thiết khi nhấn nút Xoá
          console.log("Đã nhấn nút Xoá với ID: " + item.id);
          fetch("http://localhost:8888/api/wage/delete/wage/" + item.id, {
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
            })
            .catch((error) => console.log("ERROR"));
        });
      colw2.append(btnwXoa);
      buttonsw.append(colw2);

      roww.append($("<td>").append(buttonsw));
      tableBody.append(roww);
    });
  }
  fetch("http://localhost:8888/api/wage/get/wages", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      Tabledataw = data.DT;
      renderTableWageTypes(Tabledataw);
      $("#WageListTable").DataTable({
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
    .catch((error) => console.log("ERROR WAGE TYPES"));
});

// thêm
$(document).ready(function () {
  // thêm hiệu xe
  $("#BtnThemHieuXe").click(function (e) {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của nút submit (nếu có)

    // Lấy giá trị từ các trường nhập liệu
    var TenHX = $("#InputThemHieuXe").val();
    console.log(TenHX);
    // gửi tại đây!
    if (TenHX !== "") {
      fetch("http://localhost:8888/api/carBrand/create/brand", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          TenHX: TenHX,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => console.log(data))
        .catch((error) => console.log("ERROR"));
    }

    //location.reload();
  });
  //điều chỉnh xe tối đa trong ngày

  //thêm tiền công
  $("#BtnThemTienCong").click(function (e) {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của nút submit (nếu có)

    // Lấy giá trị từ các trường nhập liệu
    var LoaiTienCong = $("#InputThemLoaiTienCong").val();
    var GiaTriTienCong = $("#InputGiaTriTienCong").val();
    console.log(LoaiTienCong, GiaTriTienCong);
    // gửi tại đây!
    if (LoaiTienCong !== "") {
      fetch("http://localhost:8888/api/wage/create/wage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          LoaiTienCong: LoaiTienCong,
          GiaTriTienCong: GiaTriTienCong,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => console.log(data))
        .catch((error) => console.log("ERROR"));
    }

    location.reload();
  });
});
