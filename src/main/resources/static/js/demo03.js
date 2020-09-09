let itemDivBox = document.getElementById("itemDivBox");
let priceSum = 0 ;
let orderSum = 0 ;
itemDivBox.innerHTML = '';

$.ajax({
    url:"/price/all",
    type: "post",
    dataType: "json",
    contentType: "application/json",
    data: "1",
    success: function (prices) {
        console.log(prices)
        let homoDiv = document.getElementById("priceTipBox");
        let priceTipContent = '';
        for (let i = 0; i < prices.length; i++) {
            let price = prices[i];
            priceTipContent = priceTipContent +
                '<div style="background-color:white ;padding: 5px 10px 5px 10px;">' +
                '    <span class="glyphicon glyphicon-bookmark" style="color:'+price.color+' ;font-size: 24px; left: 20px; " aria-hidden="true"></span>' +
                '    <span class="glyphicon glyphicon-usd" style="color: black; top:-4px;left: 30px;" aria-hidden="true">'+price.price+'</span>' +
                '</div>';
        }
        homoDiv.innerHTML = homoDiv.innerHTML + priceTipContent ;
    }
})

$.ajax({
    url:"/seat/all",
    type: "post",
    dataType: "json",
    contentType: "application/json",
    data: "1",
    success: function (venue) {
        console.log(venue); //  2pm
        let seats = venue.seats ;
        for (let i = 0; i < 50; i++) {
            // if (i <  venue.startX - 5) {
            //     continue;
            // }
            var itemLineDivBefor = '<div style="height: 32px;">';
            var itemLineDivContent = '';
            for (let j = 0; j < 50; j++) {
                // if (j < venue.startY - 5) {
                //     continue;
                // }
                let idStr = (i + 1) + "-" + (j + 1);
                let innerStr = '';
                for (let k = 0; k < seats.length; k++) {
                    let seat = seats[k];
                    if(seat.positionX != i || seat.positionY != j){
                        continue ;
                    }
                    if(seat.color == null){
                        continue ;
                    }
                    if(seat.code == null){
                        continue  ;
                    }
                    let tipContent =
                        '<div style=\'width:90px;height:100px;\'>' +
                        '<P>编号：'+seat.code+'</P>' +
                        '<P>类型：A</P>' +
                        '<P>价格：'+seat.price+'</P>' +
                        '<P>状态：可售</P>' +
                        '</div>';
                    innerStr = '<div id=' + i + j + ' class="hasSeat" state="useable" data-toggle="tooltip" data-placement="bottom" title="' + tipContent + '" style="background-image: url(image/new_card.png);background-color: '+seat.color+';" color-log="'+seat.color+'"  price-log="'+seat.price+'" onclick="order(this,'+seat.price+',\''+seat.code+'\')" onmouseover=tipCode(this)></div>';
                }
                itemDiv = '<div id= ' + idStr + ' class="itemDiv"  >' + innerStr + '</div>';

                itemLineDivContent = itemLineDivContent + itemDiv;
            }
            var itemLineDivEnd = "</div>"
            itemLineDiv = itemLineDivBefor + itemLineDivContent + itemLineDivEnd;
            itemDivBox.innerHTML = itemDivBox.innerHTML + itemLineDiv;
        }

        $("[data-toggle='tooltip']").tooltip({
            placement: "right",
            html: true,
            delay: 50
        });
    }
})


function buildOrderContent(id,price,code) {
    let content = 
        '               <div id='+id+'_order class="order">' +
        '                  <div style="background-color:rgb(205, 205, 205);height: 100%;width: 100%;position: relative;;">' +
        '                    <span style="left:230px;top:5px;position: absolute; color: #777;font-size: 18px;" class="glyphicon glyphicon-remove-circle" onclick="closeOrder(this)" onmouseover="closeStyle(this)"  onmouseout="backStyle(this)" aria-hidden="true"></span>' +
        '                    <div' +
        '                      style="height: 18px;width: 18px; background-color: red; border-radius: 50%; position: absolute; top: 10px; left: 20px;">' +
        '                    </div>' +
        '                    <span class="glyphicon glyphicon-usd" style="color: black; position: absolute;top: 14px;left: 66px;"  aria-hidden="true">'+price+'元</span>' +
        '                    <span style="position: absolute;top: 49px;left: 19px;">座位编码：'+code+'</span>' +
        '                  </div>' +
        '                </div>';
        return content ;
}

function closeOrder(elem){
    let orderDiv = elem.parentNode.parentNode;    
    let orderId =  orderDiv.getAttribute("id");
    let seatDivDId = orderId.split("_")[0];
    let colorlog = document.getElementById(seatDivDId).getAttribute("color-log");
    let pricelog = document.getElementById(seatDivDId).getAttribute("price-log");
    document.getElementById(seatDivDId).style.backgroundColor = colorlog ;
    document.getElementById(seatDivDId).setAttribute('state', 'useable');
    orderDiv.remove();
    orderSum -- ;
    priceSum = priceSum - pricelog ;
    sumLog();
}

function order(elem,price,code) {
    // alert(elem)
    let state = elem.getAttribute("state");
    let id = elem.getAttribute("id");
    let color = elem.getAttribute("color-log");

    if (state == 'useable') {
        //座位状态变为选中
        elem.style.backgroundColor = "rgb(19,34,122)"
        elem.setAttribute('state', 'checked');
        //tab切换
        $("#profile-tab").click();
        //订单生成
        let  orderContent =  buildOrderContent(id,price,code);
        $("#profile").append(orderContent);

        orderSum ++ ;
        priceSum = (priceSum -0 )+ (price -0 )
        sumLog();
    } else if (state = 'checked') {
        //座位状态变为未选中
        elem.style.backgroundColor = color ;
        elem.setAttribute('state', 'useable');
        let orderDom = $("#"+id+"_order");
        // var orderDom =  document.getElementById(id+"_order");
        // orderDom.parentNode.removeChild(orderDom);
        orderDom.remove();
        orderSum -- ;
        priceSum = priceSum - price ;
        sumLog();
    }
}

function sumLog(){
    document.getElementById("orderNumSum").innerText = orderSum;
    document.getElementById("orderPriceSum").innerText = priceSum;

    if(orderSum == 0){
        document.getElementById("disCountOrder").setAttribute("style","background: rgb(204, 204, 204); border: 0px;")
        document.getElementById("disCountOrder").setAttribute("disabled","disabled")
        document.getElementById("nowOrder").setAttribute("style","background: rgb(153, 153, 153); border: 0px;")
        document.getElementById("nowOrder").setAttribute("disabled","disabled")
    } else {
        document.getElementById("disCountOrder").removeAttribute("style")
        document.getElementById("disCountOrder").removeAttribute("disabled")
        document.getElementById("nowOrder").removeAttribute("style")
        document.getElementById("nowOrder").removeAttribute("disabled")
    }
}

function tipCode(elem) {
    // console.log(elem.id)
    // console.log($('#'+elem.id))
    // $('#'+elem.id).tooltip("aaa")
}

// tip 样式
$(function () {
    $("[data-toggle='tooltip']").tooltip({
        placement: "right",
        html: true,
        delay: 50
    });
});

function closeStyle(elem) {
    elem.style.fontSize = "20px";
    elem.style.cursor = "pointer";
}
function backStyle(elem) {
    elem.style.fontSize = "18px";
}
