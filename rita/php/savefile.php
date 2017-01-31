<?php
if (isset($_POST['data']) && isset($_POST['filename'])) {
// if (!empty($_POST['data'])) {
	$data = $_POST['data'];
	$title = $_POST['filename'];
	$fname = $title . ".srt";
	$file = fopen("../videos/" .$fname, 'w'); //creates new file
	fwrite($file, $data);
	fclose($file);
	echo 'count to five before closing this window (to give time to the file to upload)';
}
?>
