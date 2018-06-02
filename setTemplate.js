var taskSummary = document.getElementById('ACT_PostCallUpdateTaskLookups:j_id19:j_id20:j_id47:j_id51');
var commentText = document.getElementById('ACT_PostCallUpdateTaskLookups:j_id19:j_id20:j_id47:j_id52');

if(taskSummary != null && commentText != null)
{
	taskSummary.style.height = "140px";
	if(taskSummary == '')
	{
		taskSummary.value = "T2 Consult\nIB:\nOB:";
	}
	if(commentText = '')
	{
		commentText.value = "NA";
	}
}