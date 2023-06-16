// table supplier
$(document).ready(function () {
  // Kích hoạt DataTables
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
