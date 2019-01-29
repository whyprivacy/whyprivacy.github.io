$(document).ready(function() {

  $.getJSON('https://ipinfo.io', function(data) {

    var ipData = {
      ip: data.ip,
      city: data.city,
      state: data.region,
      zip: data.postal,
      country: data.country,
      location: data.loc,
      areaCode: (data.phone != null)? data.phone : ''
    };

    buildTable(document.getElementById('ip'), ipData);

    function updateIpTable(table) {
      var row, value;

      for (var key in ipData) {
        if (ipData[key] != '') {
          row = table.insertRow(-1);
          keyCell = row.insertCell(0);
          valCell = row.insertCell(1);
          keyCell.innerHTML = key;
          valCell.innerHTML = ipData[key];
        }
      }
    }
  });
});
