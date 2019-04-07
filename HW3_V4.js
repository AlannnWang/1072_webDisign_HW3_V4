//宣布
//html
let html = "<table border =0 width='70%' height='70%'>";
//格子當中的卡片
var model = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];


// 格子填入圖片
function (cardIntoBlank) {
    for (let i = 0; i < model.length; i++) {

        // test
        // document.write('<img class="img" src = "../images/card_cutted/'+i+'.png">'); //能成功叫出一橫排的圖片
        console.log('123')

        //呼叫圖片
        let url = "../images/card_cutted/" + i + ".png";
        // 格子滿四個就換行
        if (i % 4 == 0) {
            html += '<tr>';
        }
        // 每一格在做的事情
        // html += '<td><div class ="Card" card_num = ' + model[i] + ' id ="box' + i + '"><span class ="bg" id ="bg' + i + '"></span><img class="img" id ="img' + i + '" src=' + url + '/></div></td>'
        html += '<td><div><img class="Card" src=' + url + '/></div></td>'
        // 概念為: <tr> 0 1 2 3 </tr>
        if (i % 4 == 3) {
            html += '</tr>';
        }
    }
}

document.getElementById("cardPosition").innerHTML = cardIntoBlank();