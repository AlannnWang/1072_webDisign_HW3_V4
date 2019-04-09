/*宣告*/
//html
let html = '<table border =0 width="35%" height="50%" align="center">';

//格子當中的卡片
var model = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];

// $(element) = obj -->將obj塞回element裡
var $ = function (obj) {
    return document.getElementById(obj);
}

/*主程式碼*/
$(document).ready(function () {
    /*隨機抽牌*/
    function shuffle(array) {
        for (i = 0; i < array.length; i++) {
            let seed = Math.floor(Math.random() * array.length);
            let temp = array[i];
            array[i] = array[seed];
            array[seed] = temp;
        }
        return array;
    }

    // 將陣列中的元素抽出來，轉換成卡片序號 的暫存區
    var imgId = shuffle(model);

    /* 圖片塞入表格內 */
    for (let i = 0; i < model.length; i++) {
        //連結圖片
        let url = "img/" + imgId[i] + ".png";
        // 格子滿四個就換行
        if (i % 4 == 0) {
            html += '<tr>';
        }
        // 每一格在做的事情
        html += '<td><div class ="card" card_num = ' + model[i]
            + ' id ="box' + i + '"><span class ="bg" id ="bg' + i
            + '"></span><img class="img" id ="img' + i + '" src=' + url + ' /></div></td>';
        // 概念為: <tr> 0 1 2 3 </tr>
        if (i % 4 == 3) {
            html += '</tr>';
        }
    }
    html += '</table>';
    $("cardPosition").innerHTML = html;

    /*正反面翻牌設定*/
    //緩存翻牌資料
    var cacheObj = null;
    //將aBtn塞進cardPosition下面的div
    var aBtn = $("cardPosition").getElementsByTagName("div");
    //已配對數量
    var count = 0;
    //已點擊次數
    var count_sum = 0;

    for (var i = 0; i < model.length; i++) {
        aBtn[i].onclick = function () {
            var self = this;    //onclick的物件
            $("Start").textContent = "Click to Restart 已經點擊 " + count_sum + " 步";
            //檢查翻的卡是 第一張/第二張 牌
            if (cacheObj == self) { //如果onclick的物件==暫存的物件
                return;
            }
            self.className = "card hover";
            if (cacheObj == null)  // 判斷緩存是否存在
            {
                cacheObj = self;    //緩存如果沒東西，就把onclick的東西塞進緩存
            }
            // 檢測兩張牌翻開時，兩個牌的圖案是否相同
            else {
                //判斷相等 (-> 檢測"緩存區"與"當下翻的牌"是否相同)
                if (cacheObj.getAttribute("card_num") == self.getAttribute("card_num")) {
                    self.className = cacheObj.className = "card hover"; //onclick的東西、緩存的東西的樣式都改成card hover
                    self.onclick = cacheObj.onclick = null;
                    cacheObj = null;    //緩存的東西變空物件
                    count++;
                }

                //判斷不相等
                else {
                    setTimeout(function () {
                        self.className = "card";    //則將onclick樣式變回card
                        if (cacheObj) {     //如果緩存有東西，緩存裡的東西的樣式也變成card
                            cacheObj.className = "card";
                        }
                        cacheObj = null;    //把緩存清空
                    }, 300);    //  在300毫秒後
                }
            }
            if (count == 8) {   //如果翻出八組
                window.alert("You make it!");
            }
        }
    }

    /*重新載入*/
    $("Start").onclick = function () {  //如果按下開始，重新載入
        location.reload();  //location.reload是刷新目前頁面，重新整理的意思
    }
});


/*ErrorDetect*/
// console.log(html) ;
// console.log(shuffle(model))
console.log(imgId[i]);
