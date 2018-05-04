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

}
document.addEventListener("DOMContentLoaded", createPage);
