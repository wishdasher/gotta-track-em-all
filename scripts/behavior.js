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
		if (document.body.clientWidth < 840) {
		document.getElementsByClassName("sidebar")[0].className = "ui visible left vertical thin sidebar menu";
	} else 	if (document.body.clientWidth > 840) {
		document.getElementsByClassName("sidebar")[0].className = "ui visible left vertical sidebar menu";
	}
}
document.addEventListener("DOMContentLoaded", createPage);
