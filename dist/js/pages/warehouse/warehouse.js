//item list table setting
var StuffsData;
var Tile;
var dataReport;
$(document).ready(function () {
  function renderReportDataTable(data) {
    var tableBody = $("#ItemWarehouseTable tbody");
    tableBody.empty();

    $.each(data, function (index, item) {
      // "id": 1,
      // "TenVTPT": "Lọc Gió",
      // "SoLuongPhatSinh": 0,
      // "opening_inventory": -8,
      // "closing_inventory": 0
      var roww = $("<tr>");
      roww.append($("<th>").attr("scope", "row").text(item.id));
      roww.append($("<td>").text(item.TenVTPT));
      roww.append($("<td>").text(item.opening_inventory));
      roww.append($("<td>").text(item.SoLuongPhatSinh));
      roww.append($("<td>").text(item.closing_inventory));

      // roww.append($("<td>").text(item.DonGiaThamKhao));

      tableBody.append(roww);
    });
    $("#ItemWarehouseTable").DataTable({
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
  $("#ThangBaoCaoTon").change(function () {
    var selectedOption = $(this).children("option:selected");
    var selectedValue = selectedOption.val();
    if (selectedValue == 6) {
      fetch("http://localhost:8888/api/statistic/get/inven", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          start_date: "06-30-2023",
          end_date: "06-01-2023",
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          dataReport = data.DT;
          console.log(dataReport);
          renderReportDataTable(dataReport);
        })
        .catch((error) => console.log(error));
    }
  });

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
      Tile = param.PhanTramTienLoiCuaSanPham;
      console.log(Tile);
    })
    .catch((error) => console.log("ERROR"));
  // Kích hoạt DataTables

  $("#ItemWarehouseTable").DataTable({
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
//xuat bao cao

$("#BtnXuatBaoTonCaoThang").click(function (e) {
  e.preventDefault();
  console.log("da nhan nut");

  // Tạo đối tượng jsPDF
  var doc = new jsPDF();
  var startY = 20;
  var margin = 10;
  var cellWidth = 30;
  var cellHeight = 10;

  // Lấy danh sách tồn kho từ API
  var danhSachTonKho = getDanhSachTonKho();

  // Tạo một bảng để hiển thị danh sách tồn kho trong PDF
  var headers = [["ID", "Vat tu Phu tung", "Ton dau", "Phat Sinh", "Ton cuoi"]];
  var data = danhSachTonKho.map(function (hang) {
    return [
      hang.ID,
      hang.TenVTPT,
      hang.TonDau.toString(),
      hang.PhatSinh.toString(),
      hang.TonCuoi.toString(),
    ];
  });

  // Vẽ tiêu đề
  doc.setFontSize(12);
  doc.setFontStyle("bold");
  doc.text("Bao cao Ton Kho", margin, startY);
  doc.text("Thang 1", (startY+9) * 6, startY);
  startY += cellHeight;

  // Vẽ bảng
  doc.autoTable({
    startY: startY,
    head: headers,
    body: data,
    margin: margin,
    styles: {
      font: "Times",
      fontStyle: "normal",
      fontSize: 10,
      cellPadding: 5,
    },
  });
  // Lưu file PDF
  doc.save("danh-sach-ton-kho.pdf");

  function getDanhSachTonKho() {
    // Thay thế đoạn mã dưới đây bằng phương thức thực tế để lấy danh sách tồn kho từ nguồn dữ liệu
    // và trả về dữ liệu dưới dạng mảng các đối tượng có cấu trúc tương tự.
    // Ví dụ:
    // return fetch('url-api-danh-sach-ton-kho')
    //   .then(response => response.json())
    //   .then(data => data);
  
    return [
      {
        ID: "1",
        TenVTPT: "Buồn nhớt",
        TonDau: 1,
        PhatSinh: 0,
        TonCuoi: "1",
      },
    ];
  }

});
function getDanhSachTonKho() {
  fetch("http://localhost:8888/api/stuff/get/stuffs", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => data);
}

//item table
$(document).ready(function () {
  // Kích hoạt DataTables
  function createItemTable(data) {
    var tableBody = $("#ItemTable tbody");
    tableBody.empty();

    $.each(data, function (index, item) {
      // id": 3,
      // "TenVTPT": "Má phanh sau",
      // "DVT": "Cai",
      // "DonGiaThamKhao": 100000,
      // "SoLuongVatTu": 0
      var roww = $("<tr>");
      roww.append($("<th>").attr("scope", "row").text(item.id));
      roww.append($("<td>").text(item.TenVTPT));
      roww.append($("<td>").text(item.DonGiaThamKhao));
      var giaban = (item.DonGiaThamKhao * Tile) / 100 + item.DonGiaThamKhao;
      roww.append($("<td>").text(giaban));
      roww.append($("<td>").text(item.DVT));

      // roww.append($("<td>").text(item.DonGiaThamKhao));

      tableBody.append(roww);
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
      StuffsData = data.DT;
      console.log(StuffsData);
      createItemTable(StuffsData);
      $("#ItemTable").DataTable({
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

  $("#BtnNhapPhuTung").click(function (e) {
    e.preventDefault();
    //POSTTTT
    //{
    // "TenVTPT":"Cmm",
    // "DVT":"Cai",
    // "DonGia":"100000"
    //}
    var tenvt = $("#InputTenPhuTung").val();
    var dongia = $("#InputDonGia").val();
    var dvt = $("#InputDonViTinh").val();
    console.log(
      JSON.stringify({
        TenVTPT: "Chong chóng tre",
        DVT: "Cai",
        DonGia: "100000",
      }),
      typeof tenvt,
      typeof dongia,
      typeof dvt
    );
    fetch("http://localhost:8888/api/stuff/create/stuff", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        TenVTPT: tenvt,
        DVT: dvt,
        DonGia: dongia,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        alert(data.Em);
        location.reload();
      })
      .catch((error) => console.log("ERROR"));
  });
});
