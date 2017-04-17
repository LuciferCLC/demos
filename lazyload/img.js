var $img = $('img');
$img.each(function(){
	if(isVisible($(this))) {
		show($(this));
	}
});

$(window).scroll(function() {
 	$img.each(function(){
 		if($(this).attr('tag') == 'show') {
			return;
		}
		if(isVisible($(this))) {
			show($(this));
		}
	});
});

function isVisible($node) {
 	var $winHeight = $(window).height();
 	var $nodeHeight = $node.outerHeight();
 	var $offsetTop = $node.offset().top;
 	var $scrollTop = $(window).scrollTop();
 	if ($winHeight + $scrollTop > $offsetTop && $scrollTop < $offsetTop + $nodeHeight) {
 		return true;
 	} else {
 		return false;
 	}
}

function show($node) {
 	var $url = $node.attr('data-src');
 	$node.attr('src', $url);
 	$node.attr('tag', 'show');
}