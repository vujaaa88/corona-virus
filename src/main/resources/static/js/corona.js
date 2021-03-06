const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
		"x-rapidapi-key": "82d49e4151mshca671f4d357b7f4p11342djsn324cb805129e"
	}
}	
$.ajax(settings).done(function (response) {
	let obj = JSON.parse(response);
	let sum = obj.total_cases;
	let deaths = obj.total_deaths;
	let recov = obj.total_recovered;
	
	sum = sum.replace(/,/g, '');
	deaths = deaths.replace(/,/g, '');
	recov = recov.replace(/,/g, '');
	
	sum = parseInt(sum);
	deaths = parseInt(deaths);
	recov = parseInt(recov);
	let active_cases = sum - (deaths + recov);
	active_cases = formatNumber(active_cases);
	
	document.getElementById("total").innerHTML +="<span style='font-size:6vw; font-weight:bold;'>" + obj.total_cases + "</span>"
	document.getElementById("active").innerHTML +="<span style='color:black; font-size:6vw; font-weight:bold;'>" + active_cases + "</span>"
	document.getElementById("deaths").innerHTML +="<span style='color: red; font-size:6vw; font-weight:bold;'>" + obj.total_deaths + "</span>"
	document.getElementById("recovered").innerHTML += "<span style='color: lime;font-size:6vw; font-weight:bold;'>" + obj.total_recovered + "</span>"

	let percentage = "3.40 %";
	document.getElementById("percentage").innerHTML += "<span style='font-size:6vw; font-weight:bold;'>" + percentage + "</span>";
});
function getDetail(){
	let country = document.getElementById("site-search").value;
	let elements = {
		"async": true,
		"crossDomain": true,
		"url": "https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php?country=" + country,
		"method": "GET",
		"headers": {
		"x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
		"x-rapidapi-key": "82d49e4151mshca671f4d357b7f4p11342djsn324cb805129e"
		}
	}

$.ajax(elements).done(function (resp) {
	let myData = JSON.parse(resp);
	document.getElementById("list").innerHTML = "";
	document.getElementById("msg").innerHTML = "";
	if(myData.latest_stat_by_country !== undefined && myData.latest_stat_by_country.length !== 0){
							
							let array = [];
							let min_cases;
							if(myData.latest_stat_by_country[0].total_deaths === ""){
								min_cases = myData.latest_stat_by_country[0].total_cases;
								min_cases = min_cases.replace(/,/g, '');
									let tot_case = myData.latest_stat_by_country[0].total_cases;
									tot_case = tot_case.replace(/,/g, '');
									min_cases = (tot_case * 100);
							} else {
								min_cases = myData.latest_stat_by_country[0].total_deaths;
								min_cases = min_cases.replace(/,/g, '');
								min_cases *= 800;
							}
							min_cases = formatNumber(min_cases);
						
							
							array.push('<li>' + "Country: " + myData.latest_stat_by_country[0].country_name + '</li>');
							array.push('<li>' + "Confirmed: " + myData.latest_stat_by_country[0].total_cases + '</li>');
							array.push('<li>' + "New Cases: " + "<span style='color:#FF8C00;'>" + "+" + myData.latest_stat_by_country[0].new_cases + "</span>" + '</li>');
							array.push('<li>' + "Active cases: "+ "<span style='color:black;'>" + myData.latest_stat_by_country[0].active_cases + "</span>" + '</li>');
							array.push('<li>' + "Serious Critical: " +  "<span style='color:#FF4500;'>" + myData.latest_stat_by_country[0].serious_critical + "</span>" + '</li>');
							array.push('<li>' + "Deaths: "+ "<span style='color:red;'>" + myData.latest_stat_by_country[0].total_deaths + "</span>" + '</li>');
							array.push('<li>' + "Recovered: " + "<span style='color:lime;'>" + myData.latest_stat_by_country[0].total_recovered + "</span>" + '</li>');
							array.push('<li>' + "Last Update: " + myData.latest_stat_by_country[0].record_date + '</li>');
							array.push('<li>' + "The actual number of infected is around:  "+ "<span style='color:black; font-weight:bold;'>" + min_cases +"</span>" + "!!!" + '</li>');
							$('ul').append($(array.join('')));
			
	} else {
		document.getElementById("msg").innerHTML +="Type valid country name";
	}
});
}
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}