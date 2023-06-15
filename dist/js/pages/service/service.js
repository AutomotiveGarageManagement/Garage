$(document).ready(function () {
  // Kích hoạt DataTables
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

  // Xử lý sự kiện click của nút "Thêm"
  $("#BtnThemXe").click(function (e) {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của nút submit (nếu có)

    // Lấy giá trị từ các trường nhập liệu
    var TenChuXe = $("#InputTenChuXe").val();
    var DiaChiCX = $("#InputDiaChiChuXe").val();
    var SDT = $("#InputSoDienThoaiChuXe").val();
    var Email = $("#InputEmail").val();
    var CMND = $("#InputCMND").val();
    var HanGiaoXe = $("#InputNgayTiepNhan").val();
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
      .then((data) => console.log(data))
      .catch((error) => console.log("ERROR"));

    //location.reload();
    // gửi tại đây!
  });
});

// Đợi cho tài liệu HTML được tải xong
$(document).ready(function () {});
