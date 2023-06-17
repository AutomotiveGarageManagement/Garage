$(document).ready(function () {
  // Kích hoạt DataTables

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

    location.reload();
  });

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
      row.append($("<td>").text(item.MaHangXe));
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
      statusLabel.addClass("label-purple").text("Đã tiếp nhận");
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
