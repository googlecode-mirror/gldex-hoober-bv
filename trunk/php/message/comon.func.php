<?php
function _get($key= '')
{
	return isset($_GET[$key]) ? $_GET[$key] : '';
}

function _h($char = '')
{
	return htmlspecialchars($char);
}