#!/usr/bin/lua
--条件逻辑语法--
age = io.read()
age = tonumber(age)
sex = 'male'
if age == 40 and sex == 'male' then
	print("男人40一枝花")
elseif age > 60 and sex ~= 'famale' then
	print("老男人了，应该熟悉一下生活了")
elseif age < 20 then
	io.write("太年青了，珍惜大好时间呀!\n")
else
	print("你的年龄是"..age)
end
