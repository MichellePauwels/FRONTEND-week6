var vm =
{
  parkingSpots: null,
  showParkingSpots: function(elementSelector)
  {
    if(!this.parkingSpots || typeof(this.parkingSpots) !== "object")
    {
      throw new NoParkingSpotsException("No parkingSpots defined");
    }

    var element = document.querySelector(elementSelector);
    var htmlBuilder = "";

    for(var i = 0, l = this.parkingSpots.length; i < l; i++)
    {
      var p = this.parkingSpots[i];

      var percentage = 0;
      var parkingClass = "parking";

      if(p.availableCapacity > 0)
      {
        percentage = ((p.availableCapacity / p.totalCapacity) * 100).toFixed(2);
      }

      if(percentage === 0)
      {
        parkingClass += " parking-full";
        p.availableCapacity = 0;
      }
      else if(percentage < config.warningTreshold)
      {
        parkingClass += " parking-warning";
      }

      htmlBuilder += '<li class="' + parkingClass + '">';
      htmlBuilder += '<p class="parking-sign">P</p>';
      htmlBuilder += '<p class="parking-description">' + p.description + '</p>';
      htmlBuilder += '<p class="parking-stats">' + p.availableCapacity + '/' + p.totalCapacity + '</p>';
      htmlBuilder += '</li>';
    }

    element.innerHTML = htmlBuilder;
  }
};
