(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{346:function(t,e,r){"use strict";r.d(e,"a",(function(){return c}));var n=r(369),o=r(508),c=Object(n.a)({apiKey:"AIzaSyDQQrO3S7Y-PNPV2tqj2AykP5kkQVmDVFs",authDomain:"mindbloom-1.firebaseapp.com",projectId:"mindbloom-1",storageBucket:"mindbloom-1.appspot.com",messagingSenderId:"106288622860",appId:"1:106288622860:web:209789aa765063eed16d29",measurementId:"G-3L862CDKHF"});Object(o.a)(c)},351:function(t,e,r){"use strict";var n=r(3),o=r(242);n({target:"String",proto:!0,forced:r(243)("fixed")},{fixed:function(){return o(this,"tt","","")}})},352:function(t,e,r){"use strict";var n=r(3),o=r(356),c=r(38),l=r(47),d=r(68),f=r(145);n({target:"Array",proto:!0},{flat:function(){var t=arguments.length?arguments[0]:void 0,e=c(this),r=l(e),n=f(e,0);return n.length=o(n,e,e,r,0,void 0===t?1:d(t)),n}})},353:function(t,e,r){r(115)("flat")},356:function(t,e,r){"use strict";var n=r(95),o=r(47),c=r(176),l=r(75),d=function(t,e,source,r,f,m,v,h){for(var element,_,O=f,w=0,j=!!v&&l(v,h);w<r;)w in source&&(element=j?j(source[w],w,e):source[w],m>0&&n(element)?(_=o(element),O=d(t,e,element,_,O,m-1)-1):(c(O+1),t[O]=element),O++),w++;return O};t.exports=d},359:function(t,e,r){"use strict";r.r(e);var n=r(687),o=r(688),c=r(690),l=r(525),d=r(754),f=r(615),m=r(589),v=r(581),h=r(575),_=r(546),O=r(574),w=r(576),j=r(341),k=r(338),P=r(753),y=r(689),x=r(514),D=(r(34),r(27),r(36),r(10),r(43),r(28),r(44),r(24)),S=r(18),C=(r(94),r(25),r(46),r(363)),H=r(350),I=r(346),B=r(93);function F(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function A(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?F(Object(source),!0).forEach((function(e){Object(S.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):F(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var L=Object(H.f)(I.a),M=Object(C.b)(I.a),V={name:"DefaultLayout",methods:A(A({},Object(B.b)("permaData",["setHomePageSelector","setUserData"])),{},{goBack:function(){this.$router.go(-1)},logoutFirebase:function(){var t=this;return Object(D.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(H.l)(Object(H.c)(L,"user",t.userData.uid),{notificationId:"NONE"});case 2:return e.next=4,Object(C.e)(M);case 4:t.setUserData({}),t.$router.replace("/main-screen");case 6:case"end":return e.stop()}}),e)})))()}}),computed:A(A({},Object(B.c)("permaData",["navbarConfig","homePageSelector","userData"])),{},{hideFromPages:function(){var t;return null===(t=this.navbarConfig)||void 0===t?void 0:t.hideBottomNav},currentHomePage:{get:function(){return this.homePageSelector},set:function(t){return this.setHomePageSelector(t)}}}),data:function(){return{selectedMenu:0,clipped:!1,drawer:!1,fixed:!1,items:[{icon:"mdi-apps",title:"Home",to:"/home-screen"},{icon:"mdi-chart-bubble",title:"Settings",to:"/settings"}],miniVariant:!1,right:!0,rightDrawer:!1,title:"Let's Get Started"}}},N=r(76),component=Object(N.a)(V,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"app"},[e(P.a,{attrs:{"mini-variant":t.miniVariant,clipped:t.clipped,fixed:"",app:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[e(h.a,[e(_.a,[e(w.a,{staticClass:"mt-10 mb-0"},[e(v.a,{attrs:{src:"https://api.dicebear.com/6.x/fun-emoji/svg?seed=".concat(t.userData.uid,"&mouth=cute,wideSmile,faceMask,kissHeart,lilSmile,plain,smileLol,smileTeeth&eyes=closed,cute,love,plain,shades,stars,wink,wink2")}})],1)],1),t._v(" "),e(_.a,{attrs:{link:""}},[e(j.a,[e(j.c,{staticClass:"text-h6"},[t._v("\n            "+t._s(t.userData.first_name)+"\n          ")]),t._v(" "),e(j.b,[t._v(t._s(t.userData.email))])],1)],1)],1),t._v(" "),e(f.a),t._v(" "),e(h.a,[t._l(t.items,(function(r,i){return e(_.a,{key:i,attrs:{to:r.to,router:"",exact:""}},[e(O.a,[e(m.a,[t._v(t._s(r.icon))])],1),t._v(" "),e(j.a,[e(j.c,{domProps:{textContent:t._s(r.title)}})],1)],1)})),t._v(" "),e(_.a,{attrs:{href:"#!",router:"",exact:""},on:{click:function(e){return t.logoutFirebase()}}},[e(O.a,[e(m.a,[t._v("mdi-logout")])],1),t._v(" "),e(j.a,[e(j.c,{domProps:{textContent:t._s("Logout")}})],1)],1)],2)],1),t._v(" "),e(n.a,{attrs:{"elevate-on-scroll":"",color:t.navbarConfig.plain?"white":"primary",dark:!t.navbarConfig.plain,"clipped-left":t.clipped,fixed:"",app:""}},[t.navbarConfig.goBack?e(l.a,{attrs:{icon:""},on:{click:function(e){return t.goBack()}}},[e(m.a,[t._v("mdi-arrow-left")])],1):e(o.a,{on:{click:function(e){e.stopPropagation(),t.drawer=!t.drawer}}}),t._v(" "),e(x.a,{domProps:{textContent:t._s(t.navbarConfig.title||"MindBloom")}}),t._v(" "),e(y.a)],1),t._v(" "),e(k.a,{staticClass:"py-0"},[e(d.a,[t._t("default")],2)],1),t._v(" "),t.hideFromPages?t._e():e(c.a,{attrs:{app:"","background-color":"white",height:"60",shift:"",grow:"",color:"primary"},model:{value:t.currentHomePage,callback:function(e){t.currentHomePage=e},expression:"currentHomePage"}},[e(l.a,{attrs:{value:"0"}},[e("span",[t._v("Home")]),t._v(" "),e(m.a,[t._v("mdi-home")])],1),t._v(" "),e(l.a,{attrs:{value:"1"}},[e("span",[t._v("History")]),t._v(" "),e(m.a,[t._v("mdi-chart-timeline-variant")])],1),t._v(" "),e(l.a,{attrs:{value:"2"}},[e("span",[t._v("Medical")]),t._v(" "),e(m.a,[t._v("mdi-medical-bag")])],1),t._v(" "),e(l.a,{attrs:{value:"3"}},[e("span",[t._v("My Profile")]),t._v(" "),e(m.a,[t._v("mdi-account")])],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports},360:function(t,e,r){"use strict";var n=r(3),o=r(96).findIndex,c=r(115),l="findIndex",d=!0;l in[]&&Array(1)[l]((function(){d=!1})),n({target:"Array",proto:!0,forced:d},{findIndex:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),c(l)},370:function(t,e,r){"use strict";var n=r(3),o=r(242);n({target:"String",proto:!0,forced:r(243)("small")},{small:function(){return o(this,"small","","")}})},510:function(t,e,r){"use strict";var n=r(3),o=r(242);n({target:"String",proto:!0,forced:r(243)("link")},{link:function(t){return o(this,"a","href",t)}})}}]);