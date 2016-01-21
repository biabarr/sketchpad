
$(function() {
	var dimension = 16;
	var boxSize; 
	var container$ = $('#container');
	var checkbox$ = $('input[name=borders]');
	var boxes$;			

	var borderCheck = function() {
		if ( checkbox$.is(':checked') ) {
			boxes$.css('border', '1px dotted black');
		} else {
			$("div.box").css('border', 'none');
		}
	};


	checkbox$.change( borderCheck );		

	$(":button").click(function() {
		var whichButton = parseInt($(this).attr("value"),10);		
		dimension = prompt('How many boxes? (press RETURN for default)');

		if ( isNaN(dimension)  || dimension < 1 || dimension > 128 ) {
			dimension = ((whichButton === 5) ? 3 : 16);		
		}
		new_grid(dimension);
		handle(whichButton);
	});


	var handle = function(which) {
		function get_random_color() {	
			return '#'+Math.floor(Math.random()*16777215).toString(16);
		}

		container$.on("mouseenter", "div", function() {
			switch(which) {
				case 1:									
					$(this).addClass('simpleColor');
					break;
				case 2:									
					$(this).css("background-color", get_random_color());
					break;
				case 3:									
					var op = $(this).css("opacity");
					$(this).css("opacity", ( op > 0.1 ) ? ( op - 0.1 ) : op );
					break;
				case 4:				
					$(this).fadeTo(0,0);					
					break;
				
			}
		});

		container$.on("mouseleave", "div", which, function() {
			switch(which) {
				case 4:
					$(this).fadeTo(600,1);
					break;
				case 5:
					$(this).removeClass('rotate15');
					break;
				default:
					break;
			}
		});
	};


	var new_grid = function(size) {
		var divsToInsert = [];
		boxSize = Math.floor( 960 / size );

		container$.off();
		container$.html('');		

		container$.css('width', boxSize * size);	
		for ( var i = 0 ; i < size * size; i += 1) {
			divsToInsert[i] = "<div class='box' style='width:" + boxSize + "px; height:" + boxSize+"px;'></div>";
					}

		container$.append(divsToInsert.join(''));    
		boxes$ = $("div.box");			
		borderCheck();
	};


	$('#loading_Msg').css('display', 'none');		
	new_grid(dimension);
	handle(1);
});
