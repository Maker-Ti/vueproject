<template>
    <div class="layout-content">
        <div class="layout-content-main">
            <div id="change">
              <h3> <p class="centerTxt">{{this.hintText}}</p></h3>
                <h4> <p class="centerTxt red">{{this.filledInfo}}</p></h4>
                <div v-if="formContentControl">
                    <div class="mt20" >
                        <p>体温是否>37.5℃</p>
                        <Radio-group  v-model="isTemAbove">
                            <Radio  label="是">是</Radio>
                            <Radio  label="否">否</Radio>
                        </Radio-group>
                        <!--  <label v-for="(item, index) in isTemAboveData" :key="index">
                              <input
                                      class="radioUI"
                                      type="radio"
                                      v-model="isTemAbove"
                                      :value="item.value"

                              />
                              {{ item.value }}
                          </label>-->
                    </div>
                    <div class="mt20">
                        <p>身体是否存在异常或感到头晕、发烧</p>
                        <!--  <label v-for="(item, index) in isAbnormalData" :key="index">
                              <input
                                      class="radioUI"
                                      type="radio"
                                      v-model="isAbnormal"
                                      :value="item.value"

                              />
                              {{ item.value }}
                          </label>-->
                        <Radio-group  v-model="isAbnormal">
                            <Radio  label="是">是</Radio>
                            <Radio  label="否">否</Radio>
                            <i-button type="primary" @click="uploadForm"  style="width: 300px" class="btn_ui" >
                                {{this.btnTxt}}
                            </i-button>
                        </Radio-group>
                    </div>
                </div>


            </div>
        </div>
    </div>

</template>

<script>
    export default {
        created:function(){
          this.preLoad();
        },
        data(){
            return {
                formContentControl:true,
                btnTxt:'提交',
                filledInfo:'',
                formId:'',
                isFilled :false,
                nowTime:'',
                phone: 'apple',
               hintText:'main',
                isTemAboveData:[
                    { value: '是' },
                    { value: '否' }

                ],
                isTemAbove:'否',
                isAbnormalData:[
                    { value: '是' },
                    { value: '否' }

                ],
                isAbnormal:'否',
                radioData: [
                    { value: '全部' },
                    { value: '部分' },
                    { value: '零散' }
                ],
                radioVal: '全部' // 用于设置默认选中项
            }
        },
        name: "FormUpload",
        methods:{
            preLoad(){
                var today=(new Date()).toLocaleDateString();
                //2020/6/6
                var startTime = new Date(today+" 00:00:00");
                //    var endTime = new Date(today+" 23:23:23");
                var time6 = Date.parse(startTime)+60*60*1000*6;
                var time11 = Date.parse(startTime)+60*60*1000*11;
                var time21 = Date.parse(startTime)+60*60*1000*21;
                var now = (new Date()).getTime();
                //  alert(Date.parse(startTime)+","+time21)
                var date1 ;
                var date2 ;
                if(time6<=now&&time11>=now){
                    this.hintText = '上午日报填写时间'
                    this.nowTime = 1
                    date1 = time6;
                    date2 = time11;
                }else if(time11<now&&time21>=now){
                    this.hintText = '下午日报填写时间'
                    this.nowTime = 2
                    date1 = time11;
                    date2 = time21;
                }else {
                    this.hintText = '当前不在日报填写时间内'
                    this.nowTime = 0
                }
                if(this.nowTime!=0){
                    this.$http.get("http://localhost:8080/form/stuGetTimeForm?startTime="+ date1+"&endTime="+date2+"&userNumber="+this.$route.params.userNumber).then(
                        response => {
                            if(response.body.status === true){
                                this.btnTxt = '更改'
                                this.isFilled = true;
                                this.formId = response.body.data.id;
                                this.filledInfo = "当前时段已填写报表，点击更改";
                                if(response.body.data.isabnormal === 0){
                                    this.isAbnormal = '否'
                                }else if(response.body.data.isabnormal === 1){
                                    this.isAbnormal = '是'
                                }

                                if(response.body.data.istemabove === 0){
                                    this.isTemAbove = '否'
                                }else if(response.body.data.istemabove === 1){
                                    this.isTemAbove = '是'
                                }

                            }else {
                                this.btnTxt = '提交'
                                this.isFilled = false;
                                this.filledInfo ="当前时段尚未填写报表";
                            }

                        },
                        response => {

                            alert('请求失败');
                            // eslint-disable-next-line no-console
                            console.log("test"+response)
                        },
                    );
                }else {
                   this.formContentControl = false
                }
                /*var a=(new Date()).toLocaleDateString()//获取当前日期
                    a =a.replace(/\//g,'-');//替换2017/05/03 为    2017-05-03
                var nowdate= (new Date(a))/1000;//把当前日期变成时间戳
                var wdate=(new Date(v.wdate))/1000;//把数据库日期变成时间*/

            },
            uploadForm() {
                if(this.nowTime === 0){
                    alert("当前时间不在填写范围内")
                    // eslint-disable-next-line no-empty
                } else {
                    var param = "id="+this.formId+"&date="+((new Date()).getTime());
                    var baseURL = "http://localhost:8080/form/";
                    if(this.isTemAbove === '是'){
                        param = param+"&isTemAbove=1"
                    }else if(this.isTemAbove === '否'){
                        param = param+"&isTemAbove=0"
                    }

                    if(this.isAbnormal === '是'){
                        param = param+"&isAbnormal=1"
                    }else if(this.isAbnormal === '否'){
                        param = param+"&isAbnormal=0"
                    }
                    if(this.isFilled == true){
                        this.$http.get(baseURL+"updateForm?"+param).then(
                            response => {
                                if(response.body.status === true){
                                    alert('更改成功');
                                }else {
                                    alert('更改失败');
                                }
                                this.preLoad();
                            },
                            response => {

                                alert('请求失败');
                                // eslint-disable-next-line no-console
                                console.log("test"+response)
                            },
                        );
                    }else {
                        this.$http.get(baseURL+"insertForm?"+param+"&stuNumber="+this.$route.params.userNumber+"&name="+this.$route.params.userName).then(
                            response => {
                                if(response.body.status === true){
                                    alert('更改成功');
                                }else {
                                    alert('更改失败');
                                }
                                this.preLoad();
                            },
                            response => {

                                alert('请求失败');
                                // eslint-disable-next-line no-console
                                console.log("test"+response)
                            },
                        );
                    }
                }


            }
        }
    }
</script>

<style scoped>
    #formContent{


    }
    .mt20{

        margin-top: 20px;
    }
    .btn_ui{

        width: 100%;
    }
    .radioUI{
        content: "\a0"; /*不换行空格*/
        display: inline-block;
        vertical-align: middle;
        font-size: 18px;
        width: 1em;
        height: 1em;
        margin-right: .4em;
        border-radius: 50%;
        border: 2px solid #479acd;
        text-indent: .15em;
        line-height: 1;
        background: #fff;
    }
    .red{
        margin-top: 10px;
        color: #ff1c1f;
    }
    .centerTxt{
        text-align: center;
    }
    .bcBlack{

        background: #000;
    }
    .layout-content{

        height: auto;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        height: auto;
        padding: 10px;
    }
    .btn_ui{
        width: 98%;
        margin-left: 1%;
        margin-top: 30px;
    }
    #change{
        margin: auto;
        width: 300px;
    }
    #mainContent{
        position: absolute;

        _position:absolute;
    }
    .center {
        margin-top: 10px;
        width: 98%;
        margin-left: 1%;
    }
    .mt10{
        margin-top: 10px;
    }
</style>