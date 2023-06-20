/*
Template Name: Admin Pro Admin
Author: Wrappixel
Email: niravjoshi87@gmail.com
File: js
*/
$(function () {
  "use strict";

  // ==============================================================
  // Doanh thu tuần
  // ==============================================================
  var chart = new Chartist.Line(
    ".sales",
    {
      labels: [
        "1.5",
        "2.5",
        "3.5",
        "4.5",
        "5.5",
        "1.5",
        "2.5",
        "3.5",
        "4.5",
        "5.5",
        "1.5",
        "2.5",
        "3.5",
        "4.5",
        "5.5",
        "1.5",
        "2.5",
        "3.5",
        "4.5",
        "5.5",
        "1.5",
        "2.5",
        "3.5",
        "4.5",
        "5.5",
        "1.5",
        "2.5",
        "3.5",
        "4.5",
        "5.5",
      ],
      series: [
        [
          24.5, 28.3, 42.7, 10, 34.9, 24.5, 28.3, 42.7, 10, 34.9, 24.5, 28.3,
          42.7, 10, 34.9, 24.5, 28.3, 42.7, 10, 34.9, 24.5, 28.3, 42.7, 10,
          34.9, 24.5, 28.3, 42.7, 10, 34.9,
        ],
        [
          8.9, 5.8, 21.9, 5.8, 16.5, 8.9, 5.8, 21.9, 5.8, 16.5, 8.9, 5.8, 21.9,
          5.8, 16.5, 8.9, 5.8, 21.9, 5.8, 16.5, 8.9, 5.8, 21.9, 5.8, 16.5, 8.9,
          5.8, 21.9, 5.8, 16.5,
        ],
      ],
    },
    {
      low: 0,
      high: 48,
      showArea: true,
      fullWidth: true,
      plugins: [Chartist.plugins.tooltip()],
      axisY: {
        onlyInteger: true,
        scaleMinSpace: 40,
        offset: 20,
        labelInterpolationFnc: function (value) {
          return value / 10 + "k";
        },
      },
    }
  );

  var chart = [chart];

  // ==============================================================
  // Tongr doanh thu
  // ==============================================================
  var sparklineLogin = function () {
    $("#earnings").sparkline(
      [6, 10, 9, 11, 9, 10, 12, 10, 9, 11, 9, 10, 12, 10, 9, 11, 9],
      {
        type: "bar",
        height: "40",
        barWidth: "4",
        width: "100%",
        resize: true,
        barSpacing: "8",
        barColor: "#137eff",
      }
    );
  };
  var sparkResize;

  $(window).resize(function (e) {
    clearTimeout(sparkResize);
    sparkResize = setTimeout(sparklineLogin, 500);
  });
  sparklineLogin();
});

$(document).ready(function () {
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
      console.log(param.SoLuongXeToiDa);
      $("#XeToiDaMoiNgay").text(param.SoLuongXeToiDa);
    })
    .catch((error) => console.log("ERROR"));

  fetch("http://localhost:8888/api/statistic/get/sum-receipt/6", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      all_days = data["DT"][0]["All Days"];
      today = data["DT"][0]["Today"];
      console.log(all_days, today);
      $("#TongSoXe").text(all_days);
      $("#XeHomNay").text(today);
    })
    .catch((error) => console.log("ERROR"));
  fetch("http://localhost:8888/api/statistic/get/sum-turnover/6", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      all_days = data["DT"][0]["All Days"];
      today = data["DT"][0]["Today"];
      console.log(all_days, today);
      $("#TongDoanhThu").text(all_days);
      $("#DoanhThuHomNay").text(today);
    })
    .catch((error) => console.log("ERROR"));
  fetch("http://localhost:8888/api/statistic/get/sum-customer", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      all_days = data["DT"][0]["All Days"];
      today = data["DT"][0]["Today"];
      console.log(all_days, today);
      $("#TongKhachHang").text(all_days);
      $("#KhachHangHomNay").text(today);
    })
    .catch((error) => console.log("ERROR"));
});
