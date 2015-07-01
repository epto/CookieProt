<?
@session_start();
if (!isset($_SESSION['word'])) {
	$t = @file_get_contents('dizionario');
	if ($t===false) $t='default';
	$t = trim($t,"\r\n ");
	$t = explode(' ',$t);
	$c=count($t)-1;
	$t=$t[mt_rand(0,$c)] . base_convert(mt_rand(1,1536),10,36);
	$_SESSION['word']=$t;
	}

?><!doctype html>
<html>
	<head>
		<meta charset="utf-8"/>
		<title>XSS TEST</title>
	<script src="cookie.js"></script>
	<script>
	
	function toHTML(s) {
		s=String(s);
		s=s.replace(/\&/g,'&amp;');
		s=s.replace(/\</g,'&lt;');
		s=s.replace(/\>/g,'&gt;');
		s=s.replace(/\'/g,'&#39;');
		s=s.replace(/\"/g,'&quot;');
		return s;
	} 
	
	function Init() {
		var e = document.getElementById('cookie');
		e.innerHTML=toHTML(document.cookie);
		return false;
	}
	
	</script>
</head>
<body>
<b>Javascript XSS protection test:</b><br>
Secret word = `<?=htmlspecialchars($_SESSION['word'],ENT_QUOTES); ?>`<br>
Real session ID = `<?=htmlspecialchars(session_id(),ENT_QUOTES); ?>`<br>
document.cookie = `<span id="cookie"></span>`<br>
<br><input type="submit" value="Run test" onclick="return Init();">
</body>
</html>
