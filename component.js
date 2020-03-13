function getPageInfo() {
  return new Promise(function(resolve, reject) {
    let url = constGlobal.HostAppPageCustomize + "getMobileCustomizePageInfo";
    let params = {
      pageInfoId: "4e695b0cf1c947d38fc3375e7c47a2f7"
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
var component = {portalApps: portalApps,portalClasses: portalClasses};
return component 
}