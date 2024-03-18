var app = angular.module("myapp", ["ngRoute"]);
app.config(function ($routeProvider) {
  $routeProvider
    .when("/trangchu", {
      templateUrl: "trangchu.html?" + Math.random(),
      controller: "trangchuCtrl",
    })
    .when("/sanpham", {
      templateUrl: "sanpham.html?" + Math.random(),
      controller: "sanphamCtrl",
    })
    .when("/giohang", {
      templateUrl: "giohang.html?" + Math.random(),
      controller: "giohangCtrl",
    })
    .when("/dangnhap", {
      templateUrl: "dangnhap.html?" + Math.random(),
      controller: "dangnhapCtrl",
    })
    .when("/dangki", {
      templateUrl: "dangki.html?" + Math.random(),
      controller: "dangkiCtrl",
    })
    .when('/detail/:id', {
        templateUrl: 'sanphamchitiet.html',
        controller: 'detailCtrl'
    })
    .otherwise({
      templateUrl: "trangchu.html?" + Math.random(),
    });
});
app.controller("myctrl", function ($scope, $http) {
  $scope.giohang = [];
  $scope.dsSP = [];
  $http.get("sanpham.json").then(
    function (response) {
      $scope.dsSP = response.data;
      $scope.page = 1;
      $scope.limit = 6;
      $scope.start = ($scope.page - 1) * $scope.limit;

      $scope.totalPage = Math.ceil($scope.dsSP.length / $scope.limit);
      $scope.numberOfPage = Array.from(Array($scope.totalPage).keys());
      console.log($scope.numberOfPage);
      $scope.showPage = function (p) {
        $scope.page = p;
        $scope.start = ($scope.page - 1) * $scope.limit;
      };
      console.log($scope.pageCount);
    },
    function (response) {
      alert("Lỗi");
    }
  );
  
});
app.controller("trangchuCtrl", function ($scope) {
  $scope.mua = function (sp) {
    var chuaCo = true;
    for (const item of $scope.$parent.giohang) {
      if (item.id == sp.id) {
        //th1 : da co sp trong gio hang
        item.soluong += $scope.dsSP[0].quantity;
        chuaCo = false;
        break;
      }
    }
    //th2 : chua co sp trong gio hang
    if (chuaCo) {
      sp.soluong = $scope.dsSP[0].quantity;
      $scope.$parent.giohang.push(sp);
    }
  };
});
app.controller("sanphamCtrl", function ($scope) {
  $scope.mua = function (sp) {
    var chuaCo = true;
    for (const item of $scope.$parent.giohang) {
      if (item.id == sp.id) {
        //th1 : da co sp trong gio hang
        item.soluong++;
        chuaCo = false;
        break;
      }
    }
    //th2 : chua co sp trong gio hang
    if (chuaCo) {
      sp.soluong = 1;
      $scope.$parent.giohang.push(sp);
    }
  };

});
app.controller('detailCtrl', function ($scope, $routeParams) {
  var id = $routeParams.id;
  //    $scope.sanpham = $scope.$parent.dssp.filter(sp => sp.id == id)[0];
  for (const item of $scope.$parent.dsSP) {
      if (item.id == id) {
          $scope.sanpham = item;
      }
  }
  $scope.mua = function (sp) {
    var chuaCo = true;
    for (const item of $scope.$parent.giohang) {
      if (item.id == sp.id) {
        //th1 : da co sp trong gio hang
        item.soluong += $scope.sanpham.quantity;
        chuaCo = false;
        break;
      }
    }
    //th2 : chua co sp trong gio hang
    if (chuaCo) {
      sp.soluong = $scope.sanpham.quantity;
      $scope.$parent.giohang.push(sp);
    }
  };
});
app.controller("giohangCtrl", function ($scope) {
  $scope.tinhTongtien = function () {
    var tong = 0;
    for (const item of $scope.$parent.giohang) {
      tong = tong + item.gia * item.soluong;
    }
    return tong;
  };
  $scope.xoahet = function () {
    $scope.$parent.giohang = [];
  };
  $scope.xoa = function (id) {
    //   $scope.$parent.giohang = $scope.$parent.giohang.splice(i,1);
    $scope.$parent.giohang = $scope.$parent.giohang.filter((sp) => sp.id != id);
  };
});
app.controller("dangnhapCtrl", function ($scope) {});
app.controller("dangkiCtrl", function ($scope) {});
