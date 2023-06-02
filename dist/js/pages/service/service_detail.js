//table
$(document).ready(function () {
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
});
//popup
var phieuThu = document.getElementById("PhieuThu");
var showHiddenPhieuThu = document.getElementById("showHiddenPhieuThu");
function showHiddenDivPhieuThu() {
  phieuThu.style.display = "block";
}
showHiddenPhieuThu.addEventListener("click", showHiddenDivPhieuThu);
