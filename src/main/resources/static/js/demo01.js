// $("#scrollDiv").scrollTop(500);
// document.getElementById("scrollDiv");
let itemDivs = document.getElementsByClassName("itemDiv");
let itemDivBox = document.getElementById("itemDivBox");
let siteBox = document.getElementById("siteBox");
let leftDiv = document.getElementById("leftDiv");
let topDiv = document.getElementById("topDiv");
let toolTitle = document.getElementById("toolTitle");
let toolMenu = document.getElementById("toolMenu");
$('.alert').alert()

$('#actionTabs a').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
})

$('#drawImgTabs a').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
})

$('#priceTabs a').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
})

let action = "draw"; //当前菜单栏动作
let img = "seat"; //图片样式
let seatColor = "#999"; //座位颜色
let seatPriceId =  null ;
let subDidArr = []; //记录seat
let itemDivChoseArr = []; //选中标记
let itemDivChoseBoxArr = [] ;//选中div
let startCodeX = Number.MAX_VALUE; // 选中最小值
let startCodeY = Number.MAX_VALUE; // 选中最大值
let rulePrex = '';
let rulePreY = '';
let ruleStartNumX = 0;
let ruleStartNumY = 0;
let ruleAddx = 0;
let ruleAddy = 0;

function drawSeat() {
    toolTitle.innerHTML = '<p class="bg-primary" style="height: 100%; text-align: center;padding: 5px;">画座位</p>'
    toolMenu.innerHTML =
        '                        <ul id="drawImgTabs" class="nav nav-pills nav-stacked">' +
        '                            <li role="presentation" class="active"><a href="#" onclick="drawChange(\'seat\')" >&nbsp&nbsp座位</a></li>' +
        '                            <li role="presentation"><a href="#" onclick="drawChange(\'desk1\')">&nbsp&nbsp桌子左上</a></li>' +
        '                            <li role="presentation"><a href="#" onclick="drawChange(\'desk2\')">&nbsp&nbsp桌子左下</a></li>' +
        '                            <li role="presentation"><a href="#" onclick="drawChange(\'desk3\')">&nbsp&nbsp桌子右上</a></li>' +
        '                            <li role="presentation"><a href="#" onclick="drawChange(\'desk4\')">&nbsp&nbsp桌子右下</a></li>' +
        '                        </ul>';
    $('#drawImgTabs a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
    })
    action = "draw";

    // for (let i = 0; i < itemDivChoseArr.length; i++) {
    //     itemDivChoseArr[i].style.backgroundImage = "url(image/new_card.png)";
    //     itemDivChoseArr[i].setAttribute("drawstyle", "seat");
    // }
    // itemDivChoseArr = [] ;
}

function codeSeat() {
    toolTitle.innerHTML = '<p class="bg-primary" style="height: 100%; text-align: center;padding: 5px;">座位编码</p>'
    toolMenu.innerHTML =
        '                       <div class="card" style="width: 100%;">' +
        '                            <div class="card-body">' +
        '                                <h4 class="card-title">横向编号：</h4>' +
        '                                <p class="card-text">' +
        '                                <div>' +
        '                                    <div class="input-group input-group-sm">' +
        '                                        <span class="input-group-addon" id="sizing-addon3" style="width: 60px;">前缀</span>' +
        '                                        <input id="codePreX" type="text" class="form-control" aria-describedby="sizing-addon3">' +
        '                                    </div>' +
        '                                    <div class="input-group input-group-sm">' +
        '                                        <span class="input-group-addon" id="sizing-addon3" style="width: 60px;">起始值</span>' +
        '                                        <input id="codeStartX" type="number" class="form-control" aria-describedby="sizing-addon3">' +
        '                                    </div>' +
        '                                    <div class="input-group input-group-sm">' +
        '                                        <span class="input-group-addon" id="sizing-addon3" style="width: 60px;">增量</span>' +
        '                                        <input id="codeAddX" type="number" class="form-control" aria-describedby="sizing-addon3">' +
        '                                    </div>' +
        '                                </div>' +
        '                                </p>' +
        '                            </div>' +
        '                        </div>' +
        '                        <div class="card" style="width: 100%;">' +
        '                            <div class="card-body">' +
        '                                <h4 class="card-title">纵向编号：</h4>' +
        '                                <p class="card-text">' +
        '                                <div>' +
        '                                    <div class="input-group input-group-sm">' +
        '                                        <span class="input-group-addon" id="sizing-addon3" style="width: 60px;">前缀</span>' +
        '                                        <input id="codePreY" type="text" class="form-control" aria-describedby="sizing-addon3">' +
        '                                    </div>' +
        '                                    <div class="input-group input-group-sm">' +
        '                                        <span class="input-group-addon" id="sizing-addon3" style="width: 60px;">起始值</span>' +
        '                                        <input id="codeStartY" type="number" class="form-control" aria-describedby="sizing-addon3">' +
        '                                    </div>' +
        '                                    <div class="input-group input-group-sm">' +
        '                                        <span class="input-group-addon" id="sizing-addon3" style="width: 60px;">增量</span>' +
        '                                        <input id="codeAddY" type="number" class="form-control" aria-describedby="sizing-addon3">' +
        '                                    </div>' +
        '                                </div>' +
        '                                </p>' +
        '                            </div>' +
        '                        </div>' +
        '                        <div style="width: 100%; text-align: center;">' +
        '                            <button id="drawSeat"  type="button" class="btn btn-primary" onclick="code()">&nbsp&nbsp确定&nbsp&nbsp</button>' +
        '                        </div>';
    action = "code";
}

function code() {

    if(itemDivChoseArr.length == 0){
        return ;    
    }
    //取值
    rulePrex = $("#codePreX").val();
    rulePreY = $("#codePreY").val();
    ruleStartNumX = $("#codeStartX").val();
    ruleStartNumY = $("#codeStartY").val();
    ruleAddx = $("#codeAddX").val();
    ruleAddy = $("#codeAddY").val();

    for (let i = 0; i < itemDivChoseBoxArr.length; i++) {
        let ruleItemDiv = itemDivChoseBoxArr[i] ; 
        let ruleItemDivId =  ruleItemDiv.getAttribute("id");
        let ruleItemDivIdArr = ruleItemDivId.split("-");
        let logX =  ruleItemDivIdArr[1];
        let logY =  ruleItemDivIdArr[0];
        //计算横向 坐标
        let resX =  rulePrex + (ruleStartNumX-0 )+ (logX - startCodeX)*ruleAddx ;
        //计算纵向 坐标
        let resY = rulePreY + (ruleStartNumY-0 )+ (logY -startCodeY)*ruleAddy ;
        //将值存在属性中
        itemDivChoseBoxArr[i].children[0].setAttribute("codeLog", resX+"-"+resY);
        itemDivChoseBoxArr[i].children[0].style.backgroundImage = "url(image/has_no.png)";
        itemDivChoseBoxArr[i].children[0].setAttribute("drawstyle", "seat_code");
    }

    startCodeX = Number.MAX_VALUE; // 选中最小值
    startCodeY = Number.MAX_VALUE;
}

function relaSeat() {
    toolTitle.innerHTML = '<p class="bg-primary" style="height: 100%; text-align: center;padding: 5px;">关联票价</p>'

    $.ajax({
        url:"/price/all",
        type: "post",
        dataType: "json",
        contentType: "application/json",
        success: function (result) {

            toolMenu.innerHTML = '' ;

            let beforeContent = '<ul id="priceTabs" class="nav nav-pills nav-stacked">';
            let midContent = '' ;
            let endContet = '</ul>' ;
            for (let i = 0; i < result.length; i++) {
                midContent = midContent +
                    '                            <li role="presentation" onclick="changeColor(\''+result[i].color+'\',\''+result[i].id+'\')" >' +
                    '                                <a href="#" >' +
                    '                                    <div class="panel panel-default" >' +
                    '                                        <div class="panel-body" style="background-color: '+result[i].color+';">' +
                    '                                            <span class="glyphicon glyphicon-pencil" style="color:white" aria-hidden="true">  '+result[i].name+' </span>' +
                    '                                        </div>' +
                    '                                    </div>' +
                    '                                </a>' +
                    '                            </li>'
            }

            toolMenu.innerHTML  = beforeContent + midContent + endContet ;
        }
    })

    $('#priceTabs a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
    })
    action = "rela";
    // for (let i = 0; i < itemDivChoseArr. length; i++) {
    //     itemDivChoseArr[i].style.backgroundImage = "url(image/new_card.png)";
    //     itemDivChoseArr[i].setAttribute("drawstyle", "seat");
    // }
    // itemDivChoseArr = [] ;
}

function changeColor(color,priceId) { 　　　　　　　　　　　　　　　　　　　　 //改变颜色的事件
    seatColor = color;
    seatPriceId = priceId ;
}

function drawChange(ele) {
    img = ele;
}

itemDivBox.innerHTML = '';
for (let i = 0; i < 50; i++) {
    var itemLineDivBefor = '<div style="height: 32px;">';
    var itemLineDivContent = '';
    for (let j = 0; j < 50; j++) {
        let idStr = (i + 1) + "-" + (j + 1);
        itemDiv = '<div id= ' + idStr + ' class="itemDiv" onmouseover=logCode(this)></div>';
        itemLineDivContent = itemLineDivContent + itemDiv;
    }
    var itemLineDivEnd = "</div>"
    itemLineDiv = itemLineDivBefor + itemLineDivContent + itemLineDivEnd;
    itemDivBox.innerHTML = itemDivBox.innerHTML + itemLineDiv;
}

function logCode(elem) {
    let pts = elem.id.split("-");
    $("#px").html(pts[0]);
    $("#py").html(pts[1]);
}

var wId = "w";
var index = 0;
var startX = 0, startY = 0;
var flag = false;
var retcLeft = "0px", retcTop = "0px", retcHeight = "0px", retcWidth = "0px";
document.onmousedown = function (e) {
    flag = true;
    try {
        var evt = window.event || e;
        var scrollTop = siteBox.scrollTop;
        var scrollLeft = siteBox.scrollLeft;

        retcWidth = "-10000px";
        retcHeight = "-10000px";

        let ofWidth = leftDiv.offsetWidth;
        let ofTop = topDiv.offsetHeight;
        startX = evt.clientX + scrollLeft - ofWidth;
        startY = evt.clientY + scrollTop - ofTop;
        index++;
        var div = document.createElement("div");
        div.id = wId;
        div.className = "div";
        div.style.marginLeft = startX + "px";
        div.style.marginTop = startY + "px";
        div.style.backgroundColor = "rgb(178, 178, 178)";
        // div.style.backgroundColor =   "black";
        div.style.opacity = "0.5";
        siteBox.appendChild(div);
    } catch (e) {
        //alert(e);
    }
}
document.onmouseup = function () {

    if(getEleById(wId)!=null){
        siteBox.removeChild(getEleById(wId));
    }
    if(itemDivChoseArr.length == 0){
        startCodeX = Number.MAX_VALUE; // 选中最小值
        startCodeY = Number.MAX_VALUE; // 选中最大值
    } 
    var itemDivs = document.getElementsByClassName("itemDiv");
    for (let i = 0; i < itemDivs.length; i++) {

        // console.log(itemDivs[i].offsetLeft+";"+itemDivs[i].offsetTop)

        let divLeft = itemDivs[i].offsetLeft + 32;
        let divTop = itemDivs[i].offsetTop + 32;

        let numRetcLeft = retcLeft.replace('px', '');
        let numRectTop = retcTop.replace('px', '');
        let numRectWidth = retcWidth.replace('px', '');
        let numRectHeight = retcHeight.replace('px', '');

        if (divLeft > numRetcLeft && divTop > numRectTop && divLeft < ((numRetcLeft - 0) + (numRectWidth - 0) + 32) && divTop < ((numRectTop - 0) + (numRectHeight - 0) + 32)) {
            switch (action) {
                case "draw": drawAction(itemDivs[i]);
                    break;
                case "code": codeAction(itemDivs[i]);
                    break;
                case "rela": relaAction(itemDivs[i]);
                    break;
                default: drawAction(itemDivs[i]);
                    break;
            }
        }
    }

    flag = false;
}
document.onmousemove = function (e) {
    if (flag) {
        var evt = window.event || e;
        // var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        // var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
        var scrollTop = siteBox.scrollTop;
        var scrollLeft = siteBox.scrollLeft;
        retcLeft = (startX - evt.clientX - scrollLeft > 0 ? evt.clientX + scrollLeft : startX) + "px";
        retcTop = (startY - evt.clientY - scrollTop > 0 ? evt.clientY + scrollTop : startY) + "px";
        let ofWidth = leftDiv.offsetWidth;
        let ofTop = topDiv.offsetHeight;
        retcHeight = Math.abs(startY - evt.clientY - scrollTop + ofTop) + "px";
        retcWidth = Math.abs(startX - evt.clientX - scrollLeft + ofWidth) + "px";
        getEleById(wId).style.marginLeft = retcLeft;
        getEleById(wId).style.marginTop = retcTop;
        getEleById(wId).style.width = retcWidth;
        getEleById(wId).style.height = retcHeight;

    }
}
var getEleById = function (id) {
    return document.getElementById(id);
}


/**
 * 画座位
 * @param {单元格}} itemDiv 
 */
function drawAction(itemDiv) {
    let imgStr = "";
    let drawstyle = "";
    if (itemDiv.innerHTML == '') {
        switch (img) {
            case "seat":
                imgStr = "new_card.png";
                drawstyle = "seat";
                break;
            case "desk1":
                imgStr = "zhuozi1.png";
                drawstyle = "desk";
                break;
            case "desk2":
                imgStr = "zhuozi2.png";
                drawstyle = "desk";
                break;
            case "desk3":
                imgStr = "zhuozi3.png";
                drawstyle = "desk";
                break;
            case "desk4":
                imgStr = "zhuozi4.png";
                drawstyle = "seat";
                break;
            default: imgStr = "new_card.png";
        }
        itemDiv.innerHTML = '<div class="hasSeat" drawstyle=' + drawstyle + ' style="background-image: url(image/' + imgStr + ');"></div>';
        subDidArr.push(itemDiv);
    }
    else {
        itemDiv.innerHTML = '';
        subDidArr = subDidArr.filter(item => {
            if (item.getAttribute("id") == itemDiv.getAttribute("id")) {
                return false ;
            } else {
                return true ;
            }
        })
    }

}

/**
 * 座位编码 
 * @param {单元格} itemDiv 
 */
function codeAction(itemDiv) {
    if (itemDiv.innerHTML == '')
        return;

    var itemId = itemDiv.getAttribute("id");
    var pointArr = itemId.split("-");
    var itemX = pointArr[1];
    var itemY = pointArr[0];
    if (itemX < startCodeX) {
        startCodeX = itemX;
    }
    if (itemY < startCodeY) {
        startCodeY = itemY;
    }

    var childDiv = itemDiv.children[0];
    var childDrawStyle = childDiv.getAttribute("drawstyle");
    if (childDrawStyle == 'seat') {
        childDiv.style.backgroundImage = "url(image/seat_chose.png)";
        childDiv.setAttribute("drawstyle", "seat_chose");
        itemDivChoseArr.push(childDiv);
        itemDivChoseBoxArr.push(itemDiv);
    } else if (childDrawStyle == "seat_chose") {
        childDiv.style.backgroundImage = "url(image/new_card.png)";
        childDiv.setAttribute("drawstyle", "seat_chose");
        itemDivChoseArr = itemDivChoseArr.filter(item => {
            if (item !== childDiv) {
                return true;
            }
        })
    }
}

/**
 * 座位关联价格
 * @param {单元格} itemDiv 
 */
function relaAction(itemDiv) {
    if (itemDiv.innerHTML == '')
        return;
    var childDiv = itemDiv.children[0];
    var childDrawStyle = childDiv.getAttribute("drawstyle");
    if (childDrawStyle == 'seat' || childDrawStyle == 'seat_code') {
        childDiv.style.backgroundColor = seatColor;
        childDiv.setAttribute("priceLog",seatPriceId);
    }
}

$("#subSeat").on("click",function(){
    let seatArr = [] ;
    let venue = {} ;
    venue.name = "测试demo" ;
    venue.startX = Number.MAX_VALUE ;
    venue.startY =Number.MAX_VALUE ;
    // venue.endX =
    // venue.endY =

    for (let i = 0; i < subDidArr.length; i++) {
        let seatBox = subDidArr[i] ;
        let seatDiv = seatBox.childNodes[0] ;
        let positionLog = seatBox.getAttribute("id");
        let codeLog = seatDiv.getAttribute("codeLog");
        let priceLog = seatDiv.getAttribute("priceLog");
        let positiongArr =  positionLog.split("-");
        let postX = positiongArr[0];
        let postY = positiongArr[1];
        let seat = {};
        seat.priceId = priceLog ;
        seat.positionX = postX ;
        seat.positionY = postY ;
        seat.code = codeLog ;
        seatArr.push(seat) ;

        if(postX < venue.startX){
            venue.startX = postX ;
        }
        if(postY < venue.startY){
            venue.startY = postY ;
        }
    }
    venue.seats = seatArr ;

    // console.log(venue);
    $.ajax({
        url:"/seat/add",
        type: "post",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(venue),
        success: function (result) {
            console.log(result); //  2pm
        }
    })
})















