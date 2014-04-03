<!DOCTYPE HTML>

<html>

<head>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

<title>HeatmapMobile</title>

<link rel="stylesheet" href="css/style.css" type="text/css">
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js "></script>
<script type="text/javascript" src="js/heatmap.js"></script>


</head>

<body>

<p>注意图片太小的话，看不到进度条</p>

<input type="file" id="filesInput" accept="image/*" capture/>
<input type="file" id="filesInputMultiple" accept="image/*"  multiple capture/>

<br><br>

<a href="javascript:;" id="btnUpload">开始上传</a>

<p id="info"></p>

<label>读取进度：</label><progress id="Progress" value="0" max="100"></progress>

<span id="percent"></span>

<p id="uploadSpeed"></p>

<ul id="imageBox"></ul>

</body>

</html>