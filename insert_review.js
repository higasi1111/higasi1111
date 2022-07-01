$(function(){
	$("#main_content").ready(function(){

		//呼び出された際のURLパラメータの解析（.../detail.html?id=1などのとき，変数名idの値(1)を取り出す）
		$.urlParam = function(name){
			var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
			if(results != null){
				return results[1] || 0;
			}
			else{
				return 0;
			}
		}

		//下記のURLは変更の必要なし（WebAPIです）
		var url = "https://athena.abe-lab.jp/~hidenao/ProA_2021/Project2_reviewAPI/review_json.php?";

		var gid = "Z";
		if($("#gid").get()){
			gid = $("#gid").val();
		}
		else{
			alert("id=\"gid\"の属性が付いたinputタグ，あるいはdivタグをHTMLファイルに記入してあるか確認してください．");
		}
		url += "gid="+gid;

		var id = $.urlParam('id'); //?id=として渡されてきた値を読み取る
		$("#obj_id").val(id); //id="obj_id"が付いた<input>タグのvalue=に値を設定
		if(id != 0){
			url += "&obj_id="+id;
		}
		else{
			url += "&obj_id="+id;
		}

		$.getJSON(url,function(data){ //urlで読み出せるJSONデータ(data)の処理を行う

			$.each(data.review_list, function(index,review){ //JSONデータからレビューを一行ずつ取り出し，HTMLを繰り返し生成

				//※review_json.php側では，最初，新しい方から並び替え，5件を取得するようなSQL文としてある
				//scoreの計算などを適宜読み取り対象として加えてみよう
				var item_html = '<tr>';
				item_html += '<th>'+review.user_name+'</th>';
				item_html += '<td>'+review.text+'</td>';
				item_html += '</tr>';

				$("#review_list").append(item_html);//生成したHTMLを<table id="review_list">～</table>間に追加

			});
		})
		.fail(function(jqXHR, textStatus, errorThrown) { //urlにアクセスできなかった時のエラー処理
    		alert("エラー：" + textStatus+"\n以下のURLにアクセスできませんでした．"+url);
		});
	});
});