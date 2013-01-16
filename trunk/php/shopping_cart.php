<?php
/*
购物车类

1.整站范围内，购物车--全局有效
解决：把购物车的信息，放在session里

2.既然全局有效，购物车的实例只有一个
解决：单例模式

技术选型：session+单例

功能分析
判断商品是否存在
添加商品
删除商品
修改商品的数量

某商品数量+1
某商品数量-1

查看购物车的商品种类
			商品数量
			商品的总金额
			所有商品

清空购物车
*/
session_start();
class CartTool {

	private static $ins = null;
	private $items = array();
	


	final protected function __construct() {
		
	}

	final protected function __clone() {
		
	}


	//单例方法 获取实例
	protected static function getIns() {
		if (!(self::$ins instanceof self)) {
			self::$ins = new self();
		}
		return self::$ins;
	}

	//把购物车的单例对象放在session里 

	public static function getCart() {
		//如果cart在session不存在，并且 也不是当前自身类的实例，
		//说明session里没有购物车
		if(!isset($_SESSION['cart']) || !($_SESSION['cart'] instanceof self)) {
			$_SESSION['cart'] = self::getIns();
		}
		return $_SESSION['cart'];
	} 

	/*
	添加商品
	param int $id 商品主键
		  string $name 商品名称
		  float $price 商品价格
		  int $num 购物数量
	*/
	public  function addItem($id,$name,$price,$num=1) {
		if ($this->hasItem($id)) { //如果该商品已存在则直接加其数量
			$this->incNum($id,$num);
			return;
		}

		$item = array();
		//二维数组
		$item['name'] = $name;
		$item['price'] = $price;
		$item['num'] = $num;

		$this->items[$id] = $item;
	}

	/*
	修改购物车中的商品数量
	int $id 商品主键
	int $num 某商品修改后的数量，即直接把某商品
	的数量改为$num
	*/
	public function modNum($id,$num=1) {
		if (!$this->hasItem($id)) {
			return false;
		}
		$this->items[$id]['num'] = $num;
	}

	/*
	商品数量+1
	*/
	public function incNum($id,$num=1) {
		if ($this->hasItem($id)) {
			$this->items[$id]['num'] += $num;
		}
	}

	/*
	商品数量+1
	*/
	public function decNum($id,$num=1) {
		if ($this->hasItem($id)) {
			$this->items[$id]['num'] -= $num;
		}

		//如果减少后，数量为0，则把这个商品删掉
		if ($this->items[$id]['num'] <1) {
			$this->delItem($id);
		}
	}


	/*
	判断商品是否存在
	*/

	public function hasItem($id) {
		return array_key_exists($id,$this->items);
	}

	/*
	删除商品
	*/
	public function delItem($id) {
		unset($this->items[$id]);
	}

	/*
	查询购物车中商品的种类
	*/
	public function getCnt() {
		return count($this->items);
	}
	/*
	查询购物车中商品的个数
	*/
	public function getNum(){
		if ($this->getCnt() == 0) {
			//种数为0，个数也为0
			return 0;
		}

		$sum = 0;
		foreach ($this->items as $item) {
			$sum += $item['num'];
		}
		return $sum;
	}

	/*
	购物车中商品的总金额
	*/
	public function getPrice() {
		//数量为0，价钱为0
		if ($this->getCnt() == 0) {
			return 0;
		}

		$price = 0.0;
		foreach ($this->items as $item) {
			$price += $item['num'] * $item['price'];
		}
		return $price;
	}

	/*
	返回购物车中的所有商品
	*/
	public function all() {
		return $this->items;
	}


	/*
	清空购物车
	*/
	public function clear() {
		$this->items = array();
	}

}

//print_r(CartTool::getCart());
/* 测试*/
$cart = CartTool::getCart();
if (!isset($_GET['test'])) {
	$_GET['test'] = '';	
}

if ($_GET['test'] == 'addpm') {
	$cart->addItem(1,'手机','1999',1);
	echo "购买手机成功";
}elseif ($_GET['test'] == 'addfushi') {
	$cart->addItem(2,'阿迪达斯','169',1);
	echo '购买阿迪达斯成功';
} elseif ($_GET['test'] == 'clear') {
	$cart->clear();
	echo "购物车已清空";
}elseif ($_GET['test'] == 'show') {
	print_r($cart->all());
	echo "<br />";
	echo '共'.$cart->getCnt().'种'.$cart->getNum().'个商品';
	echo '共'.$cart->getPrice().'元';
} else{
	print_r($cart);
}


?>