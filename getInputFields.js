var values = [];
var inputFields = document.getElementsByTagName('input');
var textFields = document.getElementsByTagName('textarea');
var saveButton = document.getElementByName('ACT_PostCallUpdateTaskLookups:j_id19:j_id20:j_id55:j_id56');

if(saveButton != null)
{
	//saveButton.onclick = function() {window.open('https://www.codexworld.com', '_blank');}
	console.log("Hurray");
}

for (var i = 0; i < inputFields.length; i++) {
	var currentID = inputFields[i].getAttribute('id');
	if (currentID != null && currentID !== '')
	{
		if(currentID == "ACT_PostCallUpdateTaskLookups:j_id19:j_id20:j_id47:j_id49")
		{
				values.push(inputFields[i].getAttribute('id') + ": " + inputFields[i].value);
		}
		else if(currentID == "ACT_PostCallUpdateTaskLookups:j_id19:j_id20:j_id47:j_id50")
		{
			values.push(inputFields[i].getAttribute('id') + ": " + inputFields[i].value);
		}
	}
}
for (var i = 0; i < textFields.length; i++) {
	var currentID = textFields[i].getAttribute('id');
	if (currentID != null && currentID !== '')
	{
		if(currentID == "ACT_PostCallUpdateTaskLookups:j_id19:j_id20:j_id47:j_id51")
		{
				values.push(textFields[i].getAttribute('id') + ": " + textFields[i].value);
		}
		
	}
}

for(var i = 0; i < values.length; i++)
{
	console.log(values[i]);
}