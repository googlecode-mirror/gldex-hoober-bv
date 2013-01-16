<?php
include './../pdo.class.php';
include './comm.func.php';
class Message extends DatabaseInit {
	public $mid;
	protected $db;
	protected static $message = array();
	
	public function __construct()
	{
		$this->db = parent::getInstance();
		$this->mergeMessage();
	}
	
	protected function mergeMessage()
	{
		self::$message['toid'] = (int)_get('toid');
		self::$message['fromid'] = (int)_get('fromid');
		self::$message['title'] = (string)_get('title');
		self::$message['content'] = (string)_get('content');
	}
	protected static function isMessage(array $message)
	{
		if (!is_array($message))
		{
			return false;
		} else {
			
			return true;
		}
	}
	
	private function isMember($user)
	{
		return $this->db->fetch('message',"where username = $user" , 1);
	}
	
	private function checkLogin()
	{
		$this->db->fetchOne('message','where user=', 'count(*)');
	}
	
	private function isSave()
	{
		if (isset($_GET['save']))
		{
			
		}
	}  
	private function send($message)
	{
		if (self::isMessage($message)) return false;
		
	}
}