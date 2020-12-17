// from data.js
var tableData = data;

// YOUR CODE HERE!
var totalRecords = d3.select("#totalRecords");
var filterRecords = d3.select("#filterRecords");
var tbody = d3.select("tbody");
var table = d3.select("table");
table.attr("class", "table table-bordered");

//When the page loads, do first build of the table from complete data.
buildTable(data);

var button = d3.select("#filter-btn");
var inputDate = d3.select("#datetime")
var inputCity = d3.select("#city")
// Select the form
var form = d3.select("form");

// Create event handlers
button.on("click", runEnter);
form.on("submit", runEnter);
inputDate.on('change', runEnter);
inputCity.on('change', runEnter);


// Complete the event handler function for the form
function runEnter() {
  var filterDate = inputDate.property("value");
  console.log(filterDate);
  var filterCity = inputCity.property("value");
  console.log(filterCity);

  var newData = data;
  //Date Filter
  if (filterDate !== "") {
    //Filter is ON, collect filtered data and rebuild table
    var newData = newData.filter((item) => {
      return Date.parse(item.datetime) === Date.parse(filterDate);
    });
  }

  //City Filter
  if (filterCity !== "") {
    //Filter is ON, collect filtered data and rebuild table
    var newData = newData.filter((item) => {
      return item.city.toLowerCase().startsWith(filterCity.toLowerCase());
    });
  }
  console.log(newData);
  buildTable(newData);
}

function buildTable(set) {
  tbody.html(null); //Dumps previous table contents
  set.forEach((item) => {
    //Rebuild table from the given set of data
    let row = tbody.append("tr");
    row.append("td").text(item.datetime);
    row.append("td").text(item.city);
    row.append("td").text(item.state);
    row.append("td").text(item.country);
    row.append("td").text(item.shape);
    row.append("td").text(item.durationMinutes);
    row.append("td").text(item.comments);
  });
  totalRecords.text(data.length);
  filterRecords.text(set.length);
}
