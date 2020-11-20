<template>
    <div class="content">

        <div class="alpha_50">
            <h1>苏州科技大学 - 体温上报系统</h1>
        </div>
        <div class="login_content">

            <div id="login">
                    <i-input v-model="userNumber" placeholder="账号" style="width: 300px" class="mt10" ></i-input>
                    <i-input v-model="name" placeholder="姓名" style="width: 300px" class="mt10"></i-input>
                    <i-input v-model="password" placeholder="密码"  type="password"  class="mt10"></i-input>
                <div class="s-canvas hor mt10">
                    <canvas id="s-canvas" :width="contentWidth" :height="contentHeight" class="" @click="randomCode()"></canvas>
                    <i-input v-model="code" placeholder="验证码" style="width: 100px" class="ml20"  ></i-input>
                </div>
                    <button class="but"  @click="login()">登录</button>
            </div>
        </div>
    </div>

</template>

<script>

    export default {
        props: {
            identifyCode: {

                default: "1234"
            },
            fontSizeMin: {
                type: Number,
                default: 35
            },
            fontSizeMax: {
                type: Number,
                default: 35
            },
            backgroundColorMin: {
                type: Number,
                default: 180
            },
            backgroundColorMax: {
                type: Number,
                default: 240
            },
            colorMin: {
                type: Number,
                default: 50
            },
            colorMax: {
                type: Number,
                default: 160
            },
            lineColorMin: {
                type: Number,
                default: 100
            },
            lineColorMax: {
                type: Number,
                default: 200
            },
            dotColorMin: {
                type: Number,
                default: 0
            },
            dotColorMax: {
                type: Number,
                default: 255
            },
            contentWidth: {
                type: Number,
                default: 120
            },
            contentHeight: {
                type: Number,
                default: 30
            }
        },
        name: "Login",
         created:function(){

        },

        data () {
            return {
                userNumber:'9527',
                name:"admin",
                password:"111",
                code:'',
            }
        },
        watch: {
            identifyCode() {
                this.drawPic();
            }
        },
        mounted() {

            this.randomCode()
        },
        methods: {

            randomCode(){
                var options = (Math.floor(Math.random()*10000)).toString();

                this.identifyCode = options;
            },
            // 鐢熸垚涓€涓殢鏈烘暟
            randomNum(min, max) {
                return Math.floor(Math.random() * (max - min) + min);
            },
            // 鐢熸垚涓€涓殢鏈虹殑棰滆壊
            randomColor(min, max) {
                let r = this.randomNum(min, max);
                let g = this.randomNum(min, max);
                let b = this.randomNum(min, max);
                return "rgb(" + r + "," + g + "," + b + ")";
            },
            transparent() {
                return "rgb(255,255,255)";
            },
            drawPic() {


                let canvas = document.getElementById("s-canvas");
                let ctx = canvas.getContext("2d");
                ctx.textBaseline = "bottom";
                // 缁樺埗鑳屾櫙
                ctx.fillStyle = this.randomColor(
                    this.backgroundColorMin,
                    this.backgroundColorMax
                );
                ctx.fillStyle = this.transparent();
                ctx.fillRect(0, 0, this.contentWidth, this.contentHeight);
                // 缁樺埗鏂囧瓧
                for (let i = 0; i < this.identifyCode.length; i++) {
                    this.drawText(ctx, this.identifyCode[i], i);
                }
                this.drawLine(ctx)
                this.drawDot(ctx)
            },
            drawText(ctx, txt, i) {
                ctx.fillStyle = this.randomColor(this.colorMin, this.colorMax);
                ctx.font =
                    this.randomNum(this.fontSizeMin, this.fontSizeMax) + "px SimHei";
                let x = (i + 1) * (this.contentWidth / (this.identifyCode.length + 1));
                let y = this.randomNum(this.fontSizeMax, this.contentHeight - 5);
                var deg = this.randomNum(-10, 10);
                // 淇敼鍧愭爣鍘熺偣鍜屾棆杞搴�
                ctx.translate(x, y);
                ctx.rotate((deg * Math.PI) / 180);
                ctx.fillText(txt, 0, 0);
                // 鎭㈠鍧愭爣鍘熺偣鍜屾棆杞搴�
                ctx.rotate((-deg * Math.PI) / 180);
                ctx.translate(-x, -y);
            },
            drawLine(ctx) {
                // 缁樺埗骞叉壈绾�
                for (let i = 0; i < 8; i++) {
                    ctx.strokeStyle = this.randomColor(
                        this.lineColorMin,
                        this.lineColorMax
                    );
                    ctx.beginPath();
                    ctx.moveTo(
                        this.randomNum(0, this.contentWidth),
                        this.randomNum(0, this.contentHeight)
                    );
                    ctx.lineTo(
                        this.randomNum(0, this.contentWidth),
                        this.randomNum(0, this.contentHeight)
                    );
                    ctx.stroke();
                }
            },
            drawDot(ctx) {
                // 缁樺埗骞叉壈鐐�
                for (let i = 0; i < 100; i++) {
                    ctx.fillStyle = this.randomColor(0, 255);
                    ctx.beginPath();
                    ctx.arc(
                        this.randomNum(0, this.contentWidth),
                        this.randomNum(0, this.contentHeight),
                        1,
                        0,
                        2 * Math.PI
                    );
                    ctx.fill();
                }
            },
            login() {
                if(this.code === ''){
                    alert("请输入验证码")
                }else if(this.code !== this.identifyCode){
                    alert("验证码判断错误")
                }else{
                    this.$http.get("http://127.0.0.1:8080/user/getUser?"+"name="+encodeURI(this.name)+"&password="+this.password+"&userNumber="+this.userNumber).then(
                        response => {
                            if(response.body.code === 200){

                                // eslint-disable-next-line no-console
                                if(response.body.type === 1){
                                    this.$router.push({name:'main_stu', params: { userName: response.body.data.name ,userNumber:response.body.data.userNumber,userId:response.body.data.id,userPwd:response.body.data.password}});
                                }else {
                                    this.$router.push({name:'main_tea', params: { userName: response.body.data.name ,userNumber:response.body.data.userNumber,userId:response.body.data.id,userPwd:response.body.data.password}});

                                }

                            }else {
                                alert("登录校验失败")
                            }

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
</script>

<style scoped>
    .ml20{
        margin-left: 20px;
    }
    .hor{
        display:flex;
        display:-webkit-flex;/*Safari*/
        justify-content: center;
        align-items:center;/*垂直对齐方式*/

    }
    h1{
        margin-top: 150px;
        margin-left: 100px;

        color: #fff;
    }
    .alpha_50{

        padding-left: 200px;
        padding-top: 70px;
        background: rgba(108, 108, 108, 0.86);
        height: 230px;
        width: 99%;
        position: absolute;
        bottom:0;
        _position:absolute;
        margin-left: 0.5%;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }
    .login_content{

        padding-right: 20px;
        float:right;
        width: 99%;
        position: absolute;
        bottom:0;
        _position:absolute;
        margin-left: 0.5%;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }
    .mt10{
        margin-top: 10px;
    }
    .content{

        position: absolute;
        background: url("../assets/login_mainbc.jpeg") no-repeat center 50%;
        background-size: 100%  100%;
        width: 100%;
        height: 100%;
    }
    #login{
        float:right;
        width: 300px;
        height: auto;
    }
    #login h1{
        color: #fff;
        text-shadow:0 0 10px;
        letter-spacing: 1px;
        text-align: center;
    }
    h1{
        font-size: 2em;
        margin: 0.67em 0;
    }
    input{
        width: 278px;
        height: 18px;
        margin-bottom: 10px;
        outline: none;
        padding: 10px;
        font-size: 13px;
        color: #fff;

        border-radius: 4px;
        background-color: #2D2D3F;
    }
    .but{
        margin-bottom: 10px;
        width: 300px;
        min-height: 20px;
        display: block;
        background-color: #4a77d4;
        border: 1px solid #3762bc;
        color: #fff;
        padding: 9px 14px;
        font-size: 15px;
        line-height: normal;
        border-radius: 5px;
        margin-top: 10px;
    }
</style>