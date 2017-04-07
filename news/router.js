app.get('/news', function(req, res) {
	var num = req.query.num;
	var length = req.query.length;
	var ret = [];
	for(var i = 0; i < length; i++) {
		ret.push('内容' + (parseInt(num) + i));
	}
	res.send(ret);
});