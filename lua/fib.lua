#!/usr/bin/lua
--斐波那契数列--

function fib(n)
	if n < 2 then
		return 1
	end
	return fib(n - 2) + fib(n - 1)
end

io.write(fib(38))
