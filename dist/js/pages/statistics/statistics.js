// table supplier

$(document).ready(function () {
  // Kích hoạt DataTables
  $("#TableStatistics").DataTable({
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
$(function () {
  "use strict";
  var sparklineLogin = function () {
    $("#CarRate").sparkline([20, 15, 15, 12, 10, 8, 7, 5, 5, 3], {
      type: "bar",
      height: "200",
      barWidth: "50",
      width: "100%",
      resize: true,
      barSpacing: "50",
      barColor: "#137eff",
      tooltipFormat:
        '<span style="font-size: 12px;">{{offset:offset}} - {{value}}</span>',
      tooltipValueLookups: {
        offset: {
          0: "Brand 1",
          1: "Brand 2",
          2: "Brand 3",
          3: "Brand 4",
          4: "Brand 5",
          5: "Brand 6",
          6: "Brand 7",
          7: "Brand 8",
          8: "Brand 9",
          9: "Brand 10",
        },
      },
      chartRangeMin: 0,
      chartRangeMax: 25,
      chartRangeMinX: 0,
      chartRangeMaxX: 9,
      chartRangeMinY: 0,
      chartRangeMaxY: 25,
      spotColor: false,
      highlightSpotColor: false,
      highlightLineColor: false,
      drawGrid: true,
      gridLineColor: "#e6e6e6",
      gridLineWidth: 0.5,
      disableTooltips: false,
    });
  };
  var sparkResize;

  $(window).resize(function (e) {
    clearTimeout(sparkResize);
    sparkResize = setTimeout(sparklineLogin, 500);
  });
  sparklineLogin();

  $("#ThangDoanhThu").change(function () {
    // Lấy giá trị tháng đã chọn
    var selectedMonth = $(this).val();

    // Xử lý logic tương ứng với giá trị tháng đã chọn
    console.log("Tháng đã chọn:", selectedMonth);

    // Gọi hàm hoặc thực hiện các tác vụ khác dựa trên tháng đã chọn
  });
});

$("#BtnXuatDoanhThuThang").click(function (e) {
  e.preventDefault();

  // Tạo đối tượng jsPDF
  var doc = new jsPDF();
  var startY = 20;
  var margin = 10;
  var cellWidth = 30;
  var cellHeight = 10;

  // Lấy danh sách tồn kho từ API
  var danhSachTonKho = getDanhSachTonKho();
  console.log(getDanhSachTonKho());

  // Tạo một bảng để hiển thị danh sách tồn kho trong PDF
  var headers = [["ID", "Hiệu Xe", "Số Lượt Sửa", "Thành Tiền", "Tỷ Lệ"]];
  var data = danhSachTonKho.map(function (hang) {
    return [
      hang.ID,
      hang.HieuXe,
      hang.SoLuot.toString(),
      hang.ThanhTien.toString(),
      hang.TyLe,
    ];
  });

  // Vẽ tiêu đề
  doc.setFontSize(12);
  doc.setFontStyle("bold");
  doc.text("Báo cáo doanh thu", margin, startY);
  startY += cellHeight;

  // Vẽ bảng
  doc.autoTable({
    startY: startY,
    head: headers,
    body: data,
    margin: margin,
    styles: {
      font: "Courier New",
      fontStyle: "normal",
      fontSize: 10,
      cellPadding: 5,
    },
  });

  // Lưu file PDF
  doc.save("bao-cao-doanh-thu.pdf");

  // Bắt sự kiện khi chọn tháng
});

function getDanhSachTonKho() {
  // Thay thế đoạn mã dưới đây bằng phương thức thực tế để lấy danh sách tồn kho từ nguồn dữ liệu
  // và trả về dữ liệu dưới dạng mảng các đối tượng có cấu trúc tương tự.
  // Ví dụ:
  // return fetch('url-api-danh-sach-ton-kho')
  //   .then(response => response.json())
  //   .then(data => data);

  return [
    { ID: "H001", HieuXe: "HonDa", SoLuot: 10, ThanhTien: 100000, TyLe: "50%" },
    { ID: "H002", HieuXe: "BMW", SoLuot: 10, ThanhTien: 100000, TyLe: "50%" },
  ];
}
