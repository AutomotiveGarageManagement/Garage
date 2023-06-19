//table
$(document).ready(function () {
  var itemData = localStorage.getItem("item");
  var item = JSON.parse(itemData);
  console.log(item);

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

  VTPTSelect = [
    {
      id: "1",
      TenVTPT: "Lọc Gió",
      DVT: "cái",
      DonGiaThamKhao: 100000,
      SoLuongVatTu: 5,
    },
    {
      id: "2",
      TenVTPT: "Két Nước",
      DVT: "cái",
      DonGiaThamKhao: 120000,
      SoLuongVatTu: 5,
    },
  ];
  //load vật tư phụ tùng cbb
  PhuTung = VTPTSelect;
  var selectElementVTPT = $("#CBBVatTuPhuTung");
  $.each(VTPTSelect, function (index, option) {
    selectElementVTPT.append(
      $("<option>")
        .attr("value", index)
        .text(option.TenVTPT + "  -  " + option.DonGiaThamKhao)
    );
  });

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
            .attr("value", index)
            .text(option.LoaiTienCong + "  -  " + option.GiaTriTienCong)
        );
      });
    })
    .catch((error) => console.log("ERROR WAGE TYPES"));

  $("#ShowTenChuXe").text(item.TenChuXe);
  $("#ShowDiaChi").text(item.DiaChiCX);
  $("#ShowNgayTiepNhan").text(formattedDate1);
  $("#ShowBienSo").text(item.BienSoXe);
  $("#ShowHieuXe").text(item.MaHangXe);
  $("#ShowCMND").text(item.CMND);
  $("#ShowNgayHanGiao").text(formattedDate2);
  $("#ShowSDT").text(item.SDT);

  function renderTableRepairDetails(data) {
    var tableBody = $("#Table_ItemsList tbody");
    tableBody.empty();
    var tongcong = 0;

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
      roww.append($("<td>").text(item.DonGia));
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
    $("#ShowTrangThai").text(item.status);
    $("#ShowTongSoTien").text(tongcong);
  }
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

  $("#BtnThemDichVu").click(function (e) {
    e.preventDefault();
    //POSTTTT
    var LoaiTienCong = $("#CBBVatTuPhuTung").val();
    var VatTuPhuTung = $("#CBBLoaiTienCon").val();
    var MaTN = parseInt(item.MaTN);
    console.log(typeof MaTN);
    var MaTiencong = parseInt($("#CBBLoaiTienCong").val());
    console.log(MaTiencong);
    console.log(typeof MaTiencong);
    var MaPhuTung = parseInt($("#CBBVatTuPhuTung").val());
    console.log(MaPhuTung);
    console.log(typeof MaPhuTung);
    var NoiDung = TienCong[MaTiencong].LoaiTienCong;
    console.log("Noi dung", NoiDung);
    console.log(typeof NoiDung);
    var GiaTienCong = parseFloat(TienCong[MaTiencong].GiaTriTienCong);
    console.log("GIa Tien Cong", GiaTienCong);
    console.log(typeof GiaTienCong);
    var DonGia = parseFloat(PhuTung[MaPhuTung].DonGiaThamKhao);
    console.log("DonGia", DonGia);
    console.log(typeof DonGia);
    var SoLuong = parseInt($("#InputNum").val());
    console.log("SL", typeof SoLuong);

    var productDetail;
    console.log("-");
    productDetail = {
      MaTiencong: MaTiencong,
      MaVTPT: MaPhuTung,
      NoiDung: NoiDung,
      DonGia: DonGia,
      TienCong: GiaTienCong,
      SoLuong: SoLuong,
    };
    console.log(MaTN);
    console.log(MaTiencong);
    console.log(MaPhuTung);
    console.log(NoiDung);
    console.log(GiaTienCong);
    console.log(DonGia);
    console.log(SoLuong);
    console.log(productDetail);
    // "MaTN" : 2,
    // "productDetail":{
    //     "MaTienCong":2,
    //     "MaVTPT":2,
    //     "NoiDung":"Thay lọc nhớt",
    //     "DonGia":120000,
    //     "TienCong":2200000,
    //     "SoLuong":2
    // }
    // DonGia
    // :
    // 100000
    // MaTiencong
    // :
    // 2
    // MaVTPT
    // :
    // 0
    // NoiDung
    // :
    // "Thay thế vật tư phụ tùng "
    // SoLuong
    // :
    // 1
    // TienCong
    // :
    // 150000
    console.log(
      JSON.stringify({
        MaTN: MaTN,
        productDetail: productDetail,
      })
    );
    fetch("http://localhost:8888/api/repair/create/form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        MaTN: MaTN,
        productDetail: productDetail,
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
//popup
var phieuThu = document.getElementById("PhieuThu");
var showHiddenPhieuThu = document.getElementById("showHiddenPhieuThu");
function showHiddenDivPhieuThu() {
  phieuThu.style.display = "block";
}
showHiddenPhieuThu.addEventListener("click", showHiddenDivPhieuThu);
