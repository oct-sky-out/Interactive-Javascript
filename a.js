var a = 100;

var obj = {
	a: 0,
	fn1: function fn1() {
		var a = 1;
		var fn2 = () => {
			var a = 2;
			var fn3 = () => {
				console.log(this.a); // this => obj
			};
			fn3();
		};
		fn2();
	},
	aFunc: () => {
		console.log(this.a);
	},
};

obj.fn1(); // 0
obj.aFunc(); // 100
