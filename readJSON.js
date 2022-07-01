$(function(){
	$("#main_content").ready(function(){

		//呼び出された際のURLパラメータの解析（.../detail1.html?id=1などのとき，変数名idの値(1)を取り出す）※テンプレートの時点では使っていない
		$.urlParam = function(name){
			var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
			if(results != null){
				return results[1] || 0;
			}
			else{
				return 0;
			}
		}

		//var url = "https://athena.abe-lab.jp/~hidenao/ProjectA_2021_test/data.json";
		// 上の行は例示のページ用なので，↑の行をコメント（//を先頭に付ける）して
		//↓の行でdata.jsonにGithub Pagesを通じて各チームのdata.jsonにアクセスできるURLを得て，コメント//を外す
		var url  = "https://Infosys-Projecta-2021.github.io/2021-project1-l/data.json";

		//data.jsonから対象の施設を指定された番号で読み出すための処理
		var id = 0; 
		if($("#obj_id").get(0)){ //紹介対象idを表す<input type="hidden" id="obj_id" value="0">があったら
			id =$("#obj_id").val();
		}
		if(id == 0){
			id = $.urlParam('id'); //?id=Nで指定されたとき
		}

		//表示用のHTMLをjQueryの機能（オブジェクト）を利用して作成する→詳しくは「HTML生成 jQuery」で検索
		$.getJSON(url,function(data){ //urlの文字列のURLからidまたはqで指定した値を持つJSONオブジェクトを取得

			var obj = data.introduction_obj_list[id]; //対象の１つ（一行）をオブジェクトとしてJSONから取り出す

			if($("main").get(0)){ //<main>～</main>があったら HTMLを生成

				$("head > title").text(obj.title); //<head><title>～</title></head>の間の～のところ（文字列）を変更
				$("h1.jumbotron-heading").text(obj.title); //<h1 class="jumbotron">～</h1>の間の～のところ（文字列）を変更
				if($("h2").get(0)){ //<h2>のタグがあったら(すべてのh2タグが変更されるので，必要に応じてidで区別する)
					$("h2").text(obj.title);
				}

				//<img id="thumnail_img">タグのsrcの値をサムネイル画像のファイルに設定（photosフォルダに”画像名_thum.jpg”があるとする）
				$("img#thumnail_img").attr("src","./photos/"+obj.image_file+"_thum.jpg");

				if($("p#abstract").get(0)){ //<p id="abstract"></p>のタグがあったら
					$("p#abstract").text(obj.abstract); //abstract（DBではカラム）の値を変更
				}

				if($("p#detail").get(0)){//<p id="detail"></p>のタグがあったら
					$("p#detail").html(obj.detail); //detail（DBではカラム）の値を変更
				}

				if($("div#image_list").get(0)){//<div id="image_list">のタグがあったら

					if(obj.image_file1 != null && obj.image_file1!=""){
						var img1_tag = '<a href="./photos/'+obj.image_file1+'.jpg" data-lightbox="image-list">';
						img1_tag += '<img src="./photos/'+obj.image_file1+'_thum.jpg" class="col-3 mb-5 box-shadow"/></a>';
						$("div#image_list").append(img1_tag);
					}

					if(obj.image_file2 != null && obj.image_file2!=""){
						var img2_tag = '<a href="./photos/'+obj.image_file2+'.jpg" data-lightbox="image-list">';
						img2_tag += '<img src="./photos/'+obj.image_file2+'_thum.jpg" class="col-3 mb-5 box-shadow"/></a>';
						$("div#image_list").append(img2_tag);
					}

					if(obj.image_file3 != null && obj.image_file3!=""){
						var img3_tag = '<a href="./photos/'+obj.image_file3+'.jpg" data-lightbox="image-list">';
						img3_tag += '<img src="./photos/'+obj.image_file3+'_thum.jpg" class="col-3 mb-5 box-shadow"/></a>';
						$("div#image_list").append(img3_tag);
					}

 				}

				if($("div.star-rating").get(0)){//<div class="star-rating">のタグがあったら
					if(obj.score != null){
						var font_size_str = $("div.star-rating").css("font-size");
						var font_size = font_size_str.match(/\d+/)[0]; //○○pxの○○（数字の部分を抜き出す）
						var width = (obj.score / 5.0) *font_size*5; //px値にする(5は満点)
					  $("div.star-rating-front").attr("style","width: "+width+"px"); //scoreの値をstar-rating-frontのstyle="width: ○○%"の値とする
					}
				}

				if($("#map_here").get(0)){//<div id="map_here">のタグがあったら
					//leaflet.jsを使ってOpen Street Mapを表示する
					// 地図のデフォルトの緯度経度(35.369744, 139.415493)と拡大率(拡大レベル16)
					var map = L.map('map_here').setView([obj.lat, obj.lng], 16);//map_hereはidの値
 
					// 描画する(Copyrightは消さないように)
					L.tileLayer(
						'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
						{ attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }
					).addTo(map);

					//マーカーを地図に追加する
					L.marker([obj.lat, obj.lng]).addTo(map);

				}
			}
			else{
				alert('<main>のタグは消さないでください．');
			}
		})
		.fail(function(jqXHR, textStatus, errorThrown) { //urlにアクセスできなかった時のエラー処理
    	alert("エラー：" + textStatus+"\n以下のURLにアクセスできませんでした．"+url);
		});
	});
});


