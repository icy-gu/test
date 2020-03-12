function getPageInfo() {
  return new Promise(function(resolve, reject) {
    let url = constGlobal.HostAppPageCustomize + "getMobileCustomizePageInfo";
    let params = {
      pageInfoId: "2649aa9572c14c65b6f203afc7c26267"
    };
    http.apiPost(url, params).then(res => {
      if (res.status == 0) {
        resolve(res.data);
      } else {
        common.toastMsg(res.message);
      }
    });
  });
}
function loadComponent(){ 

 var portalClasses = `
<template>
<div class="portalCalsses portalWrap" v-if="isShowClass">
        <div class="title flex flex-align-items flex-justify-content-between" >
           <div class="left">
               <span class="text">今日课程</span>
           </div>
           <div class="right" @click="handleToMore" v-if="jumpUrl != ''">
               <span>更多</span>
           </div>
        </div>
        <div class="classList" ref="classListDiv">
            <div class="swiperDiv" v-if="classList.length > 0">
                <div  class="swiper-item-class"
                    :class="{'activity-swiper-item' : item.status == 1}"
                    v-for="(item, index) in classList" 
                    :key="index" >
                    <div class="flex flex-direction-column">
                        <div class="className">{{item.kcmc}}</div>
                        <div class="timeAndPlace">{{item.startTime + '-' + item.endTime }}&nbsp;|&nbsp;{{item.skjs}}</div>
                    </div>
                </div>
            </div>
            <div class="noClassList flex flex-justify-content flex-align-items" v-if="classList.length == 0">
                <img src="https://xtaymydmyd.github.io/pictureLibrary/class.png" alt="">
                今日暂无课程
            </div>
        </div>
    </div>
</template> 
	
<script>
export default {
    components:{
    },
    data(){
        return{
            classList:[],
            isShowClass:true,
            jumpUrl:'',
        }
    },
    mounted(){
        var _this = this;
        this.getToDaySyllabus()

        this.$nextTick(() => {
            /* 监听下拉加载事件 */
            window.bus.$on('loadEvent' , () => {
                this.getToDaySyllabus();
            })
        })
    },
    methods:{
        /**
         * @method  获取首页今日课程
         */
        getToDaySyllabus(){
            let url = constGlobal.HostCampusStudy + 'getToDaySyllabus';
            http.apiGet( url ).then( res=>{
                if( res.status == 0 ){
                    if( res.data != null && res.data.length > 0){
                        this.classList = res.data;
                    }
                    this.isShowClass = res.extData;
                    this.$nextTick(()=>{
                        var objDom = document.querySelectorAll('.activity-swiper-item')[0];
                        if( objDom ){
                            this.$refs.classListDiv.scrollLeft = objDom.offsetLeft - 10;
                        }
                    })
                }else{
                    common.toastMsg( res.message )
                }
            })
        },
        /**
         * @method  点击更多
         */
        handleToMore(){
            if( constGlobal.isWeChat() ){
                window.location.href = 'timeTables.html#/timeTables'
            }else{
                common.openApp(this.jumpUrl)
            }
        },
    }
}
</script> 
	
<style>
.portalWrap {
  background: white;
}
.portalWrap .title {
  padding: 3px 15px 3px 15px;
  overflow: hidden;
}
.portalWrap .title .left {
  display: inline-block;
  overflow: hidden;
  color: #222;
  height: 100%;
  position: relative;
}
.portalWrap .title .left span.text {
  font-size: 20px;
  font-weight: 700;
}
.portalWrap .title .right {
  overflow: hidden;
  color: #ccc;
}
.portalWrap .title .right > span {
  display: inline-block;
  float: left;
  line-height: 33px;
  font-size: 14px;
  color: #505050;
}
.portalWrap .title .right > span + img {
  float: right;
  height: 10px;
  width: 8px;
  margin-left: 4px;
  margin-top: 12px;
}

.portalCalsses {
  min-height: 140px;
}
.portalCalsses .classList {
  overflow-x: auto;
  padding: 10px 15px 20px;
}
.portalCalsses .classList .swiperDiv {
  width: max-content;
}
.portalCalsses .classList .swiperDiv .swiper-item-class {
  display: inline-block;
  padding: 20px 15px;
  background: #f7f8fe;
  border-radius: 5px;
  box-sizing: border-box;
  margin-right: 10px;
  border: 1px solid #fafafa;
}
.portalCalsses .classList .swiperDiv .swiper-item-class .className {
  font-size: 17px;
  color: #505050;
  margin-bottom: 10px;
}
.portalCalsses .classList .swiperDiv .swiper-item-class .timeAndPlace {
  font-size: 12px;
  color: #838383;
  line-height: 15px;
}
.portalCalsses .classList .swiperDiv .activity-swiper-item {
  box-shadow: 0px 5px 10px 0px rgba(195, 36, 15, 0.15);
  background: url("https://xtaymydmyd.github.io/pictureLibrary/activityClassBg.png") no-repeat;
  background-size: 100% 100%;
  border: none;
}
.portalCalsses .classList .swiperDiv .activity-swiper-item .className {
  color: #f9f9f9;
}
.portalCalsses .classList .swiperDiv .activity-swiper-item .timeAndPlace {
  color: rgba(249, 249, 249, 0.7);
}
.portalCalsses .classList .noClassList {
  height: 60px;
  border-radius: 5px;
  border: 1px dashed #ff5858;
  position: relative;
  box-sizing: border-box;
  background: linear-gradient(to right, #fff5eb, #ffebeb);
  color: #ff5858;
  font-size: 15px;
}
.portalCalsses .classList .noClassList img {
  width: 16px;
  margin-right: 4px;
}
.portalCalsses .classList .noClassList:before {
  content: "";
  position: absolute;
  height: 30px;
  width: 3px;
  background: #ff5858;
  border-radius: 1px;
  left: -2px;
  top: 15px;
}
</style>`;
 var portalActive = `
<template>
<div class="portalActive portalWrap">
        <div class="title flex flex-align-items flex-justify-content-between myActiveTitle">
           <div class="left">
               <span class="text">校园活动</span>
           </div>
           <div class="right"  @click="toModule()" v-if="jumpUrl != ''">
               <span>更多</span>
           </div>
        </div>
        <div class="container" style="min-height: 70px;box-sizing:border-box;">
            <div class="active-list" 
                @click="toAppointmentInfo('appointment.html/appointment/appointmentInfo/1')" 
                v-show="activeFlag && active.name.length > 0">
                <div class="active-content">
                    <div style="border-radius:4px;min-height:160px;width: 100%;position: relative;">
                        <img 
                            :src="sourceUrl + 'ueditor/imgPrefix/' + active.coverImgId + '/0'" 
                            style="width:100%;border-radius:5px;"
                            v-if="!(active.coverImgId == null || active.coverImgId == '')">
                        <img src="https://xtaymydmyd.github.io/pictureLibrary/huodong.png" 
                            style="width:100%;border-radius:5px;"
                            v-if="active.coverImgId == null || active.coverImgId == ''">
                    </div>
                    <div class="active-content-title flex flex-justify-content-between flex-align-items">
                        <div class="active-title" style="width:100%;">{{active.name}}</div>
                    </div>
                </div>
            </div>  
            <div class="noActivityList flex flex-justify-content flex-align-items" v-show="activeFlag && active.name.length == 0">
                <img src="https://xtaymydmyd.github.io/pictureLibrary/huodong.png" alt="">
                无相关活动
            </div>
        </div>
    </div>
</template> 
	
<script>
export default {
    name: 'portalActive',
    data () {
        return {
            active : {name:''},
            sourceUrl : constGlobal.HostBooking,
            activeFlag : false,
            jumpUrl:'',
        }
    },
    components: {},
    mounted:function () {
        var _this = this;
        this.queryActive();
    },
    methods: {
        /**
         * 获取我的活动预约
        */
        queryActive:function(){
            var param = {};
            var url = constGlobal.HostBooking + 'getHotBooking';
            http.apiPost(url, param).then(res => {
                if (res.status == 0) {
                    this.activeFlag = true;
                    if(res.data){
                        this.active = res.data;
                    }
                } else {
                    common.toastMsg(res.message)
                }
            });
        },
        /**
         * 跳转到预约列表
        */
        toModule : function(link){
            sessionStorage.setItem('appointmentState', JSON.stringify(1));
            if( constGlobal.isWeChat() ){
                window.location.href = 'appointment.html#/appointment/appointmentList'
            }else{
                common.openApp(this.jumpUrl + "/appointmentList")
            }
        },
        /**
         * 跳转到预约详情
        */
        toAppointmentInfo:function(link){
             if(this.active.isSel == 0){
                if( constGlobal.isWeChat()){
                    window.location.href = "appointment.html#/appointment/appointmentInfo/1?id=" + this.active.bookingId + '&isCanBooking=' + this.active.isCanBooking + '&isExp=' + this.active.isExp; 
                }else{
                    if( this.jumpUrl != ''){
                        common.openApp(  this.jumpUrl + "/appointmentInfo/1?id=" + this.active.bookingId + '&isCanBooking=' + this.active.isCanBooking + '&isExp=' + this.active.isExp )
                    }
                }
            }else{
                if(constGlobal.isWeChat()){
                    window.location.href = 'appointment.html#/appointment/apponitmentQX?id=' + this.active.bookingId + '&timeStampId=' + this.active.timeStampId+ '&isExp=' + this.active.isExp;
                }else{
                    if( this.jumpUrl != ''){
                        common.openApp( window.location.href = this.jumpUrl + '/apponitmentQX?id=' + this.active.bookingId + '&timeStampId=' + this.active.timeStampId+ '&isExp=' + this.active.isExp )
                    }
                }
            }
        }
    }
}
</script> 
	
<style>
.portalWrap {
  background: white;
}
.portalWrap .title {
  padding: 3px 15px 3px 15px;
  overflow: hidden;
}
.portalWrap .title .left {
  display: inline-block;
  overflow: hidden;
  color: #222;
  height: 100%;
  position: relative;
}
.portalWrap .title .left span.text {
  font-size: 20px;
  font-weight: 700;
}
.portalWrap .title .right {
  overflow: hidden;
  color: #ccc;
}
.portalWrap .title .right > span {
  display: inline-block;
  float: left;
  line-height: 33px;
  font-size: 14px;
  color: #505050;
}
.portalWrap .title .right > span + img {
  float: right;
  height: 10px;
  width: 8px;
  margin-left: 4px;
  margin-top: 12px;
}

.portalActive {
  margin-bottom: 10px;
}
.portalActive .container {
  padding: 10px 15px 10px 15px;
}
.portalActive .container .active-list .active-wrap {
  width: 100%;
  position: relative;
}
.portalActive .container .active-list .active-wrap > img {
  width: 100%;
}
.portalActive .container .active-list .active-top {
  margin: 0px 0px 10px 0px;
}
.portalActive .container .active-list .active-top .active-top-left .active-top-head {
  width: 50px;
}
.portalActive .container .active-list .active-top .active-top-left .active-top-left-info {
  margin-left: 10px;
}
.portalActive .container .active-list .active-top .active-top-left .active-top-left-info .active-top-name {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 5px;
}
.portalActive .container .active-list .active-top .active-top-left .active-top-left-info .active-top-time {
  color: #888;
}
.portalActive .container .active-list .active-top .active-top-right {
  text-align: right;
}
.portalActive .container .active-list .active-top .active-top-right .active-top-statu span {
  padding: 2px 10px;
  border-radius: 20px;
  margin-bottom: 5px;
  display: inline-block;
}
.portalActive .container .active-list .active-top .active-top-right .active-top-statu .active0 {
  background: #299bf0;
  color: white;
}
.portalActive .container .active-list .active-content .active-content-img {
  width: 100%;
  border-radius: 5px;
}
.portalActive .container .active-list .active-content .active-content-title .active-title {
  font-size: 15px;
  line-height: 30px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #222;
}
.portalActive .container .active-list .active-content .active-content-text {
  color: #888;
  font-size: 15px;
  line-height: 26px;
}
.portalActive .container .active-list .active-bottom {
  color: #888;
  font-size: 14px;
}
.portalActive .container .active-list .active-bottom img {
  height: 12px;
  margin-right: 5px;
}
.portalActive .container .active-list .active-top-right,
.portalActive .container .active-list .active-price {
  color: #f95f70;
}
.portalActive .container .activeContainer {
  overflow: hidden;
}
.portalActive .container .activeContainer .left {
  float: left;
  width: 64px;
  height: 90px;
  border: 1px solid white;
}
.portalActive .container .activeContainer .left img {
  width: 100%;
  height: 100%;
}
.portalActive .container .activeContainer .right {
  width: calc(100% - 66px);
  padding-left: 10px;
  box-sizing: border-box;
  height: 90px;
  float: left;
}
.portalActive .container .activeContainer .right .active-name {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: break-all;
  height: 22px;
  max-width: 100%;
  text-overflow: ellipsis;
  font-size: 14px;
  color: #333333;
  font-size: 16px;
  font-weight: 700;
}
.portalActive .container .activeContainer .right .active-time {
  height: 22px;
  line-height: 22px;
  margin-top: 2px;
}
.portalActive .container .activeContainer .right .active-place {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: break-all;
  height: 24px;
  max-width: 90%;
}
.portalActive .container .activeContainer .right .tag {
  float: left;
  margin-right: 5px;
  border-radius: 3px;
  height: auto;
  text-align: center;
  line-height: initial !important;
  display: inline-block;
  padding: 0px 1px;
  font-size: 10px !important;
}
.portalActive .container .activeContainer .right .tag img {
  width: 100%;
}
.portalActive .container .activeContainer .right .over {
  color: #999;
  border: 1px solid #999;
}
.portalActive .container .activeContainer .right .not-start {
  color: #00b94d;
  border: 1px solid #00b94d;
}
.portalActive .container .activeContainer .right .appointment-tag {
  color: #f6911d;
  border: 1px solid #f6911d;
}
.portalActive .container .activeContainer .right .manytimes {
  color: #299bf0;
  border: 1px solid #299bf0;
}
.portalActive .container .activeContainer .right .reserved {
  color: #f12f44;
  border: 1px solid #f12f44;
}
.portalActive .container .activeContainer .right .praise {
  height: 25px;
  max-width: 80px;
  padding: 5px;
  padding-top: 0px;
  position: absolute;
  bottom: 2px;
  right: 15px;
}
.portalActive .container .activeContainer .right .praise img {
  width: 15px;
  height: 15px;
  margin-bottom: -2px;
}
.portalActive .container .activeContainer .right .noPraise {
  color: #666666;
  font-size: 12px;
}
.portalActive .container .activeContainer .right .Praise {
  color: #2d9df0;
  font-size: 12px;
}
.portalActive .container .activeContainer .right .right-wrap {
  overflow: hidden;
}
.portalActive .container .activeContainer .right .right-wrap .right-wrap-left {
  float: left;
}
.portalActive .container .activeContainer .right .right-wrap .right-wrap-right {
  float: right;
}
.portalActive .container .activeContainer .right .right-wrap-right img {
  width: 15px;
  height: 15px;
  margin-bottom: -2px;
}
.portalActive .container .noActivityList {
  height: 60px;
  border-radius: 5px;
  border: 1px dashed #e6e6e6;
  position: relative;
  box-sizing: border-box;
  background: #f8f9fb;
  color: #505050;
  font-size: 15px;
}
.portalActive .container .noActivityList img {
  width: 16px;
  margin-right: 4px;
}
</style>`;
 var portalHeader = `
<template>
<div class="portalHeader  flex flex-justify-content-between flex-align-items" style="height:44px;">
            <div class="todayInfo" style="height:30px;">
                <img src="http://jy-admin.jieyundata.com:18026/group1/M00/00/37/wKhkP13fXkaAdw5yAAUHXO3vUrQ770.png" alt="" style="height:100%">
            </div>
            <div class="headLeft">
                <img src="https://xtaymydmyd.github.io/pictureLibrary/scan_icon1.png" @click="useScan" class="scan-grey-icon" style="height:18px;">
            </div>
        </div>
</template> 
	
<script>
export default{
        name: 'portalHeader',
        data () {
            return {
                headType: '1',
                searchState: false,
                date: '',
                week: ''
            }
        },
        props: {
            link:String
        },
        mounted:function () {
            if(constGlobal.isWeChat()){
                this.querySignature();
            }
            this.date = moment().format('YYYY年MM月DD日 dddd')
        },
        methods: {
            querySignature(){
                var url = constGlobal.HostJSAPISignature +  "signature";
                http.apiPost(url, {url: window.location.href}).then(res =>{
                    if(res.status == 0){
                        var signatureParams = res.data;
                        signatureParams.jsApiList = ['scanQRCode'];
                        this.useJsApi(signatureParams);
                    }
                });
            },
            useJsApi(configParams){
                parent.wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: configParams.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
                    timestamp: configParams.timestamp, // 必填，生成签名的时间戳
                    nonceStr: configParams.nonceStr, // 必填，生成签名的随机串
                    signature: configParams.signature,// 必填，签名，见附录1
                    jsApiList:  configParams.jsApiList// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                parent.wx.error(function(res){
                //    console.log(res);
                });
                parent.wx.ready(function(){
                    parent.wx.getLocation({
                        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                        success: function(res) {
                            var location = {
                                latitude: res.latitude,
                                longitude: res.longitude
                            }
                            sessionStorage.setItem("deviceLocationInfo", JSON.stringify(location));
                        }
                    })
                });
                
            },
            useScan(){
                var _this = this;
                if(constGlobal.isWeChat()){
                    parent.wx.scanQRCode({
                        desc: 'scanQRCode desc',
                        needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                        scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                        success: function (res) {
                            // console.log(res);
                        },
                        error: function(res){
                            if(res.errMsg.indexOf('function_not_exist') > 0){
                                alert('版本过低请升级')
                            }
                        }
                    });
                }else{
                    // cordova调用扫一扫
                   
                }
            },
        }
    }
</script> 
	
<style>
.portalHeader {
        background: #fff;
        padding: 0px 15px;
        height: 44px;
    }
    .portalHeader .todayInfo img {
        height: 26px;
    }
    .portalHeader .headLeft img {
        height: 18px;
    }
    
    .fixPortalHeader1 .scan-white-icon {
        display: inline-block;
    }
    .fixPortalHeader1 .scan-grey-icon {
        display: none;
    }
    .fixPortalHeader1 .vux-1px:before {
        border: 0px solid #e6e6e6;
        border-radius: 30px;
    }
    
    .fixPortalHeader2 .scan-white-icon {
        display: none;
    }
    .fixPortalHeader2 .scan-grey-icon {
        display: inline-block;
    }
    .fixPortalHeader2 .vux-1px:before {
        border: 1px solid #e6e6e6;
        border-radius: 30px;
    }
</style>`;
 var swiperContainer = `
<template>
<div class="swiperContainer" v-if="swiperList.length > 0 && topNews.length > 0">
       <swiper-plugin loop auto :aspect-ratio="150/345" dots-position="center" style="width:100%;">
             <swiper-item-plugin 
                class="swiper-demo-img portalSwiperTopItem flex flex-align-items" 
                v-for="(item, index) in swiperList" 
                :key="index" 
                @click.native="toSwiper(item)" 
                style="min-height:100px;">
                  <img :src="item.absoluteImg" style="width:100%;"> 
            </swiper-item-plugin>
        </swiper-plugin>
    </div>
</template> 
	
<script>
export default{
    name: 'swiperContainer',
    data () {
        return {
            swiperList: [],
            swiper_index:0,
            topNews:[],
            db : null,
            length : 0,
            isWechat : constGlobal.isWeChat(),
            database : constGlobal.database
        }
    },
    mounted:function () {
        var _this = this;
        this.queryMicPortalTopNews()
    },
    methods: {
        /**
         * 打开数据库
        */
        openDatabaseEvent(){
            var _this = this;
            if(constGlobal.isAndroid()){
                this.db = window.sqlitePlugin.openDatabase({name: this.database.name, location: 'default'});
            }
            if(constGlobal.isIOS()){
                _this.db = window.sqlitePlugin.openDatabase({name: _this.database.name, iosDatabaseLocation: 'Library'});
            }
            _this.getDataFromDataBase();
        },
        /**
         * 从表中查询数据
        */
        getDataFromDataBase(){
            var _this = this;
            this.db.transaction(function(tx){
                if(!common.sessionGet("firstStartSwiperContainer")){
                    tx.executeSql("drop table if exists " + _this.database.top + "")
                    common.sessionSet("firstStartSwiperContainer" , 1);
                }
                tx.executeSql('CREATE TABLE IF NOT EXISTS ' + _this.database.top + '(id,name,url,absoluteImg,imgId,imgData)');
                tx.executeSql('SELECT * from ' + _this.database.top , [], function (tx, result){
                    var len = result.rows.length;
                    if(len == 0){
                        _this.queryMicPortalTopNews();
                        return;
                    }
                    common.isClosseSplashscreen();//判断是否可以关闭启动页
                    _this.topNews = [];
                    for (var i = 0; i < len; i++) {
                        _this.topNews[i] = result.rows.item(i);
                    }
                    _this.topNews.push();
                    _this.cooperSwiper();
                });
            },function(error){
            },function(error){
            })
        },
        /**
         *   获得置顶新闻
        */
        queryMicPortalTopNews () {
            var url = constGlobal.HostPortal + 'getBannerList';
            http.apiGet(url).then(res => {
                if (res.status == 0) {
                    this.topNews = res.data;
                    this.swiperList = res.data;
                } else {
                    common.toastMsg(res.message)
                }
            });
        },
        getImgBase64(){
            var _this = this;
            var _this = this;
            for(var i = 0 ; i < this.topNews.length ; i++){
                this.convertImgToBase64(this.topNews[i].absoluteImg , i , function(base64Img , index){
                    _this.topNews[index].imgData = base64Img;
                    _this.length ++;
                    _this.insertData();
                });
            }
        },
        insertData(){
            if(this.length < this.topNews.length){
                return;
            }
            var _this = this;
            this.db.transaction(function(tx){
                for(var i = 0 ; i < _this.topNews.length ; i++){
                    var data = [
                        _this.topNews[i].id,
                        _this.topNews[i].name,
                        _this.topNews[i].url,
                        _this.topNews[i].absoluteImg,
                        _this.topNews[i].imgId,
                        _this.topNews[i].imgData
                    ]
                    tx.executeSql('INSERT INTO ' + _this.database.top + ' VALUES (?1,?2,?3,?4,?5,?6)', data )
                }
            },function(error){
                // console.log('INSERT error: ' + error.message);
            },function(error){
                // console.log('transaction ok');
                _this.getDataFromDataBase();
            })
        },
        /**
         *   将图片转换成base64位，保存到本地
        */
        convertImgToBase64(url , index , callback, outputFormat){
            var canvas = document.createElement('CANVAS'),
            ctx = canvas.getContext('2d'),
            img = new Image;
            img.crossOrigin = 'Anonymous';
            img.onload = function(){
                canvas.height = img.height;
                canvas.width = img.width;
                ctx.drawImage(img,0,0);
                var dataURL = canvas.toDataURL(outputFormat || 'image/png');
                callback.call(this, dataURL , index);
                canvas = null; 
            };
            img.onerror = function(){
                var dataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFUAAABVCAYAAAA49ahaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABDBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjA0YjJhMTNjLWI0OWYtNGU1Ni1hZDljLTc0OGExNGIyMWQ1OSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1RTZGQ0RGQUEzOEExMUU4OUQ1OUMwMDZENzE0ODQ0NiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1RTZGQ0RGOUEzOEExMUU4OUQ1OUMwMDZENzE0ODQ0NiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKE1hY2ludG9zaCkiIHhtcDpDcmVhdGVEYXRlPSIyMDE4LTA4LTI5VDE2OjIxOjI5KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOC0wOC0yOVQwODozMjoxMiswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAx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";
                callback.call(this, dataURL , index);
                canvas = null; 
            }
            img.src = url;
        },
        /**
         *  重组swiper
        */
        cooperSwiper:function(){
            this.swiperList = [];
            for(var i = 0 ; i < this.topNews.length ; i++){
                if(this.topNews[i].imgData.indexOf("base64") == -1){
                    sessionStorage.removeItem("firstStartSwiperContainer");
                    this.getDataFromDataBase();
                    return;
                }
                var param = {
                    url: this.topNews[i].url,
                    img: this.topNews[i].imgData,
                    title: this.topNews[i].name,
                }
                this.swiperList.push(param);
            }
        },
        
        toSwiper:function(item){
            if(item.url == ''){
                return
            }
           
            if(constGlobal.isWeChat()){
                window.location.href = item.url;
            }else{
                common.inAppBrowserOpen(item.url)
            }
        }
    }
}
</script> 
	
<style>
.swiperContainer {
  background: #fff;
  padding: 15px 15px;
}
.swiperContainer .vux-swiper {
  min-height: 100px !important;
  border-radius: 8px;
  background: #eee;
}
.swiperContainer .vux-swiper .portalSwiperTopItem {
  overflow: hidden;
  border-radius: 8px;
}
.swiperContainer .vux-swiper .portalSwiperTopItem img {
  border-radius: 8px;
}
.swiperContainer .vux-slider .vux-indicator.vux-indicator-center {
  bottom: 0px;
}
.swiperContainer .vux-slider .vux-indicator.vux-indicator-center a .vux-icon-dot {
  width: 15px;
  height: 3px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.6);
}
.swiperContainer .vux-slider .vux-indicator.vux-indicator-center a .active {
  background: #fff;
}
</style>`;
 var portalApps = `
<template>
<div class="portalApps" style="overflow:hidden;box-sizing: border-box;">
        <div class="block" 
            v-for="(item , index) in mineFrequentAppList" 
            :key="index" 
            @click="openApp(item)"
            v-show="index < 9">
            <div class="img_div" v-bind:class="{ 'noBackground': item.iconAbsolutePath.length > 0 }">
               <img :src="item.iconAbsolutePath" >
            </div>
           <div class="name">{{item.appName}}</div>
        </div>
        <div class="block" @click="toApps('/portalApps')"  >
            <div class="img_div noBackground">
                <img src="https://xtaymydmyd.github.io/pictureLibrary/all.png">
            </div>
            <div class="name">全部</div>
        </div>
    </div>
</template> 
	
<script>
export default{
    name: 'portalApps',
    data () {
        return {
            userId : '11223344',
            servicesInfo : {
                services : [{
                    service : "LE1979804469253685" , 
                    versions : [
                        "0.9.9"
                    ]
                },{
                    service : "LE7272916228764612", 
                    versions : [
                        "0.9.9"
                    ]
                },{
                    service : "LE1306137918779755",
                    versions : [
                        "0.9.9"
                    ]
                },{
                    service : "LE5297841192500518",
                    versions : [
                        "0.9.9"
                    ]
                },{
                    service : "LE8059555495213303",
                    versions : [
                        "0.9.9"
                    ]
                },{
                    service : "LE2573081192162895",
                    versions : [
                        "0.9.9"
                    ]
                },{
                    service : "LE5080279843025171",
                    versions : [
                        "0.9.9"
                    ]
                },{
                    service : "LE8334144128797710",
                    versions : [
                        "0.9.9"
                    ]
                },{
                    service : "LE3816640045323073",
                    versions : [
                        "0.9.9"
                    ]
                },{
                    service : "LE8678955592847388",
                    versions : [
                        "0.9.9"
                    ]
                },{
                    service : "LE5487864134356253",
                    versions : [
                        "0.9.9"
                    ]
                },{
                    service : "LE5687062494165323",
                    versions : [
                        "0.9.9"
                    ]
                },{
                    service : "LE3634419649498928",
                    versions : [
                        "0.9.9"
                    ]
                }]
            },
            flag : false,
            mineFrequentAppList : [],
        }
    },
    watch: { 
        '$route' (to, from) { 
            if(from.name == 'portalAllApps'){
                this.flag = true
            }
        },
    },
    mounted:function () {
        this.init();
    },
    activated() {
        this.init();
    },
    methods: { 
        init(){
            var _this = this;
            if(constGlobal.isDebug() || constGlobal.isWeChat()){
                this.getServices();
            }else{
                var data = sessionStorage.getItem("mineFrequentAppListForlimit")
                if(data){
                    this.mineFrequentAppList = JSON.parse(data);
                    this.mineFrequentAppList.push();
                }else{
                    initLD.ldReady(function(){
                        _this.getServices();
                    })
                }
            }
        },
        /**
         * 获取本地版本信息
        */
        getServices(){
            console.log("getServices")
            if(constGlobal.isDebug() || constGlobal.isWeChat()){
                this.getMineFrequentAppList();
            }else{
                le.sys.getServices({
                    onSuccess : this.getServicesSuccess, 
                    onError : this.getServicesError,
                    account: this.userId
                });
            }
        },
        /**
         * 获取本地版本信息 - 失败 或 为空
        */
        getServicesError(err){
            console.log("======== getServicesError ======");
            console.log(err)
            this.servicesInfo = {
                base : "",
                services : []
            }
            
            this.getMineFrequentAppList();
        },
        /**
         * 获取本地版本信息成功
        */
        getServicesSuccess(data){
            console.log("======== getServicesSuccess ======");
            console.log(data)
            this.servicesInfo = data;
            
            this.getMineFrequentAppList();
        },
        /**
         *   获取我的常用应用列表 
         */
        getMineFrequentAppList(){
            this.mineFrequentAppList = [];
            let param = {
                appPlatformType : constGlobal.isWeChat() ? 1 : 2,
                limitNum : 7
            }
            var url = constGlobal.HostAppAppManagement + '/getMineFrequentAppList';
            http.apiPost(url, param).then(res => {
                if (res.status == 0) {
                    if(res.data){
                        this.setMineAppNewData(res.data)
                    }
                } else {
                    common.toastMsg(res.message)
                }
            });
        },
        setMineAppNewData(data){
            var list = data;
            for(var i = 0 ; i < list.length ; i++){
                list[i] = this.getOperaStatus(list[i])
            }
            this.mineFrequentAppList = list;
            this.mineFrequentAppList.push()
            sessionStorage.setItem("mineFrequentAppListForlimit" , JSON.stringify(this.mineFrequentAppList))
        },
        getOperaStatus(item){
            item.down = false;          
            item.update = false;        
            item.open = false;         
            item.delete = false;        
            item.openUrl = "";         
            item.percent = 0;           
            item.downFlag = false;
            item.isForceUpdate = false ; 

            item.disappear = false;

            /* 第二步 ： 判断是外链 还是 压缩包*/
            if(item.appFromCode == "1"){
                item.open = true; 
                if(item.appVersionList.length >= 1){
                    item.openUrl = item.appVersionList[0].homePageUrl;
                }else{
                    item.disappear = true;
                }
            }else{
                /* 第三步 ： 判断本地是否已添加此应用 */
                var version = this.getServiceOfVersion(this.servicesInfo , item.appId);
                if(version){
                    var flag = false;
                    /* 第四步 ： 判断版本号，appVersionList[0] 是最新的版本号 ， 其他是历史版本号*/
                    for(var i = 0 ; i < item.appVersionList.length ; i++){
                        if(i == 0){
                            /* 如果与最新的版本号一致，则可直接打开*/
                            /* 如果与最新的版本号一致，则可直接打开*/
                            if(item.isPresetApp == '1' && item.appVersionList[i].version == '0.9.9'){
                                flag = true;
                                item.open = true;
                                item.openUrl = this.getFilePath(this.servicesInfo.base , item.appId , item.appVersionList[i] , 1)
                            }else if(version == item.appVersionList[i].version){
                                flag = true;
                                item.open = true;
                                item.openUrl = this.getFilePath(this.servicesInfo.base , item.appId , item.appVersionList[i])
                            }
                        }else{
                            /* 如果与历史版本号一致，则设置相应的路径 ， 并判断最新的是否强制更新*/
                            if(version == item.appVersionList[i].version){
                                flag = true;
                                item.open = true;
                                item.update = true;
                                item.openUrl = this.getFilePath(this.servicesInfo.base , item.appId , item.appVersionList[i])
                                if(item.appVersionList[0].isForceUpdate){
                                    item.isForceUpdate = true;
                                }
                            }
                        }
                    }
                    /* 如果在给的版本中不存在，则不显示此应用*/
                    if(!flag){
                        item.disappear = true;
                    }
                }else{
                    item.disappear = true;
                }
            }
            return item
        },
        /**
         * 打开App
        */
        openApp(item){
            console.log(item.openUrl)
            if(item.disappear){
                this.$router.push({
                    path : '/appStoreDetail',
                    query : {
                        appInfoId : item.appInfoId,
                        appPlatformType : constGlobal.isWeChat() ? 1 : 2
                    }
                })
                return
            }
            /* 强制更新 */
            if(item.update && item.isForceUpdate){
                /* 进入应用事件 */
                this.$router.push({
                    path : '/appStoreDetail',
                    query : {
                        appInfoId : item.appInfoId,
                        appPlatformType : constGlobal.isWeChat() ? 1 : 2
                    }
                })
                return
            }
            /* 打开应用 */
            common.openApp(item.openUrl , item.appFromCode == "1" ? 1 : -1)
        },
        toApps(path){
            this.$router.replace({
                path : path
            })
        },
        getFilePath(base, appId, item, type){
            var codeFileName = item.codeFileName
            var homePageUrl = item.homePageUrl
            var version = item.version
            var file = codeFileName.split('.')
            var url = ''
            url = 'file:/' + '/' + base + '/' + appId + '/' + homePageUrl
            return url
        },
        getServiceOfVersion (data, appId){
            if (data && data.services) {
                for (var i = 0; i < data.services.length; i++) {
                    if (appId == data.services[i].service) {
                        return data.services[i].versions[data.services[i].versions.length - 1]
                    }
                }
            }
            return null
        }
    }
}
</script> 
	
<style>
.portalApps {
  background: white;
  padding: 15px 5px 0px 5px;
}
.portalApps .block {
  float: left;
  width: 25%;
  margin-bottom: 20px;
}
.portalApps .block .img_div {
  width: 40px;
  height: 40px;
  position: relative;
  margin: auto;
  background-size: 100% 100%;
}
.portalApps .block .img_div img {
  position: absolute;
  width: 100%;
  height: 100%;
}
.portalApps .block .noBackground {
  background: none;
}
.portalApps .block .name {
  font-size: 13px;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #181818;
  margin-top: 10px;
  line-height: 17px;
}
</style>`;
var component = {portalClasses: portalClasses,portalActive: portalActive,portalHeader: portalHeader,swiperContainer: swiperContainer,portalApps: portalApps};
return component 
}