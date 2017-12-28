Vue.directive('focus',{
    inserted:function (val) {
        val.focus();
    }
})
new Vue({
    el:"#app",
    data:{
        all:localStorage.todo?JSON.parse(localStorage.todo):[],
        con:'',
        status:"all",
    },
    methods:{
        add(){
            if(!this.con){
                alert("没有数据");
                return;
            }
            var obj={};
            obj.title=this.con;
            obj.id=Math.random()+new Date().getTime();
            obj.edit=true;
            obj.state=0;//0未完成  1完成
            this.all.push(obj);
            this.con='';
            localStorage.todo=JSON.stringify(this.all)
        },
        changeStatus(val){
            this.status=val;
        },
        changestate(obj){
            if(obj.state==0){
                obj.state=1;
            }else{
                obj.state=0;
            }
            localStorage.todo=JSON.stringify(this.all);
        },
        del(id){
            this.all=this.all.filter((ele)=>{
                if(ele.id!=id){
                    return ele;
                }
            })
            localStorage.todo=JSON.stringify(this.all);
        },
        edit(obj){
            obj.edit=false;
            localStorage.todo=JSON.stringify(this.all);
        },
        blur(obj){
            obj.edit=true;
            localStorage.todo=JSON.stringify(this.all);
        }
    },
    computed:{
        datas(){
            return this.all.filter((a)=>{
                if(this.status=="all"){
                    return a;
                }else{
                    if(a.state==this.status){
                        return a;
                    }

                }
            })
        }
    }

})