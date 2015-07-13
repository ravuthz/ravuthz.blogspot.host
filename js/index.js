console.info('index.js loaded.');

;(function($){
	var max_posts = 9,
		cpage = 1;

    var url, feed = '/feeds/posts/default?alt=json&max-results=';

	// var url = 'https://www.blogger.com/feeds/' + blog_id + '/posts/default?alt=json&max-results=' + max_posts;

	// $(function(){
 //        ajaxGet(url + '&orderby=published', function(data){
 //            var x = listPosts(data),
 //            	y = listPagers();
 //            $('.blog-posts.hfeed').html(x);
 //            $('#Blog1').append(y);

 //        });
	// });

    

    
	window.showpageCount = function(json){
		var entry = json.feed.entry.length; //19
		var cpost = json.feed.openSearch$startIndex.$t;//1
		var tpost = json.feed.openSearch$totalResults.$t || json.feed.entry.length;//19
		
        tpost = Math.ceil(parseInt(tpost) / max_posts);
		page(cpage, tpost);

	};

	window.page = function(cpage, tpost) {
        var cp = parseInt(cpage),
        	tp = parseInt(tpost);

        var ptag = '<div class="showpageArea">';
        ptag += '<span class="showpageOf">Pages(' + tp + ')</span>';
        for(var p=1; p<=tp; p++){
        	if(cp == p){
        		ptag += '<span class="showpagePoint"><a href="javascript:" onclick="page(' + p + ',' + tp + ');">' + p + '</a></span>';
        	} else {
        		ptag += '<span class="showpageNum"><a href="javascript:" onclick="page(' + p + ',' + tp + ');">' + p + '</a></span>';
        	}
        }
        ptag += '</div>';

        cp = (cp <= 1) ? 1 : ((cp-1) * max_posts);

        // var link = url + '&start-index=' + cp + '&orderby=published';
        var url = feed + max_posts + '&start-index=' + cp + '&orderby=published';

        $(function(){
        	ajaxGet(url, function(data){
	            $('.blog-posts.hfeed').html(listPosts(data));
	            $('#blog-pager').html(ptag);
	        });
        });

        console.info('page : ', cp);
    }


})(jQuery, window);




