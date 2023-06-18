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
});
$("#BtnXuatDoanhThuThang").click(function (e) {
  e.preventDefault();
  console.log("da nhan nut");
  // Tạo đối tượng jsPDF
  var doc = new jsPDF();

  // Lấy danh sách tồn kho từ API
  var danhSachTonKho = getDanhSachTonKho();

  // Tạo một bảng để hiển thị danh sách tồn kho trong PDF
  var tableData = [];
  var headers = ['ID', 'Hiệu Xe', 'Số lượt sửa', 'Thành Tiền', 'Tỷ lệ'];
  tableData.push(headers);

  danhSachTonKho.forEach(function (hang) {
    var row = [hang.ID, hang.HieuXe, hang.SoLuot, hang.ThanhTien, hang.TyLe];
    tableData.push(row);
  });

  // Vẽ bảng trong file PDF
  doc.autoTable({
    head: tableData.slice(0, 1),
    body: tableData.slice(1)
  });

  // Lưu file PDF
  doc.output('dataurlnewwindow');
});

function getDanhSachTonKho() {
  // Đây là hàm giả lập, thay thế nó bằng hàm thực tế để lấy danh sách tồn kho từ nguồn dữ liệu
  return [
    { ID: 'H001', HieuXe: 'HonDa', SoLuot: 10, ThanhTien: 100000, TyLe: "50%" },
    { ID: 'H002', HieuXe: 'BMW', SoLuot: 10, ThanhTien: 100000, TyLe: "50%" },
  ];
}
