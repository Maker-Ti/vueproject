<template>
    <div class="layout-content">
        <div class="layout-content-main">
           <div class="datepicker">
               <p style="width: auto " class="">选择起始日期：</p>
                   <DatePicker @on-change='handleChange1'  class="" style="width: 200px " placeholder="选择日期" :value="today"></DatePicker>
               <p style="width: auto" class="ml50">选择结束日期：</p>
                   <DatePicker @on-change='handleChange2' class="" style="width: 200px " placeholder="选择日期"  :value="today"></DatePicker>
               <i-button type="primary" @click="selectByData"  style="margin-left: 20px " class="" >
                   日期查询
               </i-button>
               <i-button type="primary" @click="selectAll"  class="ml50" >
                   查询所有
               </i-button>
           </div>
            <Table class="basicTable" stripe :columns="columns1" :data="listData" style="margin-top: 30px "></Table>

            <div class="pageBox">
                <Page class="basicPage" :total="total" @on-change="changePage" show-elevator prev-text="上一页" next-text="下一页" :current="selectIndex"/>
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
                columns1: [
                    {
                        title: "姓名",
                        key: "userName"
                    },
                    {
                        title: "学号",
                        key: "userNumber"
                    },
                    {
                        title: "体温是否>37.5℃",
                        key: "isTemAbove"
                    },
                    {
                        title: "是否身体异常",
                        key: "isAbnormal"
                    },
                    {
                        title: "填写时间",
                        key: "createTime"
                    }
                ],
                allData:[],
                listData: [],
                total:'',
                selectIndex :1,
                value:'',
                today:'',
                day1:'',
                day2:''
            }
        },

        methods:{
            changePage(index){

                this.selectIndex = index;
                this.changeSelectData()
            },
            changeSelectData(){
               this.listData = []
                var indexStart = (this.selectIndex-1)*10;
                var indexEnd = indexStart+10;
                for(var i=indexStart;i<indexEnd;i++){
                    if(i<this.total){
                        this.listData.push(this.allData[i])
                    }
                }
            },
            selectAll(){
                this.$http.get("http://localhost:8080/form/stuSelectForm?startTime=0&endTime=0&userNumber="+this.$route.params.userNumber).then(
                    response => {
                        if(response.body.code === 200){
                            this.allData = response.body.data;

                            this.total = response.body.total;
                            alert("查询数据："+response.body.total)
                            this.selectIndex =1;
                            this.changeSelectData();

                        }else {
                            alert("结果为0条")
                        }

                    },
                    response => {
                        alert('请求失败');
                        // eslint-disable-next-line no-console
                        console.log("test"+response)
                    },
                );
            },
            selectByData(){

                var start=this.day1;
                start = start.replace(/-/g,'/');
                var startDate = new Date(start+" 00:00:00");
                var startTime = startDate.getTime();


                var end=this.day2;
                end = end.replace(/-/g,'/');
                var endDate = new Date(end+" 23:59:59");
                var endTime = endDate.getTime();

                this.$http.get("http://localhost:8080/form/stuSelectForm?startTime="+startTime+"&endTime="+endTime+"&userNumber="+this.$route.params.userNumber).then(
                    response => {
                        if(response.body.code === 200){
                            this.allData = response.body.data;

                            this.total = response.body.total;
                            alert("查询数据："+response.body.total)
                            this.selectIndex =1;
                            this.changeSelectData();

                        }else {
                            alert("结果为0条")
                        }

                    },
                    response => {
                        alert('请求失败');
                        // eslint-disable-next-line no-console
                        console.log("test"+response)
                    },
                );
            },
            preLoad(){
                const myDate = new Date();
                const year = myDate.getFullYear(); // 获取当前年份
                const month = myDate.getMonth() + 1; // 获取当前月份(0-11,0代表1月所以要加1);
                const day = myDate.getDate(); // 获取当前日（1-31）
                // 日期格式：2019/07/29 - 2019/07/29
                this.today = `${year}/${month}/${day}`;
                this.day1 = this.today;
                this.day2 = this.today;
            },
            handleChange1(daterange){
                this.day1=daterange;//这样value的值就是日期
                this.dateCompare()
            },
            handleChange2(daterange){
                this.day2=daterange;//这样value的值就是日期
                this.dateCompare()
            },
            dateCompare(){
                var start=this.day1;
                start = start.replace(/-/g,'/');
                var startDate = new Date(start);
                var startTime = startDate.getTime();

                var end=this.day2;
                end = end.replace(/-/g,'/');
                var endDate = new Date(end);
                var endTime = endDate.getTime();

                if(startTime>endTime){
                    alert("结束时间不应大于开始时间")
                    return false;
                }else {
                    return true;
                }
            }

        }
    }
</script>

<style scoped>
    .pageBox{

        background: #ffffff;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        .basicPage.ivu-page{
            display: flex;
            a{
                font-size: 14px;
            }
            .ivu-page-item{
                margin-right: 10px;
                min-width: 30px;
                height: 30px;
                border-radius: 0;

            }
            .ivu-page-item-active{
                background: #427cff;
                a{
                    color: white;
                }
            }
            .ivu-page-options-elevator input{
                width: 32px;
                height: 32px;
                border-radius: 0;
                padding: 0;
                text-align: center;
            }
        }
        .carPage.ivu-page{
            display: flex;
            a{

                font-size: 14px;
            }

            .ivu-page-item{
                &:nth-child(2){margin-left: 20px;}

                margin-right: 20px;
                min-width: 30px;
                height: 30px;
                border-radius: 15px;
                border: none;
            }
            .ivu-page-item-active{
                background: #427cff;
                a{
                    color: white;
                }
            }

            .ivu-page-options-elevator input{
                width: 32px;
                height: 32px;
                border-radius: 0;
                padding: 0;
                text-align: center;
            }
        }
    }
    .ml50{
        margin-left: 50px;
    }
    .bcblcak{
        margin-left: 10px;
        background: #000;
    }
    .datepicker{
        display:flex;
        display:-webkit-flex;/*Safari*/
        justify-content: center;
        align-items:center;/*垂直对齐方式*/

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
       width: 200px;

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