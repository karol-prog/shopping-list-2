"use strict";(self["webpackChunkshopping_list_2"]=self["webpackChunkshopping_list_2"]||[]).push([[249],{5249:function(t,i,s){s.r(i),s.d(i,{default:function(){return $}});var n=s(6768);const e={class:"container-content"};function o(t,i,s,o,l,p){const a=(0,n.g2)("aShoppingListsHeader"),r=(0,n.g2)("aShoppingListsContent");return(0,n.uX)(),(0,n.CE)(n.FK,null,[(0,n.bF)(a),(0,n.Lk)("div",e,[(0,n.bF)(r)])],64)}const l=t=>((0,n.Qi)("data-v-02604816"),t=t(),(0,n.jt)(),t),p=l((()=>(0,n.Lk)("h1",null,"Shopping list 2",-1))),a=[p];function r(t,i){return(0,n.uX)(),(0,n.CE)("header",null,a)}var u=s(1241);const h={},d=(0,u.A)(h,[["render",r],["__scopeId","data-v-02604816"]]);var c=d,L=s(5130),g=s(4232);const v=t=>((0,n.Qi)("data-v-7ca528bb"),t=t(),(0,n.jt)(),t),k={class:"shopping-list-data"},m=v((()=>(0,n.Lk)("h2",null,"Your Shopping List",-1))),C=["href","onClick"],w=["onClick"],E={key:0},_=v((()=>(0,n.Lk)("p",null,"Loading Data",-1))),f=[_],y={key:1},b={key:2,class:"list-item"};function S(t,i,s,e,o,l){return(0,n.uX)(),(0,n.CE)("div",k,[(0,n.Lk)("ul",null,[m,(0,n.Lk)("form",{onSubmit:i[1]||(i[1]=(0,L.D$)(((...t)=>l.addNewList&&l.addNewList(...t)),["prevent"]))},[(0,n.bo)((0,n.Lk)("input",{type:"text",placeholder:"Enter new list","onUpdate:modelValue":i[0]||(i[0]=t=>o.newListTitle=t)},null,512),[[L.Jo,o.newListTitle]])],32),((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(o.shoppingLists,(t=>((0,n.uX)(),(0,n.CE)("li",{class:"shopping-list-data-lists",key:t.id},[(0,n.Lk)("a",{href:`/shopping-lists/${t.id}`,onClick:(0,L.D$)((i=>l.openShoppingListDetail(t)),["prevent"])},(0,g.v_)(t.title),9,C),(0,n.Lk)("button",{onClick:i=>l.removeItem(t.id)},"Remove",8,w),o.shoppingLists?o.shoppingLists.error?((0,n.uX)(),(0,n.CE)("div",y,[(0,n.Lk)("p",null,"Error while loading data: "+(0,g.v_)(o.shoppingLists.error),1)])):((0,n.uX)(),(0,n.CE)("div",b,[(0,n.Lk)("ul",null,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(t.items.slice(0,3),(t=>((0,n.uX)(),(0,n.CE)("li",{class:"shopping-list-data-items",key:t.id},[(0,n.Lk)("p",null,(0,g.v_)(t.name),1),(0,n.Lk)("p",null,(0,g.v_)(t.value),1),(0,n.Lk)("p",null,(0,g.v_)(t.unit),1)])))),128))])])):((0,n.uX)(),(0,n.CE)("div",E,f))])))),128))])])}s(4114);var X=s(8355),A={data(){return{shoppingLists:null,newListTitle:""}},async mounted(){try{const{data:{data:t}}=await X.A.get("/api/v1/shopping-lists");this.shoppingLists=t}catch(t){console.error("Error",t),this.shoppingLists={err:t}}},methods:{async removeItem(t){try{await X.A.delete(`/api/v1/shopping-lists/${t}`),this.shoppingLists=this.shoppingLists.filter((t=>{t.id}))}catch(i){console.error("Error:",i)}},async addNewList(){try{await X.A.post("/api/v1/shopping-lists",{title:this.newListTitle,items:[]}),this.newListTitle=""}catch(t){console.log("Error:",t)}},openShoppingListDetail({id:t}){this.$router.push({name:"Shopping List - Detail",params:{id:t}})}}};const D=(0,u.A)(A,[["render",S],["__scopeId","data-v-7ca528bb"]]);var I=D,F={components:{aShoppingListsHeader:c,aShoppingListsContent:I}};const T=(0,u.A)(F,[["render",o]]);var $=T}}]);
//# sourceMappingURL=249.1b98fac7.js.map