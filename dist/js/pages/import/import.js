//import item table setting
var PhuTung;
var NhaCungCap;
var TongCong = 0;
var ImportItem = [];
$(document).ready(function () {
  //nút thanh toán
  $("#HoanThanhThanhToan").click(function (e) {
    e.preventDefault();
    console.log(ImportItem);
    var manhacungcap = $("#InputCBBNhaCungCap").val();
    var tenncc = NhaCungCap[manhacungcap - 1].TenNCC;
    var currentDate = new Date(); // Tạo đối tượng ngày hiện tại
    var day = currentDate.getDate(); // Lấy ngày
    var month = currentDate.getMonth() + 1; // Lấy tháng (0-11, nên cần +1)
    var year = currentDate.getFullYear(); // Lấy năm

    // Định dạng ngày tháng năm thành chuỗi "dd/mm/yyyy"
    var formattedDate =
      (day < 10 ? "0" : "") +
      day +
      "/" +
      (month < 10 ? "0" : "") +
      month +
      "/" +
      year;
    console.log(formattedDate, typeof formattedDate);
    console.log(tenncc);
    fetch("http://localhost:8888/api/import/create/form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        MaNV: "1",
        MaNCC: manhacungcap,
        NgayLapPhieuNhap: "12/06/2023",
        TenNhaCungCap: tenncc,
        TongTienNhapHang: TongCong + "",
        productDetail: ImportItem,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log("ERROR ITEM LIST"));
  });
  //nút nhập hàng
  $("#btnNhapHang").click(function (e) {
    e.preventDefault();
    $("#ImportItemWarehouseTable tbody tr").each(function () {
      var soLuong = parseInt($(this).find("input[type='number']").val());
      if (soLuong > 0) {
        var id = $(this).find("th").text();
        var donGia = $(this).find("td:nth-child(4)").text();
        ImportItem.push({
          MaVTPT: id,
          DonGia: parseInt(donGia),
          SoLuong: soLuong,
        });
        TongCong += donGia * soLuong;
      }
    });
    $("#TongTien").text(TongCong);
  });
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
      var selectElementVTPT = $("#InputCBBNhaCungCap");
      $.each(NhaCungCap, function (index, option) {
        selectElementVTPT.append(
          $("<option>").attr("value", option.id).text(option.TenNCC)
        );
      });
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
