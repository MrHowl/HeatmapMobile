<!DOCTYPE HTML>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>HeatmapMobile</title>
	<link rel="stylesheet" href="css/style.css" type="text/css">
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js"></script>
	<script type="text/javascript" src="js/heatmap.js"></script>
</head>

<body>
	<div id="wrapper">
		<input type="file" id="filesInput" accept="image/*" capture/>
		<input type="file" id="filesInputMultiple" accept="image/*"  multiple capture/>
		<br><br>
		<a href="javascript:void(0);" id="btnUpload">开始上传</a>
		<p id="info"></p>
		<span id="percent"></span>
		<p id="uploadSpeed"></p>
		<ul id="imageBox"></ul>
	</div>
</body>
</html>