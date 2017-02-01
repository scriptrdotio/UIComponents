(function() {
angular.module('demoApp.list',[])
.value('MyList',[
{
  "id": 1,
  "title": "ASD Headquarters",
  "items": [
    {
      "id": 11,
      "title": "San Jose",
      "items": [
        {
         "id":13,
         "title":"Jensen Chapman's Team",
         "items": [
            {
              "id":14,
              "title":"Jimmy John"
            },
            {
              "id":15,
              "title":"Daniel Mills"
            }
            ,
            {
              "id":16,
              "title":"Chris Boden"
            }
           ]
        }
        ],
    },
    {
      "id": 12,
      "title": "Irvine",
      "items": [
        {
         "id":23,
         "title":"Tracey Chapman's Team",
         "items": [
            {
              "id":24,
              "title":"San Jesus"
            },
            {
              "id":25,
              "title":"Fat Albert"
            }
            ,
            {
              "id":26,
              "title":"Connor McDavid"
            }
           ]
        }
        ]
    },
    {
      "id":30,
      "title":"San Diego",
      "items": [{
        "id":31,
        "title":"Duran Duran's Team",
        "items":[
             {
              "id":32,
              "title":"Amberlynn Pinkerton"
            },
            {
              "id":33,
              "title":"Tony Mejia"
            }
            ,
            {
              "id":34,
              "title":"Richard Partridge"
            }
            ,
            {
              "id":35,
              "title":"Elliot Stabler"
            }
          ]
        },
        {
        "id":40,
        "title":"Steely Dan's Team",
        "items":[
             {
              "id":36,
              "title":"Tony Stark"
            },
            {
              "id":37,
              "title":"Totally Rad"
            }
            ,
            {
              "id":38,
              "title":"Matt Murdock"
            }
            ,
            {
              "id":39,
              "title":"Stan Lee"
            }
          ]
        }
      ]
    }
  ]
}
]);

})()