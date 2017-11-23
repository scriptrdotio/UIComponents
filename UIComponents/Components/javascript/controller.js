angular.module("MyApp").controller('MyCtrl', function($scope, $timeout, $routeParams, $sce, $window, resources, headerItems) {

    var vm = this; 

    vm.headerItems = headerItems;

    $scope.$on('$routeChangeStart', function(angularEvent, next, current) { 
        if(next && next.$$route && next.$$route.originalPath != "") {
            vm.currentRoute = next.$$route.originalPath;
        }
    });

    this.slickConfig = {
        enabled: true,
        autoplay: true,
        draggable: false,
        autoplaySpeed: 3000,
        method: {},
        event: {
            beforeChange: function (event, slick, currentSlide, nextSlide) {
            },
            afterChange: function (event, slick, currentSlide, nextSlide) {
            }
        }
    };

    var jsfiddle = {
        '#barChart' : "https://jsfiddle.net/scriptrdotio/8upp5s7j/8/",
        '#areaChart' : "https://jsfiddle.net/scriptrdotio/z5dv5pwo/4/",
        '#lineChart' : "https://jsfiddle.net/scriptrdotio/z5dv5pwo/6/",
        '#donutChart' : "https://jsfiddle.net/scriptrdotio/x5woyavs/1/",
        '#gauge' : "https://jsfiddle.net/scriptrdotio/L4zqh0a4/1/",
        '#speedometer' : "https://jsfiddle.net/scriptrdotio/mqk0oxv2/2/",
        '#thermometer' : "https://jsfiddle.net/scriptrdotio/aohkktau/8/",
        '#odometer' : "https://jsfiddle.net/scriptrdotio/wkqxca96/1/",
        '#progressBar' : "https://jsfiddle.net/scriptrdotio/84f1481b/2/",
        '#map' : "https://jsfiddle.net/scriptrdotio/4crnna86/3/",
        '#accelerometer' : "https://jsfiddle.net/scriptrdotio/9snL166b/2/",
        '#grid' : "https://jsfiddle.net/scriptrdotio/8z2dg6qv/6/",
        '#toggleSwitch' : "https://jsfiddle.net/scriptrdotio/8z2dg6qv/4/",
        '#slider' : "https://jsfiddle.net/scriptrdotio/seq3nd2f/2/",
        '#button' : "https://jsfiddle.net/scriptrdotio/tbyx22gt/1/"
    }

    vm.$postLink = function(){
        vm.currentNavItem = 'html';
        vm.editorOptions = {
            value: "",
            styleActiveLine: true,
            lineNumbers: true,
            lineWrapping: true,
            autoCloseBrackets: true,
            matchBrackets: true,
            theme: "neo",
            mode: "xml",
            readOnly: true
        };

        if($window.location.hash != ""){
            vm.selected = true;
            vm.currentNavItem = 'html';
            var route = $window.location.hash.replace('/', '');
            $timeout(function() {
                fillPlainText(route)
            }, 1500);
        }
    }  

    $scope.$watch('vm.currentNavItem', function(current, old){
        vm.setPlainText(current);
    }); 

    vm.setPlainText = function(language){
        if(language == 'html'){
            vm.editorOptions.mode = 'xml';
            vm.plainText = vm.html;
        }else if(language == 'javascript'){
            vm.editorOptions.mode = 'javascript';
            vm.plainText = vm.javascript;
        }else{
            vm.editorOptions.mode = 'css';
            vm.plainText = vm.css
        }
    }

    vm.addWidget = function(widget){
        vm.selected = true;
        fillPlainText(widget.href);
    } 

    function fillPlainText(route){
        vm.jsfiddle = jsfiddle[route];
        vm.html = $(route+'-html').html();
        vm.javascript = $(route+'-js').html();
        vm.css = $('#default-css').html();
        vm.setPlainText(vm.currentNavItem);
    }

    vm.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }

    vm.widgets = [
        {
            img: resources.sources.barChart,
            label: 'Bar Chart',
            href: '#barChart'  
        },
        {
            img: resources.sources.areaChart,
            label: 'Area Chart',
            href: '#areaChart'  
        },
        {
            img: resources.sources.lineChart,
            label: 'Line Chart',
            href: '#lineChart'  
        },
        {
            img: resources.sources.donutChart,
            label: 'Donut Chart',
            href: '#donutChart'  
        },
        {
            img: resources.sources.gauge,
            label: 'Gauge',
            href: '#gauge' 
        },
        {
            img: resources.sources.speedometer,
            label: 'Speedometer',
            href: '#speedometer'  
        },
        {
            img: resources.sources.thermometer,
            label: 'Thermometer',
            href: '#thermometer'  
        },
        {
            img: resources.sources.odometer,
            label: 'Odometer',
            href: '#odometer'  
        },
        /*
        {
            img: resources.sources.progressBar,
            label: 'Progress bar',
            href: '#progressBar'  
        },
        */
        {
            img: resources.sources.map,
            label: 'Map',
            href: '#map'  
        }, 
        {
            img: resources.sources.accelerometer,
            label: 'Accelerometer',
            href: '#accelerometer'  
        },
        {
            img: resources.sources.grid,
            label: 'Grid',
            href: '#grid'  
        },
        {
            img: resources.sources.toggleSwitch,
            label: 'Toggle Switch',
            href: '#toggleSwitch'  
        },
        {
            img: resources.sources.slider,
            label: 'Slider',
            href: '#slider'  
        },
        {
            img: resources.sources.button,
            label: 'Button',
            href: '#button'  
        } 
        /*
  {
    img: resources.sources.iFrame,
    label: 'iFrame',
    href: '#iframe'  
  }
  */];

});

