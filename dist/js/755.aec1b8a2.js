"use strict";(self["webpackChunkshopping_list_2"]=self["webpackChunkshopping_list_2"]||[]).push([[755],{7755:function(e,t,i){i.r(t),i.d(t,{default:function(){return b}});var s=i(6768);const n={class:"container-content"};function o(e,t,i,o,a,p){const r=(0,s.g2)("aShoppingListDetailHeader"),c=(0,s.g2)("aShoppingListDetailContent");return(0,s.uX)(),(0,s.CE)(s.FK,null,[(0,s.bF)(r),(0,s.Lk)("div",n,[(0,s.bF)(c)])],64)}const a=e=>((0,s.Qi)("data-v-e6f9ded2"),e=e(),(0,s.jt)(),e),p=a((()=>(0,s.Lk)("h1",null,"Shopping list 2",-1)));function r(e,t,i,n,o,a){return(0,s.uX)(),(0,s.CE)("header",null,[p,(0,s.Lk)("button",{onClick:t[0]||(t[0]=(...e)=>a.redirectToHome&&a.redirectToHome(...e))},"Back")])}i(4114);var c={methods:{redirectToHome(){this.$router.push({name:"Shopping List - List"})}}},h=i(1241);const l=(0,h.A)(c,[["render",r],["__scopeId","data-v-e6f9ded2"]]);var d=l,u=i(5130),m=i(4232);const g={class:"shopping-list-data-detail"},k={class:"shopping-list-data-items"},v=["onUpdate:modelValue","onChange"];function L(e,t,i,n,o,a){return(0,s.uX)(),(0,s.CE)("div",g,[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(o.shoppingList?.items,(e=>((0,s.uX)(),(0,s.CE)("ul",{key:e.id},[(0,s.Lk)("li",k,[(0,s.bo)((0,s.Lk)("input",{"onUpdate:modelValue":t=>e.is_checked=t,onChange:t=>a.isChecked(e),type:"checkbox"},null,40,v),[[u.lH,e.is_checked]]),(0,s.Lk)("p",null,(0,m.v_)(e.name),1),(0,s.Lk)("p",null,(0,m.v_)(e.value),1),(0,s.Lk)("p",null,(0,m.v_)(e.unit),1)])])))),128)),(0,s.bo)((0,s.Lk)("input",{"onUpdate:modelValue":t[0]||(t[0]=e=>o.newItem=e),onKeydown:t[1]||(t[1]=(0,u.jR)(((...e)=>a.addNewItem&&a.addNewItem(...e)),["enter"])),type:"text",placeholder:"Enter your new item"},null,544),[[u.Jo,o.newItem]]),(0,s.Lk)("button",{class:"detail-btn",onClick:t[2]||(t[2]=(...e)=>a.removeItemDetail&&a.removeItemDetail(...e))},"Remove item")])}var w=i(8355),_={data(){return{shoppingList:null,newItem:""}},async mounted(){try{const{data:{data:e}}=await w.A.get("https://shoppinglist.wezeo.dev/cms/api/v1/shopping-lists");this.shoppingList=e.find((({id:e})=>e==this.$route.params.id))}catch(e){console.error("Error:",e),this.shoppingList={error:e}}},methods:{async addNewItem(){try{const e={name:this.newItem.trim(),unit:"piece",value:1,is_checked:!1};if(this.newItem.trim().length){const t=await w.A.post(`https://shoppinglist.wezeo.dev/cms/api/v1/shopping-lists/${this.$route.params.id}/items`,e),i=t.data.data;this.shoppingList.items.push(i),this.newItem=""}}catch(e){console.error("Error:",e)}},async isChecked(e){try{await w.A.put(`https://shoppinglist.wezeo.dev/cms/api/v1/shopping-lists/${this.$route.params.id}/items/${e.id}`,{is_checked:e.is_checked})}catch(t){console.error("Error:",t)}},async removeItemDetail(){try{const e=this.shoppingList.items.filter((e=>!0===e.is_checked));e.forEach((async e=>{await w.A.delete(`https://shoppinglist.wezeo.dev/cms/api/v1/shopping-lists/${this.$route.params.id}/items/${e.id}`),this.shoppingList.items=this.shoppingList.items.filter((e=>!e.is_checked))}))}catch(e){console.error("Error:",e)}}}};const f=(0,h.A)(_,[["render",L],["__scopeId","data-v-bc1fae90"]]);var C=f,I={components:{aShoppingListDetailHeader:d,aShoppingListDetailContent:C}};const y=(0,h.A)(I,[["render",o]]);var b=y}}]);
//# sourceMappingURL=755.aec1b8a2.js.map