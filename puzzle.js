(function() {
	$(function() { new puzzle(); });

	function puzzle() {
		this.createPuzzle();
		this.listenStartbuttonClick();
		this.listenBlockCilck();
	}
	var p = puzzle.prototype;
	p.createPuzzle = function() {
		var fragment = document.createDocumentFragment();
		for (var i = 1; i < 17; i++) {
				var part = document.createElement('div');
				part.id = 'part'+(i).toString();
				part.className = 'part row'+Math.floor((i-0.1)/4+1).toString()+' column'+(i%4).toString();
				fragment.appendChild(part);
		}
		$("#game").append(fragment);
	};
	p.listenBlockCilck = function() {
		$(".part").on('click', function() {
			if (canMove(this))
				Move(this);
		});
	};
	function canMove(tile) {
		var x = tile.offsetLeft;
		var y = tile.offsetTop;
		var blank_x = $('#part16').position().left;
		var blank_y = $('#part16').position().top;
		return ((Math.abs(y - blank_y) === 100 && blank_x === x) || (Math.abs(x - blank_x) === 100 && blank_y === y));
	}
	function Move(tile) {
		var temp = $('#part16').attr('class');
		$('#part16').attr('class', tile.className);
		tile.className = temp;
		setTimeout(ifwin, 302);
	}
	function ifwin() {
		var Notwin = false;
		for (var i = 1; i <= 15; i++) {
			if($('#part'+i.toString()).attr('class') !== 'part row'+Math.floor((i-0.1)/4+1).toString()+' column'+(i%4).toString())
				Notwin = true;
		}
		if (!Notwin)
			alert("You Win!");
	}
	function even(arr) {
		var count = 0;
		for (var i = 0; i < arr.length-1; i++) {
			for (var j = i+1; j < arr.length; j++) {
				if (arr[j] < arr[i])
					count++;
			}
		}
		return count%2 === 0;
	}
	var randomNum = function() {
		return 0.2 - Math.random();
	};
	var getRandomOrder = function() {
		var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
		    arr.sort(function() { return 0.5 - Math.random();});
		    while (!even(arr)) {
		    	var q = randomNum();
		    	arr.sort(q);
		    }
		return arr;
	};
	p.listenStartbuttonClick = function() {
		$("#begin").on('click', function() {
			var arr = getRandomOrder();
		    updatePuzzle(arr);
			setTime();
		});
	};
	var updatePuzzle = function(arr) {
		for (var j = 0; j < 15; j++) {
			$('#part'+(j+1).toString()).attr('class', 'part row'+Math.floor((arr[j]-0.1)/4+1).toString()+' column'+(arr[j]%4).toString());
		}
		$('#part16').attr('class', 'part row4 column0');
	};
	var ti;
	function setTime() {
			$('#t').val("time: ");
			clearTimeout(ti);
			time(0);
	}
	function time(second) {
	    $('#t').val("time: "+second.toString());
	    ti = setTimeout(function() {
	        time(second+1);
	    },1000);
	}

}) ();