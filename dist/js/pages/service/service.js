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

  var CMND;

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

    //location.reload();
  });

  // Xử lý sự kiện click của nút "Thêm"
  $("#BtnThemXe").click(function (e) {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của nút submit (nếu có)

    // Lấy giá trị từ các trường nhập liệu
    var TenChuXe = $("#InputTenChuXe").val();
    var DiaChiCX = $("#InputDiaChiChuXe").val();
    var SDT = $("#InputSoDienThoaiChuXe").val();
    var Email = $("#InputEmail").val();

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
      .then((data) => console.log(data))
      .catch((error) => console.log("ERROR"));

    //location.reload();
  });
});

// Đợi cho tài liệu HTML được tải xong
$(document).ready(function () {
  //append table

  function createTableRows(data) {
    var tableBody = $("#myTable tbody");
    tableBody.empty(); // Xóa dữ liệu cũ trong bảng

    $.each(data, function (index, item) {
      var row = $("<tr>");
      row.append($("<th>").attr("scope", "row").text(item.ID));
      row.append(
        $("<td>")
          .attr("id", "Td_Ten_" + item.ID)
          .text(item.Ten)
      );
      row.append(
        $("<td>")
          .attr("id", "Td_BienSo_" + item.ID)
          .text(item.BienSo)
      );
      row.append(
        $("<td>")
          .attr("id", "Td_HieuXe_" + item.ID)
          .text(item.HieuXe)
      );
      row.append(
        $("<td>")
          .attr("id", "Td_NgayTiepNhan_" + item.ID)
          .text(item.NgayTiepNhan)
      );
      row.append(
        $("<td>")
          .attr("id", "Td_TienNo_" + item.ID)
          .text(item.TienNo)
      );

      var statusLabel = $("<span>").addClass("label");
      if (item.TrangThai === "Đã tiếp nhận") {
        statusLabel.addClass("label-purple").text(item.TrangThai);
      } else if (item.TrangThai === "Hoàn thành") {
        statusLabel.addClass("label-success").text(item.TrangThai);
      } else if (item.TrangThai === "Đang xử lý") {
        statusLabel.addClass("label-info").text(item.TrangThai);
      }
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
    .then((data) => console.log(data))
    // .catch((error) => console.log("ERROR"));
    .catch((error) => {
      const mockData = [
        {
          ID: 1,
          Ten: "Mark",
          BienSo: "22A-222.22",
          HieuXe: "BMW",
          NgayTiepNhan: "22/02/2022",
          TienNo: 0,
          TrangThai: "Đã tiếp nhận",
        },
        {
          ID: 2,
          Ten: "Mark",
          BienSo: "22A-222.22",
          HieuXe: "BMW",
          NgayTiepNhan: "22/02/2022",
          TienNo: 0,
          TrangThai: "Hoàn thành",
        },
        {
          ID: 3,
          Ten: "Mark",
          BienSo: "22A-222.22",
          HieuXe: "BMW",
          NgayTiepNhan: "22/02/2022",
          TienNo: 0,
          TrangThai: "Đang xử lý",
        },
      ];

      console.log(mockData);
      createTableRows(mockData);
      localStorage.setItem("mockData", JSON.stringify(mockData));
    });
});
