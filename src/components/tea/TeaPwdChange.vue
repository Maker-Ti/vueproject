<template>
    <div class="layout-content">
        <div class="layout-content-main">
            <div id="change">
                <i-input v-model="userPwd" placeholder="原密码" class="center" type="password">{{this.user_number}}</i-input>
                <i-input v-model="passwordInput1" placeholder="新密码" class="center" type="password"></i-input>
                <i-input v-model="passwordInput2" placeholder="确认密码"  type="password"  class="center"></i-input>
                <i-button type="primary" @click="changePwdClick"  class="btn_ui" >
                    确定
                </i-button>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        data(){
            return {
                userPwd:'',
                passwordInput1:'',
                passwordInput2:''
            }
        },
        name: "PwdChange",
        methods:{
            changePwdClick(){


                if(this.userPwd === this.$route.params.userPwd&&this.passwordInput2 === this.passwordInput1){
                    this.$http.get("http://localhost:8080/user/updatePassword?id="+this.$route.params.userId+"&password="+this.passwordInput2).then(
                        response => {
                            if(response.body.code === 200){
                                alert("更改密码成功");
                                this.userPwd = '';
                                this.passwordInput2 = '';
                                this.passwordInput1 = '';
                            }else {
                                alert("更改密码失败")
                            }

                        },
                        response => {
                            alert('请求失败');
                            // eslint-disable-next-line no-console
                            console.log("test"+response)
                        },
                    );
                }else {
                    alert("原密码错误或两次输入不一致")
                }

            }
        }
    }
</script>

<style scoped>
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