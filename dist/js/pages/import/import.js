//import item table setting
$(document).ready(function () {
  // Kích hoạt DataTables
  $("#ImportItemWarehouseTable").DataTable({
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

//import item table setting
$(document).ready(function () {
  // Kích hoạt DataTables
  $("#ImportItemHistoryWarehouseTable").DataTable({
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

//pop up nhập hàng
document
  .getElementById("HoanThanhThanhToan")
  .addEventListener("click", function () {
    // Tìm popup theo id và ẩn nó
  });

//popup chi tiết nhập
$(document).ready(function () {
  // Kích hoạt DataTables
  $("#HistoryDetailWarehouseTable").DataTable({
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
// table supplier
$(document).ready(function () {
  var Tabledata;

  // Hàm render table supplier
  function renderTableSuplier(data) {
    var tableBody = $("#SupplierTable tbody");
    tableBody.empty(); // Xóa dữ liệu cũ trong bảng

    $.each(data, function (index, item) {
      var row = $("<tr>");
      row.append($("<th>").attr("scope", "row").text(item.STT));
      row.append($("<td>").text(item.NhaCungCap));
      row.append($("<td>").text(item.DiaChi));
      row.append($("<td>").text(item.NguoiDungDau));
      row.append($("<td>").text(item.SDT));

      tableBody.append(row);
    });
  }

  // renderTableSuplier(data);

  fetch("http://localhost:8888/api/supplier/get/suppliers", {
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
          STT: 1,
          NhaCungCap: "Thiết bị phụ tùng An Phát",
          DiaChi: "Thủ Đức, HCM",
          NguoiDungDau: "Nguyễn Văn C",
          SDT: "0123456789",
        },
        {
          STT: 2,
          NhaCungCap: "Thiết bị phụ tùng Kiệt Lặc",
          DiaChi: "Biên Hoà",
          NguoiDungDau: "Nguyễn Xuân Tuấn Kiệt",
          SDT: "0123456789",
        },
      ];
      renderTableSuplier(Tabledata);
      $("#SupplierTable").DataTable({
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
  // Kích hoạt DataTables
  $("#BtnNCC_Them").click(function (e) {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của nút submit (nếu có)

    var TenNCC = $("#InputNCC_TenNCC").val();
    var SDT = $("#InputNCC_SDT").val();
    var DiaChi = $("#InputNCC_DiaChi").val();
    var NDD = $("#InputNCC_NDD").val();
    // gửi tại đây!
    var API = "http://localhost:8888/api/supplier/create/supplier";
    fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        TenNCC: "LocPham",
        SDT: "092423423",
        DiaChiNhaCungCap: "Tam phước biên hòa đồng nai",
        HoTenNDD: "Phạm Hữu Lộc",
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
