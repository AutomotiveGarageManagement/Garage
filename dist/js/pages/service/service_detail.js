//table
$(document).ready(function () {
  var storedData = localStorage.getItem("mockData");
  var mockData = JSON.parse(storedData);
  var itemData = localStorage.getItem("item");
  var item = JSON.parse(itemData);
  console.log(mockData);
  console.log(item);
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
