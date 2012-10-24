var lunch = {
	// Data for all restaurants in SV
	data:  [{	"name": "Los Gallos",
				"vegetarian" : "yes",
				"cost" : "low"
			},
			{	"name": "Scott's Valley Chinese",
				"vegetarian" : "yes",
				"cost" : "low"
			},
			{	"name": "Sao Kook",
				"vegetarian" : "yes",
				"cost" : "low"
			},
			{	"name": "Jia Tella",
				"vegetarian" : "yes",
				"cost" : "medium"
			},
			{	"name": "Dawgs",
				"vegetarian" : "no",
				"cost" : "low"
			},
			{	"name": "Malone's",
				"vegetarian" : "yes",
				"cost" : "high"
			}
	],
	
	// Global variable for storing filtered list of restaurants
	filtered: [],
	
	all: function() {
		lunch.reset();
		lunch.list(lunch.data);
	},
	
	list: function(lunchList) {
		var lunchTable;
		lunchTable = "<h2>Restaurants</h2><table class='table table-striped'>";
		lunchTable += "<thead><tr><th>Name</th><th>Vegetarian Menu?</th><th>Cost</th></tr></thead><tbody>";
		for (var i = 0; i < lunchList.length; i++) {
			lunchTable += "<tr><td>" + lunchList[i].name + "</td><td>" + lunchList[i].vegetarian + "</td><td>" + lunchList[i].cost + "</td><td><button class='btn btn-success lets-eat'>Let's Eat</button></td></tr>";
		}
		lunchTable += "</tbody></table>";
		$('#lunch-list').html(lunchTable);
	},
	
	init: function(v,c) {
		lunch.reset();
		lunch.filter(v,c);
		lunch.list(lunch.filtered);
		$('.lets-eat').each( function(index) {
			$(this).click( function() {
				window.localStorage.setItem('lastVisited',lunch.filtered[index].name);
				$(this).addClass('disabled').html('Burp!');
			})
		});
	},
	
	filter: function(v,c) {
		lunch.data.filter( function(index) {
			if (c == index.cost && v == index.vegetarian) {
				lunch.filtered.push(index);
			}
		});
	},
	
	// reset filters and display
	reset: function() {
		$('#lunch-list').empty();
		lunch.filtered = [];
	}
}

$(document).ready(function() {
  $('#whats-for-lunch').click( function(e) {
	   e.preventDefault();
	   var v = "no";
	   if ($('#vegetarian').val() == "on") {
		   v = "yes";
	   } else {
		   v = "no";
	   }
	   var c = $('#cost').val();
	   lunch.init(v,c);
  });
  $('#see-all').click( function(e) {
	   e.preventDefault();
	   lunch.all();
  });
});