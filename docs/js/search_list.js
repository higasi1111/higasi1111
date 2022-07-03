$(function(){
	$("main").ready(function(){

        $('#search_btn').on('click',function(){
            var keyword = $('#search_keyword').val();//id=search_keywordのinputタグからキーワードを取得

            //readJSON_list.jsを含むリスト形式の検索を表示するhtmlファイル←list_example.htmlから作成する検索結果表示用htmlファイル
            //（検索結果を別の表示にする場合は，一覧形式のhtmlとreadJSON_list.jsとペアで複製する）
            //var search_url = "https://infosys-projecta-2021.github.io/Project2_example/list_example.html";
            var search_url = "https://infosys-projecta-2021.github.io/2021-project2-g/docs/list_search_example.html";
            
            search_url +='?q='+keyword;//キーワードをURLに追加
            search_url = encodeURI(search_url); //URLエンコードを行い
            location.href = search_url; //検索機能の付いたhtmlとreadJSON_list.jsのコピーのペアに結果を表示させる
        });

	});
});
