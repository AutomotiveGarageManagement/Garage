//item list table setting
$(document).ready(function () {
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
  var headers = [['ID', 'Vat tu Phu tung', 'Ton dau', 'Phat Sinh', 'Ton cuoi']];
  var data = danhSachTonKho.map(function (hang) {
    return [hang.ID, hang.VatTu, hang.TonDau.toString(), hang.PhatSinh.toString(), hang.TonCuoi.toString()];
  });

  // Vẽ tiêu đề
  doc.setFontSize(12);
  doc.setFontStyle("bold");
  doc.text("Bao cao Ton Kho", margin, startY);
  doc.text("Thang 8", startY*3, startY);
  startY += cellHeight;

  // Vẽ bảng
  doc.autoTable({
    startY: startY,
    head: headers,
    body: data,
    margin: margin,
    styles: {
      font: "Times-Roman",
      fontStyle: "normal",
      fontSize: 10,
      cellPadding: 5
    }
  });
  // Lưu file PDF
  doc.save('danh-sach-ton-kho.pdf');
});

function getDanhSachTonKho() {
  // Thay thế đoạn mã dưới đây bằng phương thức thực tế để lấy danh sách tồn kho từ nguồn dữ liệu
  // và trả về dữ liệu dưới dạng mảng các đối tượng có cấu trúc tương tự.
  // Ví dụ:
  // return fetch('url-api-danh-sach-ton-kho')
  //   .then(response => response.json())
  //   .then(data => data);

  return [
    { ID: '1', VatTu: 'Buồn Nhớt', TonDau: 1, PhatSinh: 0, TonCuoi: 1 },
    { ID: '1', VatTu: 'chong chóng che', TonDau: 1, PhatSinh: 0, TonCuoi: 1 },
  ];
}



//item table
$(document).ready(function () {
  // Kích hoạt DataTables
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
});

