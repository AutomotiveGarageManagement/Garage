
// Đợi cho tài liệu HTML được tải xong
$(document).ready(function () {
  //append table
  

  var CMND;
    // Tạo đối tượng jsPDF
// var doc = new jsPDF();
// var startY = 20;
// var margin = 10;
// var cellWidth = 30;
// var cellHeight = 10;

// // Lấy danh sách tồn kho từ API
// var danhSachTonKho = getDanhSachPhieuThu();
// console.log(getDanhSachPhieuThu());

//   // Tạo một bảng để hiển thị danh sách tồn kho trong PDF
// var headers = [
//   ["Chu Xe", "SDT", "Ngay Tao", "Bien So", "Email", "Nguoi Tao Phieu", "Tong Tien", "So Tien Thu", "Con No"]
// ];
// var data = danhSachTonKho.map(function (hang) {
//   return [
//     hang.ChuXe,
//     hang.SDT,
//     hang.NgayTao,
//     hang.BienSo,
//     hang.Email,
//     hang.NguoiTaoPhieu,
//     hang.TongTien.toString(),
//     hang.SoTienThu.toString(),
//     hang.ConNo.toString()
//   ];
// });

// // Tạo một font hỗ trợ tiếng Việt
// doc.addFont("https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/vfs_fonts.js", "Roboto-Italic.ttf");

// // Vẽ tiêu đề
// doc.setFont("Roboto-Italic.ttf"); // Sử dụng font đã được thêm
// doc.setFontSize(12);
// doc.setFontStyle("bold");
// doc.text("Phieu thu", (margin + 9)*5, startY);
// startY += cellHeight;

// // Vẽ bảng
// doc.autoTable({
//   startY: startY,
//   head: headers,
//   body: data,
//   margin: margin,
//   styles: {
//     font: "Times", // Sử dụng font đã được thêm
//     fontSize: 10,
//     cellPadding: 5,
//   },
// });
//  // Lưu file PDF
//  doc.save("bao-cao-doanh-thu.pdf");

//   function getDanhSachPhieuThu() {
//     // Thay thế đoạn mã dưới đây bằng phương thức thực tế để lấy danh sách tồn kho từ nguồn dữ liệu
//     // và trả về dữ liệu dưới dạng mảng các đối tượng có cấu trúc tương tự.
//     // Ví dụ:
//     // return fetch('url-api-danh-sach-ton-kho')
//     //   .then(response => response.json())
//     //   .then(data => data);
  
//     return [
//       { ChuXe: "H001", SDT: "HonDa", NgayTao: 10, BienSo: 100000, Email: "50%", NguoiTaoPhieu:"", TongTien: 9999999, SoTienThu: 100000, ConNo: 3000000 },
    
//     ];
//   }


  $("#BTNTimCMND").click(function (e) {
    e.preventDefault();
    //Tìm bằng cmnd
    CMND = $("#InputCMND").val();
    console.log(CMND);
    fetch("http://localhost:8888/api/receipt/get/customerInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        CMND: CMND,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // "id": 1,
        // "TenChuXe": "Ph?m H?u L?c",
        // "DiaChiCX": "Tam Phước Biên Hòa Đồng Nai",
        // "SDT": "0353339425",
        // "Email": "loc281202@gmail.com",
        // "CMND": "030202011896",
        // "BienSoXe": "H-88888"
        inputData = data.DT[0];
        console.log(inputData);
        $("#InputTenChuXe").val(inputData.TenChuXe);
        $("#InputDiaChiChuXe").val(inputData.DiaChiCX);
        $("#InputSoDienThoaiChuXe").val(inputData.SDT);
        $("#InputEmail").val(inputData.Email);
        $("#InputNgayTiepNhan").val(inputData.HanGiaoXe);
      })
      .catch((error) => console.log("ERROR"));
  });
  var cars;
  fetch("http://localhost:8888/api/carBrand/get/brands", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      cars = data.DT;
      var selectElement = $("#InputHieuXe");
      console.log(data.DT);
      $.each(data.DT, function (index, option) {
        selectElement.append(
          $("<option>").attr("value", option.id).text(option.TenHX)
        );
      });
    })
    .catch((error) => console.log("ERROR"));

  // Xử lý sự kiện click của nút "Thêm"
  $("#BtnThemXe").click(function (e) {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của nút submit (nếu có)

    // Lấy giá trị từ các trường nhập liệu
    var TenChuXe = $("#InputTenChuXe").val();
    var DiaChiCX = $("#InputDiaChiChuXe").val();
    var SDT = $("#InputSoDienThoaiChuXe").val();
    var Email = $("#InputEmail").val();
    var CMND = $("#InputCMND").val();
    console.log(CMND);
    var HanGiaoXe = $("#InputNgayTiepNhan").val();
    HanGiaoXe = HanGiaoXe.replace(/-/g, "/");
    var MaHangXe = $("#InputHieuXe").val();
    var BienSoXe = $("#InputBienSoXe").val();
    var GhiChu = "";
    GhiChu = $("#InputGhiChu").val();
    console.log(
      TenChuXe,
      DiaChiCX,
      SDT,
      Email,
      CMND,
      HanGiaoXe,
      MaHangXe,
      BienSoXe,
      GhiChu
    );
    // gửi tại đây!
    fetch("http://localhost:8888/api/receipt/create/form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        TenChuXe: TenChuXe,
        DiaChiCX: DiaChiCX,
        SDT: SDT,
        Email: Email,
        CMND: CMND,
        MaHangXe: MaHangXe,
        BienSoXe: BienSoXe,
        GhiChu: GhiChu,
        HanGiaoXe: HanGiaoXe,
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

  function createTableRows(data) {
    var tableBody = $("#myTable tbody");
    tableBody.empty(); // Xóa dữ liệu cũ trong bảng
    //       {
    //     "id": 1,
    //     "TenChuXe": "Tr?n Th?nh Phong",
    //     "DiaChiCX": "Thủ Đức",
    //     "SDT": "0925734953",
    //     "Email": "tranphonglq@gmail.com",
    //     "CMND": "089202003464",
    //     "MaTN": 1,
    //     "MaChuXe": 1,
    //     "MaHangXe": 1,
    //     "BienSoXe": "22A-22.222",
    //     "NgayTiepNhan": "2023-06-17T00:00:00.000Z",
    //     "TienNo": 0,
    //     "Ghichu": "S?a c?n th?n nhaaa",
    //     "HanGiaoXe": "2023-06-20T00:00:00.000Z"
    // },
    $.each(data, function (index, item) {
      var row = $("<tr>");
      row.append($("<th>").attr("scope", "row").text(item.id));
      row.append($("<td>").text(item.TenChuXe));
      row.append($("<td>").text(item.BienSoXe));
      console.log(cars[item.MaHangXe - 1].TenHX);
      row.append($("<td>").text(cars[item.MaHangXe - 1].TenHX));
      localStorage.setItem("car", cars[item.MaHangXe - 1].TenHX);
      localStorage.setItem("car_id", item.MaHangXe);
      var dateTN = item.NgayTiepNhan;
      var dateHG = item.HanGiaoXe;
      var date1 = new Date(dateTN);
      var date2 = new Date(dateHG);
      var day1 = date1.getDate();
      var day2 = date2.getDate();
      var month1 = date1.getMonth() + 1; // Tháng được đánh số từ 0, nên cộng 1
      var month2 = date2.getMonth() + 1;
      var year1 = date1.getFullYear();
      var year2 = date2.getFullYear();
      var formattedDate1 = `${day1}/${month1}/${year1}`;
      var formattedDate2 = `${day2}/${month2}/${year2}`;
      row.append($("<td>").text(formattedDate1));
      row.append($("<td>").text(formattedDate2));
      row.append($("<td>").text(item.TienNo));

      var statusLabel = $("<span>").addClass("label");

      var status = item.status;
      if (status == "Hoàn Thành") {
        statusLabel.addClass("label-success").text("Hoàn Thành");
      } else if (status == "Đã tiếp nhận") {
        statusLabel.addClass("label-primary").text("Đã tiếp nhận");
      } else {
        statusLabel.addClass("label-purple").text("Đang xử lý");
      }

      //statusLabel.addClass("label-purple").text("Đã tiếp nhận");
      row.append($("<td>").append(statusLabel));

      var link = $("<a>")
        .attr("id", "Td_Link_" + item.ID)
        .addClass("btn btn-info text-white")
        .attr("href", "service_detail.html")
        .text("Chi tiết")
        .click(function () {
          localStorage.setItem("item", JSON.stringify(item));

          // Thực hiện các hành động khác tại đây
        });
      row.append($("<td>").append(link));

      tableBody.append(row);
    });
  }

  //get all receiptions
  fetch("http://localhost:8888/api/receipt/getAll", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      mockData = data.DT;
      console.log(mockData);
      createTableRows(mockData);
      localStorage.setItem("mockData", JSON.stringify(mockData));
      $("#myTable").DataTable({
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
  // .catch((error) => {
  //   const mockData = [
  //     {
  //       ID: 1,
  //       Ten: "Mark",
  //       BienSo: "22A-222.22",
  //       HieuXe: "BMW",
  //       NgayTiepNhan: "22/02/2022",
  //       TienNo: 0,
  //       TrangThai: "Đã tiếp nhận",
  //     },
  //     {
  //       ID: 2,
  //       Ten: "Mark",
  //       BienSo: "22A-222.22",
  //       HieuXe: "BMW",
  //       NgayTiepNhan: "22/02/2022",
  //       TienNo: 0,
  //       TrangThai: "Hoàn thành",
  //     },
  //     {
  //       ID: 3,
  //       Ten: "Mark",
  //       BienSo: "22A-222.22",
  //       HieuXe: "BMW",
  //       NgayTiepNhan: "22/02/2022",
  //       TienNo: 0,
  //       TrangThai: "Đang xử lý",
  //     },
  //   ];

  //   console.log(mockData);
  //   createTableRows(mockData);
  //   localStorage.setItem("mockData", JSON.stringify(mockData));
  // });
});
