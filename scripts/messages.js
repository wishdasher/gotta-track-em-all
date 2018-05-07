function submitMessage() {


	var message = document.getElementById("message-input").value;
	if(message.length == 0)
	{
		return
	}
	addMessage(['send', message]);
	var elt = document.getElementById("messages");
	elt.scrollTop = elt.scrollHeight;
	setTimeout(function(){ 
		addMessage(['receive', "Yes Let's Do it"]); 
		var elt = document.getElementById("messages");
		elt.scrollTop = elt.scrollHeight;
	}, 2300);
	document.getElementById("message-input").value = "";



}

function addMessage(input_message) {
	var message_list = JSON.parse(localStorage.getItem("messages"));
	message_list.list.push(input_message);
	console.log("Message List")
	console.log(message_list)
	var message_obj = message_list;
	localStorage.setItem("messages", JSON.stringify(message_obj))

	updateHTML()
}


function updateHTML() {
	var message_obj = JSON.parse(localStorage.getItem("messages"));
	var html = "";
	for (var i = 0; i < message_obj.list.length; i++)
	{
		var message = message_obj.list[i]
		if (message[0] ==="send")
		{
			html += '<li> <div class="message send"> ' + message[1] + ' </div></li>'
		}
		if (message[0] ==="receive")
		{
			html += '<li> <div class="message receive"> ' + message[1] + ' </div></li>'
		}
	}
	document.getElementById("message-list").innerHTML = html;
}



function initializeMessages() {
	document.getElementById("search").addEventListener("keypress", (evt) => {
		var val = document.getElementById("search").value;
		if (evt.keyCode === 13 && "ash".includes(val.toLowerCase())) { // enter key
			document.getElementsByClassName("friend")[0].style.display = "grid";
		} else if (evt.keyCode === 13 && !"Ash".includes(val.toLowerCase())) {
			document.getElementsByClassName("friend")[0].style.display = "none";
		}
	});

	if (!localStorage.getItem("messages"))
	{
		var obj = {"list": []}
		localStorage.setItem("messages", JSON.stringify(obj))
	}
	updateHTML()
	var elt = document.getElementById("messages");
	elt.scrollTop = elt.scrollHeight;


}

function resetMessages() {
	var message_list = JSON.parse(localStorage.getItem("messages"));
	message_list.list = []
	localStorage.setItem("messages", JSON.stringify(message_list))
}

document.addEventListener("DOMContentLoaded",initializeMessages);
