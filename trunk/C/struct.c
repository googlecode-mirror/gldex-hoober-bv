/*************************************************************************
	> File Name: struct.c
	> Author: lyview
	> Mail: lyview@gmail.com 
	> Created Time: 2014年03月11日 星期二 01时02分20秒
 ************************************************************************/
#include<stdio.h>
int main(void){
	struct commplex_struct {double x,y;} z;
	double x =  3.0;
	z.x = x;
	z.y = 4.0;
	if (z.y < 0)
		printf("z=%f%f\n",z.x,z.y);
	else
		printf("z=%f+%f\n",z.x ,z.y);
	return 0;
}
