//import item table setting
var PhuTung;
var NhaCungCap;
$(document).ready(function () {
  function createStuffTable(data) {
    var tableBody = $("#ImportItemWarehouseTable tbody");
    tableBody.empty(); // Xóa dữ liệu cũ trong bảng
    // "id": 1,
    // "TenVTPT": "Lọc Gió",
    // "DVT": "cái",
    // "DonGiaThamKhao": 100000,
    // "SoLuongVatTu": 1
    $.each(data, function (index, item) {
      var row = $("<tr>");
      row.append($("<th>").attr("scope", "row").text(item.id));
      row.append($("<td>").text(item.TenVTPT));
      row.append(
        $("<td>").append(
          $("<input>")
            .attr("type", "number")
            .attr("min", "0")
            .attr("id", "inputNumber" + item.id)
            .val("0")
        )
      );
      row.append($("<td>").text(item.DonGiaThamKhao));
      row.append($("<td>").text(item.SoLuongVatTu));
      tableBody.append(row);
    });
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
  }
  fetch("http://localhost:8888/api/stuff/get/stuffs", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      //   {
      //     "id": 1,
      //     "LoaiTienCong": "Làm sạch",
      //     "GiaTriTienCong": 50000
      // }

      PhuTung = data.DT;

      //   {
      //     "id": 3,
      //     "TenVTPT": "Má phanh sau",
      //     "DVT": "Cai",
      //     "DonGiaThamKhao": 100000,
      //     "SoLuongVatTu": 0
      // }
      console.log(PhuTung);
      createStuffTable(PhuTung);
    })
    .catch((error) => console.log("ERROR ITEM LIST"));
  // Kích hoạt DataTables
});

//import item table setting
// "MaPN": 1,
// "MaNV": 1,
// "MaNCC": 1,
// "NgayLapPhieuNhap": "2023-12-06T00:00:00.000Z",
// "TenNhaCungCap": "ko biet",
// "TongTienNhapHang": 10000
$(document).ready(function () {
  function createImportedHistoryTable(data) {
    var tableBodyNew = $("#ImportItemHistoryWarehouseTable tbody");
    tableBodyNew.empty(); // Xóa dữ liệu cũ trong bảng
    console.log(data);

    $.each(data, function (index, item) {
      var row = $("<tr>");
      row.append($("<th>").attr("scope", "row").text(item.MaPN));
      row.append($("<td>").text(item.TenNhaCungCap));
      row.append($("<td>").text(item.TongTienNhapHang));
      row.append($("<td>").text(item.NgayLapPhieuNhap));
      // row.append($("<td>").text(item.SDT));
      // Sử dụng jQuery để tạo đối tượng nút
      var button = $("<button>")
        .attr("id", item.MaPN)
        .addClass("btn btn-primary text-white")
        .attr("data-toggle", "modal")
        .attr("data-target", "#popup2")
        .text("Xem");
      var cell = $("<td>");
      cell.append(button);
      // Chèn đối tượng nút vào thẻ td
      row.append(cell);

      tableBodyNew.append(row);
    });
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
  }
  fetch("http://localhost:8888/api/import/get/information/all", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data2) => {
      createImportedHistoryTable(data2.DT);
    })
    .catch((error) => console.log("ERROR AT HISTORY IMPORTED"));
  // Kích hoạt DataTables
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
      row.append($("<th>").attr("scope", "row").text(item.id));
      row.append($("<td>").text(item.TenNCC));
      row.append($("<td>").text(item.DiaChiNhaCungCap));
      row.append($("<td>").text(item.HotenNDD));
      row.append($("<td>").text(item.SDT));

      tableBody.append(row);
    });
  }
  // {
  //   "id": 1,
  //   "TenNCC": "LocPham",
  //   "SDT": "092423423",
  //   "DiaChiNhaCungCap": "Tam phu?c biên hòa d?ng nai",
  //   "HotenNDD": "Ph?m H?u L?c"
  // }
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
    .then((data) => {
      Tabledata = data.DT;
      NhaCungCap = data.DT;
      console.log(Tabledata);
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
    })
    .catch((error) => console.log("ERROR"));

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
        TenNCC: TenNCC,
        SDT: SDT,
        DiaChiNhaCungCap: DiaChi,
        HoTenNDD: NDD,
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
