//table
var Tile;
function InPhieuThu() {
  var doc = new jsPDF();
  var startY = 20;
  var margin = 10;
  var cellWidth = 30;
  var cellHeight = 10;

  // Lấy danh sách tồn kho từ API
  var danhSachTonKho = getDanhSachPhieuThu();
  console.log(getDanhSachPhieuThu());

  // Tạo một bảng để hiển thị danh sách tồn kho trong PDF
  var headers = [
    [
      "Chu Xe",
      "SDT",
      "Ngay Tao",
      "Bien So",
      "Email",
      "Nguoi Tao Phieu",
      "Tong Tien",
      "So Tien Thu",
      "Con No",
    ],
  ];
  var data = danhSachTonKho.map(function (hang) {
    return [
      hang.ChuXe,
      hang.SDT,
      hang.NgayTao,
      hang.BienSo,
      hang.Email,
      hang.NguoiTaoPhieu,
      hang.TongTien.toString(),
      hang.SoTienThu.toString(),
      hang.ConNo.toString(),
    ];
  });

  // Tạo một font hỗ trợ tiếng Việt
  doc.addFont(
    "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/vfs_fonts.js",
    "Roboto-Italic.ttf"
  );

  // Vẽ tiêu đề
  doc.setFont("Roboto-Italic.ttf"); // Sử dụng font đã được thêm
  doc.setFontSize(12);
  doc.setFontStyle("bold");
  doc.text("Phieu thu", (margin + 9) * 5, startY);
  startY += cellHeight;

  // Vẽ bảng
  doc.autoTable({
    startY: startY,
    head: headers,
    body: data,
    margin: margin,
    styles: {
      font: "Times", // Sử dụng font đã được thêm
      fontSize: 10,
      cellPadding: 5,
    },
  });
  // Lưu file PDF
  doc.save("bao-cao-doanh-thu.pdf");

  function getDanhSachPhieuThu() {
    // Thay thế đoạn mã dưới đây bằng phương thức thực tế để lấy danh sách tồn kho từ nguồn dữ liệu
    // và trả về dữ liệu dưới dạng mảng các đối tượng có cấu trúc tương tự.
    // Ví dụ:
    // return fetch('url-api-danh-sach-ton-kho')
    //   .then(response => response.json())
    //   .then(data => data);

    return [
      {
        ChuXe: "H001",
        SDT: "HonDa",
        NgayTao: 10,
        BienSo: 100000,
        Email: "50%",
        NguoiTaoPhieu: "",
        TongTien: 9999999,
        SoTienThu: 100000,
        ConNo: 3000000,
      },
    ];
  }
}
$(document).ready(function () {
  fetchData();
  var itemData = localStorage.getItem("item");
  var item = JSON.parse(itemData);
  console.log(item);

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
          var selectElementVTPT = $("#CBBVatTuPhuTung");
          $.each(PhuTung, function (index, option) {
            var giaban =
              (option.DonGiaThamKhao * Tile) / 100 + option.DonGiaThamKhao;
            selectElementVTPT.append(
              $("<option>")
                .attr("value", option.id)
                .text(option.TenVTPT + "  -  " + giaban)
            );
          });
        })
        .catch((error) => console.log("ERROR WAGE TYPES"));

      fetch("http://localhost:8888/api/repair/get/information/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          MaTN: item.MaTN,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          Tabledatar = data.DT;
          console.log(Tabledatar);
          renderTableRepairDetails(Tabledatar);
          $("#Table_ItemsList").DataTable({
            searching: true,
            paging: true,
            pageLength: 10,
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

      fetch("http://localhost:8888/api/wage/get/wages", {
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
          var selectElement = $("#CBBLoaiTienCong");
          console.log(data.DT);
          TienCong = data.DT;
          $.each(data.DT, function (index, option) {
            selectElement.append(
              $("<option>")
                .attr("value", option.id)
                .text(option.LoaiTienCong + "  -  " + option.GiaTriTienCong)
            );
          });
        })
        .catch((error) => console.log("ERROR WAGE TYPES"));
    })
    .catch((error) => console.log("ERROR"));

  function fetchData() {
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
        localStorage.setItem("mockData", JSON.stringify(mockData));
        $.each(mockData, function (index, Newitem) {
          if (Newitem.MaTN == item.MaTN) {
            localStorage.setItem("item", JSON.stringify(Newitem));
            itemData = localStorage.getItem("item");
            item = JSON.parse(itemData);
          }
        });
      })
      .catch((error) => console.log("ERROR"));
  }

  var TienCong;
  var PhuTung;

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

  // VTPTSelect = [
  //   {
  //     id: "1",
  //     TenVTPT: "Lọc Gió",
  //     DVT: "cái",
  //     DonGiaThamKhao: 100000,
  //     SoLuongVatTu: 5,
  //   },
  //   {
  //     id: "2",
  //     TenVTPT: "Két Nước",
  //     DVT: "cái",
  //     DonGiaThamKhao: 120000,
  //     SoLuongVatTu: 5,
  //   },
  // ];
  //load vật tư phụ tùng cbb

  var car = localStorage.getItem("car");
  var car_id = localStorage.getItem("car_id");
  $("#inputTenChuXe").val(item.TenChuXe);
  $("#inputDiaChi").val(item.DiaChiCX);
  $("#inputNgayTiepNhan").val(formattedDate1);
  $("#inputBienSo").val(item.BienSoXe);
  $("#inputHieuXe").val(car);
  $("#inputCMND").val(item.CMND);
  $("#inputNgayHanGiao").val(formattedDate2);
  $("#inputSDT").val(item.SDT);

  $("#BtnDieuChinh").click(function (e) {
    e.preventDefault();
    //POSTTTT
    var TenChuXe = $("#inputTenChuXe").val();
    var DiaChiCX = $("#inputDiaChi").val();
    var SDT = $("#inputSDT").val();
    var BienSoXe = $("#inputBienSo").val();
    var HanGiaoXe = $("#inputNgayHanGiao").val();

    //email
    var Email = item.Email;
    var MaHangXe = car_id;
    var GhiChu = item.Ghichu;
    // console.log(
    //   // TenChuXe,
    //   // DiaChiCX,
    //   // SDT,
    //   // BienSoXe,
    //   // HanGiaoXe,
    //   // Email,
    //   // MaHangXe,
    //   GhiChu
    // );
    console.log(
      JSON.stringify({
        TenChuXe: TenChuXe,
        DiaChiCX: DiaChiCX,
        SDT: SDT,
        Email: Email,
        MaHangXe: parseInt(MaHangXe),
        BienSoXe: BienSoXe,
        GhiChu: GhiChu,
        HanGiaoXe: HanGiaoXe,
        MaTN: item.MaTN,
      })
    );
    fetch(
      "http://localhost:8888/api/receipt/update/information/form/" + item.MaTN,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          TenChuXe: TenChuXe,
          DiaChiCX: DiaChiCX,
          SDT: SDT,
          Email: Email,
          MaHangXe: parseInt(MaHangXe),
          BienSoXe: BienSoXe,
          GhiChu: GhiChu,
          HanGiaoXe: HanGiaoXe,
        }),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.log("ERROR"));

    //location.reload();
  });
  var tongcong = 0;
  function renderTableRepairDetails(data) {
    var tableBody = $("#Table_ItemsList tbody");
    tableBody.empty();

    $.each(data, function (index, item) {
      //   {
      //     "id": 2,
      //     "TenVTPT": "Lọc Gió",
      //     "DVT": "cái",
      //     "NoiDung": "Thay lọc nhớt",
      //     "DonGia": 150000,
      //     "TienCong": 150000,
      //     "SoLuong": 1,
      //     "TongTien": 300000
      // },

      var roww = $("<tr>");
      roww.append($("<th>").attr("scope", "row").text(item.id));
      roww.append($("<td>").text(item.NoiDung));
      roww.append($("<td>").text(item.TenVTPT));
      roww.append($("<td>").text(item.SoLuong));
      var giabanitemlist = (item.DonGia * Tile) / 100 + item.DonGia;
      roww.append($("<td>").text(giabanitemlist));
      roww.append($("<td>").text(item.TienCong));
      roww.append($("<td>").text(item.TongTien));

      tongcong += item.TongTien;
      console.log(tongcong);

      var buttonsw = $("<div>").addClass("row");
      var colw1 = $("<div>").addClass("col");
      var colw2 = $("<div>").addClass("col");

      var btnwSua = $("<button>")
        .attr("id", item.id)
        .addClass("btn-info btn text-white")
        .append($("<span>").addClass("fw-bold").text("Sửa"));
      var btnwXoa = $("<button>")
        .attr("id", item.id)
        .addClass("btn-danger btn text-white")
        .append($("<span>").addClass("fw-bold").text("Xoá"));
      colw1.append(btnwSua);
      colw2.append(btnwXoa);
      buttonsw.append(colw1, colw2);

      roww.append($("<td>").append(buttonsw));

      btnwSua.click(function () {
        // Xử lý sự kiện nhấn nút Xoá
        var buttonIdw = $(this).attr("id");
        // Thực hiện các thao tác cần thiết khi nhấn nút Xoá
        console.log("Đã nhấn nút Sửa với ID: " + buttonIdw);
      });
      btnwXoa.click(function () {
        // Xử lý sự kiện nhấn nút Xoá
        var buttonIdw = $(this).attr("id");
        // Thực hiện các thao tác cần thiết khi nhấn nút Xoá
        console.log("Đã nhấn nút Xoá với ID: " + buttonIdw);
      });
      tableBody.append(roww);
    });
    var TienConNoLai = item.TienNo;
    fetchData();
    $("#ShowTienConNoLai").text(TienConNoLai);
    $("#ShowTrangThai").text(item.status);
    $("#ShowTongSoTien").text(tongcong);
    if (tongcong != 0) {
      if (TienConNoLai != tongcong) {
        var button = document.getElementById("BtnThemDichVu");

        // Disable nút
        button.disabled = true;
      }
    }
    if (TienConNoLai == 0) {
      var button = document.getElementById("BtnThanhToan");

      // Disable nút
      button.disabled = true;
    }
  }

  $("#BtnThemDichVu").click(function (e) {
    e.preventDefault();
    //POSTTTT
    var MaTN = parseInt(item.MaTN);
    console.log("MaTN: ", MaTN, typeof MaTN);

    var MaTiencong = parseInt($("#CBBLoaiTienCong").val());
    console.log("MaTiencong: ", MaTiencong, typeof MaTiencong);

    var MaPhuTung = parseInt($("#CBBVatTuPhuTung").val());
    console.log("MaPhuTung: ", MaPhuTung, typeof MaPhuTung);

    var NoiDung = TienCong[MaTiencong - 1].LoaiTienCong;
    console.log("NoiDung: ", NoiDung, typeof NoiDung);

    var GiaTienCong = parseInt(TienCong[MaTiencong - 1].GiaTriTienCong);
    console.log("GiaTienCong: ", GiaTienCong, typeof GiaTienCong);

    var DonGia = parseInt(PhuTung[MaPhuTung - 1].DonGiaThamKhao);
    console.log("DonGia: ", DonGia, typeof DonGia);

    var SoLuong = parseInt($("#InputNum").val());
    console.log("SoLuong: ", SoLuong, typeof SoLuong);

    fetch("http://localhost:8888/api/repair/create/form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        MaTN: MaTN,
        productDetail: {
          MaTienCong: MaTiencong,
          MaVTPT: MaPhuTung,
          NoiDung: NoiDung,
          DonGia: DonGia,
          TienCong: GiaTienCong,
          SoLuong: SoLuong,
        },
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.log("ERROR"));

    location.reload();
  });
  //popup
  // {

  //   "MaPhieuTN":1,
  //    "SDT":"0353339425",
  //    "Email":"loc281202@gmail.com",
  //    "SoTienThu": 600000
  // }
  var phieuThu = document.getElementById("PhieuThu");
  var showHiddenPhieuThu = document.getElementById("showHiddenPhieuThu");
  function showHiddenDivPhieuThu() {
    phieuThu.style.display = "block";

    var TienThu = parseInt($("#InputTienThu").val());
    var SDT = $("#InputSDT").val();
    var Email = $("#InputEmail").val();
    var NguoiTao = $("#InputNguoiTao").val();
    console.log("Số tiền thu: ", TienThu, typeof TienThu);
    console.log("Mã TN: ", item.MaTN, typeof item.MaTN);
    console.log(SDT, Email);
    fetch("http://localhost:8888/api/payment/create/form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        MaPhieuTN: item.MaTN,
        SDT: SDT,
        Email: Email,
        SoTienThu: TienThu,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        $("#ShowTenPhieuThu").text(item.TenChuXe);
        $("#ShowBienSoThu").text(item.BienSoXe);
        $("#ShowEmailThu").text(Email);
        $("#ShowSDTThu").text(item.SDT);
        $("#ShowTongTienThu").text(tongcong);
        $("#ShowSoTienThu").text(TienThu);
        $("#ShowNgayTaoThu").text(new Date());
        $("#ShowNguoiTaoThu").text(NguoiTao);
        var TienConNoLai = item.TienNo - TienThu;
        $("#ShowTienConNoLai").text(TienConNoLai);
        $("#ShowTienNoLaiPT").text(TienConNoLai);
        console.log(TienConNoLai);
      })
      .catch((error) => console.log("ERROR"));
    InPhieuThu();
    setTimeout(function () {
      window.location.href = "service.html";
    }, 5000); // 5000ms = 5 giây

    //     $("#ShowTenChuXe").text(item.TenChuXe);
    // $("#ShowDiaChi").text(item.DiaChiCX);
    // $("#ShowNgayTiepNhan").text(formattedDate1);
    // $("#ShowBienSo").text(item.BienSoXe);
    // $("#ShowHieuXe").text(item.MaHangXe);
    // $("#ShowCMND").text(item.CMND);
    // $("#ShowNgayHanGiao").text(formattedDate2);
    // $("#ShowSDT").text(item.SDT);
  }
  showHiddenPhieuThu.addEventListener("click", showHiddenDivPhieuThu);
});
