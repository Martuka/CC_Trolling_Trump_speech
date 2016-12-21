<?php
// if (isset($_POST['data']) $$ isset($_POST['filename'])) {
if (!empty($_POST['data'])) {}
	$data = $_POST['data'];
	$title = $_POST['filename'];
	$fname = $title . ".srt"; //generates random name
	$file = fopen("../subs/" .$fname, 'w'); //creates new file
	fwrite($file, $data);
	fclose($file);
}
?>
