// js for page component behavior
function getURLParam(name) {
	return new URL(location).searchParams.get(name);
}

var createPage = () => {
	// $('.ui.sidebar')
	//   .sidebar({
	//     context: '.spacer'
	//   })
	// ;
$('body')
    .css('padding-top', $('#top-menu').height());
    setListeners();
}

function setListeners() {
		checkWindow();
		window.addEventListener("resize", (evt) => {
		checkWindow();
	});
}

function checkWindow() {
		if (document.body.clientWidth < 700) {
			document.getElementsByClassName("sidebar")[0].className = "ui visible left vertical very thin sidebar menu";
			var labels = document.getElementsByClassName("sideLabel");
			for (var i=0;i<labels.length;i++) {
			labels[i].style.display = "none";
		}
		}
	else if (document.body.clientWidth < 840) {
		document.getElementsByClassName("sidebar")[0].className = "ui visible left vertical thin sidebar menu";
		var labels = document.getElementsByClassName("sideLabel");
			for (var i=0;i<labels.length;i++) {
			labels[i].style.display = "inline";
		}
	} else if (document.body.clientWidth > 840) {
		document.getElementsByClassName("sidebar")[0].className = "ui visible left vertical sidebar menu";
				var labels = document.getElementsByClassName("sideLabel");
			for (var i=0;i<labels.length;i++) {
			labels[i].style.display = "inline";
		}
	}
}
document.addEventListener("DOMContentLoaded", createPage);
