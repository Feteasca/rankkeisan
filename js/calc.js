//$("#socialbuttons .twitter").socialbutton("twitter", {
//button : "horizontal",
//text : "つぶやきに含めるテキスト",
//url : "対象URL",
//}).width(95);

const daidani = [0,180,500,1000,1500,2250]
const syoudaniup = [60,80,100,100,150,150]
const syoudaninum = [3,4,5,5,5,5]
res_kaisu = '0'
function isParamSatisfied() {
    return $('#end_date').val() != '' && $('#dan1').val() != '' && ($('#dans1').val() != '' || $('#star1').val() != '') && $('#dan2').val() != '' && ($('#dans2').val() != '' || $('#star2').val() != '') && $('#win_rate').val() != '' && $('#even_rate').val() != ''
}

function executeCalc(){
    const dan2 = Number.parseInt($('#dan2').val())
    let goalPoint = 0
    if(dan2<7){
        const dans2 = Number.parseInt($('#dans2').val())
        goalPoint = daidani[dan2-1] + syoudaniup[dan2-1]*(syoudaninum[dan2-1]-dans2)
    }
    else{
        const star2 = Number.parseInt($('#star2').val())
        goalPoint = 3000 + 30*star2
    }
    $('#res_calculated_pt').text(goalPoint)
    const dan1 = Number.parseInt($('#dan1').val())
    let startPoint = 0
    if(dan1<7){
        const dans1 = Number.parseInt($('#dans1').val())
        startPoint = daidani[dan1-1] + syoudaniup[dan1-1]*(syoudaninum[dan1-1]-dans1)
    }
    else{
        const star1 = Number.parseInt($('#star1').val())
        startPoint = 3000 + 30*star1
    }
    if (goalPoint<startPoint) {
        alert('目標段位が現在より低いです')
        return false
    }
    $('#res_needed_pt_all').text(goalPoint-startPoint)


    const today = new Date($('#today').text())
    const end_date = new Date($('#end_date').val().replace(/-/g,'/'))
    if (end_date <= today) {
        alert('シーズン終了予想日が本日または過去日です')
        return false
    }
    const restDate = (end_date-today)/(24*60*60*1000)
    $('#res_restdays').text(restDate)
    const pointPerDay = (goalPoint-startPoint)/restDate
    $('#res_needed_pt_perday').text((Math.floor(pointPerDay*10))/10)

    const win_rate = Number.parseInt($('#win_rate').val())
    const even_rate = Number.parseInt($('#even_rate').val())
    true_win_rate = ((100-even_rate)*win_rate)/100
    true_lose_rate = ((100-even_rate)*(100-win_rate))/100
    ExpectedValue = (13*true_win_rate/100)+(-6*true_lose_rate/100)+(3*even_rate/100)
    if (ExpectedValue <= 0) {
        alert('1試合当たりの期待値がマイナスです')
        return false
    }
    $('#res_expect_pt').text((Math.floor(ExpectedValue*10))/10)
    $('#res_kaisu').text((Math.floor((pointPerDay/ExpectedValue)*10))/10)
    res_kaisu = String((Math.floor((pointPerDay/ExpectedValue)*10))/10)
    
    // $('.tweet').socialbutton('twitter', {
        // button: 'horizontal',
        // text: `#第五人格ノルマ計算 \n 目標達成のために、１日にまわすべき試合回数は${res_kaisu}回です`
    // });

    // 画面最下部に自動スクロール
    let elem = document.documentElement;
    let bottom = elem.scrollHeight - elem.clientHeight;
    window.scroll(0, bottom);

     // tweet_url
     tweet_url = 'https://twitter.com/intent/tweet';

     // 送信テキスト
     text = '#第五人格ノルマ計算%0A目標達成のために、１日にまわすべき試合回数は'+res_kaisu+'回です%0Ahttps://feteasca.github.io/rankkeisan/';
 
     $('#socialbuttons').html('<p><a href="'+tweet_url+'?text='+text+'&ref_src=twsrc%5Etfw" class="twitter-hashtag-button" data-show-count="false">#TwitterDev</a></p>');
     twttr.widgets.load();
 
}

$('#calc').on('click', function () {
    if (!isParamSatisfied()) {
        alert('未入力の項目があります')
    }
    executeCalc()
    $('#result').show();
})


console.log(res_kaisu)


// 初期設定
$('#result').hide();
$('.dans0').hide();
$('.dans1').hide();


// 大段位選択

$('#dan1').on('change', function () {
    $('.dans0').hide();
    if ($('#dan1').val() < 7 ) {
        $('#dans0_1').show();
    }
    
    else {
        $('#dans0_2').show();
    }
});

$('#dan2').on('change', function () {
    $('.dans1').hide();
    if ($('#dan2').val() < 7) {
        $('#dans0_3').show();
    }
    
    else {
        $('#dans0_4').show();
    }
});



// 今日の日付取得
var today = new Date();
today_year = today.getFullYear();
today_month = String(today.getMonth() + 1).padStart(2,'0');
today_day = String(today.getDate()).padStart(2,'0');
$('#today').text(today_year + '/' + today_month + '/' + today_day);

//7月１０日追加
window.twttr = (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
      t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);
  
    t._e = [];
    t.ready = function(f) {
      t._e.push(f);
    };
  
    return t;
  }(document, "script", "twitter-wjs"));



