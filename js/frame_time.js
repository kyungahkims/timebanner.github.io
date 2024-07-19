//let wp_json = ('{{wp_json}}');
let wp_json = (
	'{"client":[{"logo":16,"payLink":"http://www.naver.com","memberChk":"N","today_point":"4","total_point":"100","data":[{"logo":"bibiesong-1216726537000.png","price":"63000", "prdt_prmct":"60000", "dc_rate":"50", "pnm":"[핫딜]츠링데님원피스","t0":"","purl":"/servlet/drc?no=1183&kno=0&s=82&adgubun=SR&gb=SR&sc=89c67bfff3c645982ab17fa212af9c8b&mc=82&userid=bibiesong&u=bibiesong&product=nor&slink=http%3A%2F%2Fwww.bibiesong.com%2Fproduct%2Fdetail.html%3Fproduct_no%3D1183%26cate_no%3D27%26display_group%3D1&rtb_param=WY09E07C01W061_0_1_CW_A&freqLog=19&viewTime=_82_1434604974429_383","img":"https://www.dabagirl.co.kr/web/product/big/202105/04ff60dbb9fa51e3c47fc8e4bdc27c08.jpg","imageSqreYn":"N","pcode":"1183","site_name":"비비에송","logo2":"bibiesong-1502410438000.png","site_desc1":"패션은 지금 당장 다바걸!","site_desc2":"다바걸은 옷 하나만 사도 무료배송!","site_desc3":"신규 가입하고 다양한 혜택 받자! 최대 총 1만원 3종 쿠폰 발급","site_desc4":"사이트설명4", "advrtsReplcNm":"", "monetaryUnit":"$","cta_text":"바로가기","site_title":"다바걸","time_product_sale_price":"1200000","time_proudct_price":"1300000","time_date":"202407201900", "time_title_use_yn":"", "time_product_use_yn":""}],"length":16,"target":"UM","site_title":"다바걸","oslink":""}]} '
);
base_default_script_type0();

const obj = $.parseJSON(wp_json).client[0].data[0];

/* obj time_date */
const timeData = (i) => ({
	year: parseInt(i.substring(0, 4)),
	month: parseInt(i.substring(4, 6)),
	day: parseInt(i.substring(6, 8)),
	hour: parseInt(i.substring(8, 10)),
	minute: parseInt(i.substring(10, 12))
});

const {year, month, day, hour, minute} = timeData(obj.time_date);

/* 방송 시작 flip */
function tickInit(tick) {
	let tickTime = new Date(year, month - 1, day, hour, minute);
	let counter = Tick.count.down(tickTime, {
		format: ['h', 'm', 's']
	});

	counter.onupdate = function (value) {
		tick.value = value;
	};

	counter.onended = function () {
		$(".active").css("display", "flex");
		$(".no_active").css("display", "none");
	};
}

/* 방송 종료 flip */
function tickInit2(tick) {
	let tickTime = new Date(year, month - 1, day, hour + 1, minute);
	let counter = Tick.count.down(tickTime, {
		format: ['h', 'm', 's']
	});

	counter.onupdate = function (value) {
		tick.value = value;
	};
}

/* 시간 라벨 */
const timeLabel = (day, hour, minute) => {
	const current_date = new Date();
	const current_day = current_date.getDate();
	const formattedDay = day === current_day ? '오늘' : day === (current_day + 1) ? '내일' : `${day}일`;
	let period = '오전';
	const formattedMinute = minute === 0 ? '' : `${minute}분`;
	if (hour >= 12) {
		period = '오후';
		hour = hour > 12 ? hour - 12 : hour;
	} else if (hour === 0) {
		hour = 12;
	}
	return `${formattedDay} ${period} ${hour}시 ${formattedMinute}`;
};

/* 데이터 값 */
$(window).load(() => {
	const s_date = timeLabel(day, hour, minute);
	const productSalePrice = Number(obj.time_product_sale_price).toLocaleString();
	const productPrice = Number(obj.time_proudct_price).toLocaleString();
	$('.title_text1').text(obj.time_title1);
	$('.title_text2').text(obj.time_title2);
	$('.s_date').text(s_date);
	$('.time_product_name').text(obj.time_product_name);
	$('.time_proudct_price').text(productPrice);
	$('.time_product_sale_price').text(productSalePrice);
	$('.time_product_sale_rate').text(obj.time_product_sale_rate);

	if (obj.time_title_use_yn === "N") $('.time_title_use_yn').remove();
	if (obj.time_product_use_yn === "N") $('.time_product_use_yn').remove();
});