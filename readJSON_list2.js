$(function(){
	$("main").ready(function(){

		//呼び出された際のURLパラメータの解析（.../list.html?id=1などのとき，変数名idの値(1)を取り出す）
		$.urlParam = function(name){
			var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
			if(results != null){
				return results[1] || 0;
			}
			else{
				return 0;
			}
		}

		var detail_html = "detail_review_example.html"; //個別詳細形式のページのHTMLファイル

		var json_url = "https://infosys-projecta-2021.github.io/2021-project2-g/docs/data2.json";
		// data.jsonでの動作が確認できたら，↑の行をコメント（//を先頭に付ける）して，↓の行のコメント//を外す
		//var json_url = "https://infosys-projecta-2021.github.io/2021-project2-各チームの記号(A～T)/data.json";

		var q = $.urlParam('q'); //?q=検索語で指定されたとき
		q = decodeURI(q)
		var category = $.urlParam('category'); //?category=カテゴリ名で指定されたとき
		//qやcategoryなどでの検索する場合は，以下の表示HTML作成の処理にif文を追加する
		//[カテゴリごとのページや検索の実行を行うページを実現するためには，list_example.htmlとreadJSON_list.jsをペアで複製する]

		$.getJSON(json_url,function(data){ //json_urlで読み出せるJSONデータ(data)の処理を行う
			var num=0; //項目の数を数える
			$.each(data.introduction_obj_list, function(index,elem){ //JSONデータから繰り返し内容部分のHTMLを繰り返し生成

				var item_html='<hr class="featurette-divider">';
				var q = $.urlParam('q'); //?q=検索語で指定されたとき
				q = decodeURI(q)

				//?q=検索語 を付けてelemの要素を検索する場合は，下記のif文を入れる（item_htmlの生成の文を囲む）
				//if(q == 0 || (q != 0 && elem.title.indexOf(q) != -1)) { //?q=が無いときはq==0，?q=があるとき(q!=0)はelemの要素（title, abstract, detailなど）にマッチ
				item_html += '<div class="row featurette">';
				item_html += '<div class="col-md-7">';
				item_html += '<h2 class="featurette-heading bg-lightblue">';
				item_html += elem.title; //紹介対象のなまえ
				item_html += '</a></h2>';
				item_html += '<p class="lead">';
				item_html += elem.abstract; //概要説明（施設や場所・授業→紹介文，料理など→価格）</p>
				item_html += '<div class="btn-group">';
				item_html += '<a href="./'+detail_html+'?id='+elem.id+'" role="button" class="btn btn-primary">施設詳細</a>';
				item_html += '</div>';
				item_html += '</div>';
				item_html += '<div class="col-md-5">';
				item_html += '<img class="featurette-image img-fluid mx-auto" src="./photos/';//画像はphotosフォルダに置く
				item_html += elem.image_file;
				item_html += '.jpg" alt="'+elem.title+'のサムネイル画像">';
				item_html += '</div>';
				item_html += '</div>';
				//} //if(elem.title.indexOf(q) != -1) {の終わり（先頭の//だけ消す）
				//”item_htmlの生成の文”はここまで

				$("#list_content").append(item_html);//生成したHTMLを<div id="main_content">～</div>間に追加

				num++;
			});
		})
		.fail(function(jqXHR, textStatus, errorThrown) { //urlにアクセスできなかった時のエラー処理
	    	alert("エラー：" + textStatus+"\nreadJSON_list.jsの中のjson_urlの値，または，JSONファイルの内容を確認してください．"+json_url);
		});
	});
});
