// js for page component behavior


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
