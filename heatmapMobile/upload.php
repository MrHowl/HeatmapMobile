<?php
$_FILES["FileData"]["name"] = rand(1,10000).".jpg";
$file_path = "./".$_FILES['FileData']['name'];
move_uploaded_file($_FILES["FileData"]["tmp_name"],$file_path);
$returnMsg="{status:true}";
echo $returnMsg;
?>

