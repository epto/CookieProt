/*
 * CookieProt v 1.0 B
 * Cookie XSS JavaScript protection.
 * Copyright (C) 2015 by EPTO
 * 
 * CookieFix is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This source code is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this source code; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
 */

try {
	Object.defineProperty(document, "cookie", {
		"get": function () {
			if (document.onreadcookie) document.onreadcookie();
			var msg = 	"Warning:\nYou're under attack, somebody is trying to steal your session.\n"+
						"Sign out and verify the connection, the URL of the page etc.";
			var r = '';
			var d = new Date();
			var n = d.getTime(); 
			var p = [ "JSESSIONID" , "PHPSESSID" , "ASPSESSIONID" , "SESSIONID" ];
			var rp = p[3 & (Math.floor(Math.random()*3) ^ n)];
			for (var a=0;a<24;a++) {
				var x = a^Math.floor(Math.random()*16)^Math.floor(n);
				x = x &15;
				r = r + x.toString(16);
				}
			n = n + Math.ceil(86400000 + Math.random()*8640000);
			d = new Date(n);
			
			try {
				var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
				xmlhttp.open("HEAD","xssattack.php/?r=" + n,true);
				xmlhttp.onreadystatechange = function() {};
				xmlhttp.send();
				} catch(AJAXErr) {}

			alert(msg);
		
			return rp+"="+r+"; expires="+d.toUTCString();
		},
		"set": function(val) {
			var msg = 	"Warning:\nYou're under attack, somebody is trying to change your session.\n"+
						"Sign out and verify the connection, the URL of the page etc.";

			try {
				var d = new Date();
				var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
				xmlhttp.open("HEAD","xssattack.php/?w=" + d.getTime(),true);
				xmlhttp.onreadystatechange = function() {};
				xmlhttp.send();
				} catch(AJAXErr) {}

			alert(msg);
			}
	}) ;
} catch(DevNull) { 
	alert('Warning: Cookie protection disabled!'); 
	}
