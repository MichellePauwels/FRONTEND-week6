var parkingService = (function()
{
  //"use strict";

  //private fields

  //API, public
  //alles wat publiek is in object returnen, { niet op andere lijn schrijven!!
  return{
    get:function()
    {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open("GET", config.url, false); //false wil zeggen sychrone call, stoppen met alles om data op te halen
      xmlHttp.send(null);

      if(xmlHttp.status === 200)
      {
        var data = JSON.parse(xmlHttp.responseText);
        var parkings = [];

        for(var i = 0, l = data.Parkings.parkings.length; i < l; i++)
        {
          var p = data.Parkings.parkings[i];
          var newP = new Parking(p.name, p.description, p.address, p.availableCapacity, p.totalCapacity);

          parkings.push(newP);
        }

        return parkings;
      }

    },
    getById:function(){}
  };

})();
