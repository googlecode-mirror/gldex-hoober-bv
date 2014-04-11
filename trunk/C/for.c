/*************************************************************************
	> File Name: for.c
	> Author: lyview
	> Mail: lyview@gmail.com 
	> Created Time: 2014年03月06日 星期四 01时22分44秒
 ************************************************************************/

#include<stdio.h>
int main(void){
	int i,j;
	for(i=1;i<=9;i++){
		for(j=1;j<=9;j++){
			printf("%d\t" , i*j);
			if (i <= j){
				break;
			}
		}
		printf("\n");
	}
	return 0;
}
