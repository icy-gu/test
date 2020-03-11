var portalSwiperContainerComponent = `
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


<style lang="css">
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
</style>
`
var component = {
    portalSwiperContainerComponent: portalSwiperContainerComponent
}

export default component