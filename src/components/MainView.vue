<style scoped>
  .layout{
    height: 100vh;
    background: #f5f7f9;
    position: relative;

    overflow: hidden;

  }
  .layout-breadcrumb{
    padding: 10px 15px 0;
  }
  .layout-content{
    min-height: 200px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }
  .layout-content-main{
    padding: 10px;
  }
  .layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #000;
  }
  .layout-menu-left{
    padding-top: 10px;
    height: 100vh;
    background: #464c5b;
  }
  .layout-header{
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .layout-logo-left{
    text-align: center;
    color: #fff;
    width: 90%;
    height: auto;
    padding: 5px;
    background: #5b6270;
    border-radius: 3px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 5%;
  }
  .layout-ceiling-main a{
    color: #9ba7b5;
  }
  .layout-hide-text .layout-text{
    display: none;
  }
  .ivu-col{
    transition: width .2s ease-in-out;
  }
  .btn_ui{
    width: 90%;
    margin-top: 10px;
    text-align: center;
    color: #fff;
    margin-left: 5%;
  }
  .padiing-5{
    padding-top: 1px;
  }
</style>

<template>

  <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
    <Row type="flex">
      <i-col :span="spanLeft" class="layout-menu-left" @click="toggleClick">
        <div class="layout-logo-left"><p>{{main_title}}</p></div>
        <Menu active-key="1" theme="dark" width="auto" @on-select="itemClick" active-name="1">

          <Menu-item key="1" name="1">
           <Icon type="ios-map" :size="iconSize" ></Icon>
              <span class="layout-text">体温日报</span>

          </Menu-item>
          <Menu-item key="2"  name="2">
           <Icon type="ios-calendar" :size="iconSize"></Icon>
              <span class="layout-text">报表查询</span>

          </Menu-item>
          <Menu-item key="3"  name="3">
            <Icon type="ios-hammer" :size="iconSize"></Icon>
              <span class="layout-text">更改密码</span>

          </Menu-item>

        </Menu>
        <i-button type="primary" @click="toggleClick"  class="btn_ui" >
          {{click_btn_text}}
        </i-button>
      </i-col>
      <i-col :span="spanRight">

        <div class="layout-breadcrumb">
          <Breadcrumb>

            <Breadcrumb-item>{{content_title}}</Breadcrumb-item>

          </Breadcrumb>
        </div>

        <router-view></router-view>
      </i-col>
    </Row>
  </div>
</template>
<script>
  export default {
    created:function(){
      this.$router.push({name:'stu_upload', params: { userName:this.$route.params.userName ,
          userNumber:this.$route.params.userNumber,
          userId:this.$route.params.userId,
          userPwd:this.$route.params.userPwd}});
    },
    data () {
      return {
        spanLeft: 5,
        spanRight: 19,
        click_btn_text:"隐藏",
        content_title:"体温日报",
        main_title:"体温申报系统-"+this.$route.params.userName,
        user_password:this.$route.params.userPwd,
        user_id:this.$route.params.userId,
        user_number:this.$route.params.userNumber
      }
    },
    computed: {
      iconSize () {
        return this.spanLeft === 5 ? 14 : 24;
      }
    },
    methods: {

      toggleClick () {

        if (this.spanLeft === 5) {
          this.spanLeft = 1;
          this.main_title = this.$route.params.userName;
          this.spanRight = 23;
          this.click_btn_text = "展开";
        } else {
          this.main_title = "体温申报系统-"+this.$route.params.userName;
          this.click_btn_text = "隐藏";
          this.spanLeft = 5;
          this.spanRight = 19;
        }
      },

      itemClick: function(name){
        switch (name) {
          case '1':this.content_title="体温日报";
            this.$router.push({name:'stu_upload', params: { userName:this.$route.params.userName ,
                userNumber:this.$route.params.userNumber,
                userId:this.$route.params.userId,
                userPwd:this.$route.params.userPwd}});
            break;

          case '2':this.content_title="报表查询";
            this.$router.push({name:'stu_select', params: { userName:this.$route.params.userName ,
                userNumber:this.$route.params.userNumber,
                userId:this.$route.params.userId,
                userPwd:this.$route.params.userPwd}});break;

          case '3':this.content_title="更改密码";
            this.$router.push({name:'stu_changepwd', params: { userName:this.$route.params.userName ,
                userNumber:this.$route.params.userNumber,
                userId:this.$route.params.userId,
                userPwd:this.$route.params.userPwd}});break;
        }
      }
    }
  }
</script>
