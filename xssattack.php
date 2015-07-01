<?
@session_start();
$ar=array(
	'method'	=>	$_SERVER['REQUEST_METHOD'],
	'ip'		=>	$_SERVER['REMOTE_ADDR'],
	'ltime'		=>	@$_GET['r'] ? $_GET['r'] : @$_GET['w'],
	'time'		=>	time(),
	'uri'		=>	$_SERVER['REQUEST_URI'],
	'sid'		=>	session_id(),
	'ua'		=>	$_SERVER['HTTP_USER_AGENT'])
	;

@file_put_contents('log/xss.log', json_encode($ar)."\n" , FILE_APPEND);
session_destroy();
?>
