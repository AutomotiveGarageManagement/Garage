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
    var GiaTienCong = parseInt(TienCong[MaTiencong].GiaTriTienCong);
    console.log("GIa Tien Cong", GiaTienCong);
    console.log(typeof GiaTienCong);
    var DonGia = parseInt(PhuTung[MaPhuTung].DonGiaThamKhao);
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
