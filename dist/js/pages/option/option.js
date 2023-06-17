//car brands
$(document).ready(function () {
  // Kích hoạt DataTables

  function renderTableCarBrands(data) {
    var tableBody = $("#CarBrandTable tbody");
    tableBody.empty(); // Xóa dữ liệu cũ trong bảng

    $.each(data, function (index, item) {
      var row = $("<tr>");
      row.append($("<th>").attr("scope", "row").text(item.Id));
      row.append($("<td>").text(item.HieuXe));

      var buttons = $("<div>").addClass("row");
      var col1 = $("<div>").addClass("col");
      var col2 = $("<div>").addClass("col");

      var btnSua = $("<button>")
        .attr("id", item.Id)
        .addClass("btn-info btn text-white")
        .append($("<span>").addClass("fw-bold").text("Sửa"));

      var btnXoa = $("<button>")
        .attr("id", item.Id)
        .addClass("btn-danger btn text-white")
        .append($("<span>").addClass("fw-bold").text("Xoá"));

      col1.append(btnSua);
      col2.append(btnXoa);
      buttons.append(col1, col2);

      row.append($("<td>").append(buttons));

      // var td = $("<td>"); // Tạo thẻ td

      // var divRow = $("<div>").addClass("row"); // Tạo thẻ div với class "row"

      // var divColSua = $("<div>").addClass("col"); // Tạo thẻ div với class "col" cho nút Sửa
      // var btnSua = $("<button>")
      //   .attr("id", item.Id)
      //   .addClass("btn-info btn text-white")
      //   .append($("<span>").addClass("fw-bold").text("Sửa")); // Tạo nút Sửa và thiết lập các thuộc tính
      btnSua.click(function () {
        // Xử lý sự kiện nhấn nút Xoá
        var buttonId = $(this).attr("id");
        // Thực hiện các thao tác cần thiết khi nhấn nút Xoá
        console.log("Đã nhấn nút Sửa với ID: " + buttonId);
      });
      // divColSua.append(btnSua); // Thêm nút Sửa vào thẻ div "col"
      // divRow.append(divColSua); // Thêm thẻ div "col" vào thẻ div "row"

      // var divColXoa = $("<div>").addClass("col"); // Tạo thẻ div với class "col" cho nút Xoá
      // var btnXoa = $("<button>")
      //   .attr("id", item.Id)
      //   .addClass("btn-danger btn text-white")
      //   .append($("<span>").addClass("fw-bold").text("Xoá")); // Tạo nút Xoá và thiết lập các thuộc tính
      btnXoa.click(function () {
        // Xử lý sự kiện nhấn nút Xoá
        var buttonId = $(this).attr("id");
        // Thực hiện các thao tác cần thiết khi nhấn nút Xoá
        console.log("Đã nhấn nút Xoá với ID: " + buttonId);
      });
      // divColXoa.append(btnXoa); // Thêm nút Xoá vào thẻ div "col"
      // divRow.append(divColXoa); // Thêm thẻ div "col" vào thẻ div "row"

      // td.append(divRow); // Thêm thẻ div "row" vào thẻ td
      // row.append($("<td>").append(link));

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
    .then((data) => console.log(data))
    // .catch((error) => console.log("ERROR"));
    .catch((error) => {
      Tabledata = [
        {
          Id: 1,
          HieuXe: "BMW",
        },
        {
          Id: 2,
          HieuXe: "Toyota",
        },
      ];
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
    });
});

// table wage
$(document).ready(function () {
  // Kích hoạt DataTables
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
  $("#BtnDieuChinh").click(function (e) {
    e.preventDefault(); //
    // Lấy giá trị từ các trường nhập liệu
    var XeToiDa = $("#InputSoxeToiDa").val();
    var NoToiDa = $("#InputTienNoToiDa").val();
    console.log(XeToiDa, NoToiDa);
    // gửi tại đây!
    var API = "";
    fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        XeToiDa: XeToiDa,
        NoToiDa: NoToiDa,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.log("ERROR"));

    //location.reload();
  });

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

    //location.reload();
  });
});
