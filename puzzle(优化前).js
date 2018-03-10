var isend = true;
var time = -1;
var ti;
window.onload = function() {
	var sta = document.getElementById('begin');
	var pic = document.getElementsByClassName('part');
	initial();
	sta.addEventListener('click', start);
	game();
/*--------------可拖动时间栏---------------------*/
    var isdown = false;
    function down(e) {
        isdown = true;
    }
    function mov(e){
        var tim = document.getElementById('time');
        if(isdown) {
            tim.style.left = e.clientX+'px';
            tim.style.top = e.clientY+'px';
        }
    }
    function up(e) {
        isdown = false;
    }
    document.getElementById('time').addEventListener('mousedown',down);
    document.addEventListener('mousemove',mov);
    document.getElementById('time').addEventListener('mouseup',up);
};
function initial() {
	var frag = document.createDocumentFragment();
	for (var i = 1; i < 5; i++) {
		for (var j = 1; j < 5; j++) {
			var part = document.createElement('div');
			part.id = 'part'+(4*(i-1)+j).toString();
			part.className = 'part row'+i.toString()+' column'+j.toString();
			frag.appendChild(part);
		}
	}
	document.getElementById("game").appendChild(frag);
}
function time_() {
	document.getElementById('t').value = 'time:'+time;
	time++;
	clearTimeout(ti);
	ti = setTimeout(time_, 1000);
}
var even = function(a) {
	var count = 0;
	for (var i = 0; i < a.length-1; i++) {
		for (var j = i+1; j < a.length; j++) {
			if (a[j] < a[i])
				count++;
		}
	}
	if (count%2 === 0)
		return true;
	else
		return false;
};
var randomNum = function() {
	return 0.2 - Math.random();
};
var start = function() {
	isend = false;
	var arr = [];
    for(var i = 0; i < 15; i++) {
            arr[i]=i;
    }
    arr.sort(function() { return 0.5 - Math.random();});
    while (!even(arr)) {
    	var q = randomNum();
    	arr.sort(q);
    }
    for (var j = 0; j < 15; j++) {
		var change = document.getElementById('part'+(j+1).toString());
		change.className='part row'+(parseInt(arr[j]/4)+1).toString()+' column'+(parseInt(arr[j]%4)+1).toString();
	}
	document.getElementById('part16').className='part row4 column0';
	time = -1;
	clearTimeout(ti);
	setTimeout(time_, 0);
	time_();
};
function move() {
	if (isend === true) return;
	var x = this.offsetLeft;
	var y = this.offsetTop;
	var blank_x = document.getElementById('part16').offsetLeft;
	var blank_y = document.getElementById('part16').offsetTop;
	if ((Math.abs(y - blank_y) === 100 && blank_x === x) ||
		(Math.abs(x - blank_x) === 100 && blank_y === y)) {
		var temp = document.getElementById('part16').className;
		document.getElementById('part16').className = this.className;
		this.className = temp;
	}
	setTimeout(win, 502);
}
function win() {
	if (time > 0)
		isend = false;
	var a = document.getElementsByClassName('part');
	var count = 0;
	for (var i = 1; i < 5; i++) {
		for (var j = 1; j < 5; j++) {
			if (i === 4 && j === 4) break;
			var x = a[4*(i-1)+j-1].offsetLeft;
			var y = a[4*(i-1)+j-1].offsetTop;
			if (x === 100*(j-1)+10 && y === 100*(i-1)+10) {
				count++;
			}
		}
	}
	if (count === 15 && isend === false) {
		alert("YOU WIN!  TIME:  "+time+"s");
		isend = true;
		time = -1;
		document.getElementById('t').value = 'time:';
		clearTimeout(ti);
	}
}
var game = function() {
	var a = document.getElementsByClassName('part');
	for(i = 0;i < a.length; i++){
        a[i].onclick = move;
    }
};