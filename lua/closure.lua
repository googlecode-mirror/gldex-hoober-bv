#!/usr/bin/lua
--闭包函数--

function newCounter()
	local i = 1
	return function()
		i = i * 5
		return i
	end
end

irun = newCounter()
print(irun())
print(irun())
print(irun())
