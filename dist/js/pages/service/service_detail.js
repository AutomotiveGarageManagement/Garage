//table
$(document).ready(function () {
  var itemData = localStorage.getItem("item");
  var item = JSON.parse(itemData);
  console.log(item);

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
      $.each(data.DT, function (index, option) {
        selectElement.append(
          $("<option>")
            .attr("value", option.id)
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
    //get all wage type
    var LoaiTienCong = $("#CBBVatTuPhuTung").val();
    var VatTuPhuTung = $("#CBBLoaiTienCon").val();
    console.log(LoaiTienCong, VatTuPhuTung);
    fetch("http://localhost:8888/api/wage/find/wage", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        LoaiTienCong: LoaiTienCong,
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
