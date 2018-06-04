var callWrapSummary = document.getElementById('ACT_PostCallUpdateTaskLookups:j_id19:j_id20:j_id47:j_id51');
var commentText = document.getElementById('ACT_PostCallUpdateTaskLookups:j_id19:j_id20:j_id47:j_id52');
var emailTaskSummary = document.getElementById('00N0P000006DxMi');

//Set call wrap 
if(callWrapSummary != null && commentText != null)
{
	callWrapSummary.style.height = "140px";
	if(callWrapSummary == '')
	{
		callWrapSummary.value = "T2 Consult\nIB:\nOB:";
	}
	if(commentText = '')
	{
		commentText.value = "NA";
	}
}

if(emailTaskSummary != null)
{
	emailTaskSummary.style.height = "140px";
	if(emailTaskSummary == '')
	{
		emailTaskSummary.value = "T2 Elevation\nIB:\nOB:";
	}
}