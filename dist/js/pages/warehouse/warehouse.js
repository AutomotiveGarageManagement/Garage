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

  // Lấy danh sách tồn kho tu api
  var danhSachTonKho = getDanhSachTonKho();

  // Tạo một bảng để hiển thị danh sách tồn kho trong PDF
  var tableData = [];
  var headers = ['ID', 'Vật tư phụ tùng', 'Tồn đầu', 'Phát sinh','Tồn cuối'];
  tableData.push(headers);

  danhSachTonKho.forEach(function(hang) {
    var row = [hang.ID, hang.VatTu, hang.TonDau, hang.PhatSinh, hang.TonCuoi];
    tableData.push(row);
  });

  // Vẽ bảng trong file PDF
  doc.autoTable({
    head: tableData.slice(0, 1),
    body: tableData.slice(1)
  });

  // Lưu file PDF
  doc.save('danh-sach-ton-kho.pdf');
});



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


