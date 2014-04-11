/*************************************************************************
	> File Name: fib.c
	> Author: lyview
	> Mail: lyview@gmail.com 
	> Created Time: 2014年04月11日 星期五 01时39分41秒
 ************************************************************************/

#include<stdio.h>
int fib(int n){
	if (n < 2){
		return 1;
	}
	return fib(n - 2) + fib(n -1);
}
int main(void){
	printf("%d\n" , fib(38));
	return 0;
}
