"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[5075],{5075:(k,g,a)=>{a.r(g),a.d(g,{HomePageModule:()=>b});var p=a(177),r=a(791),f=a(4341),u=a(70),d=a(467),t=a(3953),v=a(3656),h=a(3067);const j=["carrito"],P=[{path:"",component:(()=>{var n;class c{constructor(e,o,i,s,m){this.navCtrl=e,this.route=o,this.animationController=i,this.loginService=s,this.animationCtrl=m,this.viajeEnCurso=null,this.carritoVisible=!1}ngOnInit(){var e=this;return(0,d.A)(function*(){e.route.queryParams.subscribe(function(){var o=(0,d.A)(function*(i){e.name=i.name;const s=i.viajeEnCurso;if(s){var m;const F=yield e.loginService.obtenerServicios();e.viajeEnCurso=F.find(M=>M.id===+s)||null,null!==(m=e.viajeEnCurso)&&void 0!==m&&m.enCurso&&e.activarCarrito()}});return function(i){return o.apply(this,arguments)}}())})()}volver(){this.navCtrl.back()}goToOfferServices(){this.navCtrl.navigateForward("/offer-services")}goToSearchServices(){this.navCtrl.navigateForward("/search-services")}goToProfile(){this.navCtrl.navigateForward("/profile")}goToUserAccept(){this.navCtrl.navigateForward("/user-accept")}activarCarrito(){this.carritoVisible=!0,this.carritoElement.nativeElement.style.display="block",this.iniciarAnimacionViaje()}iniciarAnimacionViaje(){const e=this.carritoElement.nativeElement,o=window.innerWidth;this.animationCtrl.create().addElement(e).duration(3e3).iterations(1/0).keyframes([{transform:`translateX(-${o}px)`,offset:0},{transform:`translateX(${o}px)`,offset:1}]).play()}}return(n=c).\u0275fac=function(e){return new(e||n)(t.rXU(v.q9),t.rXU(u.nX),t.rXU(r.Hx),t.rXU(h.H),t.rXU(r.Hx))},n.\u0275cmp=t.VBU({type:n,selectors:[["app-home"]],viewQuery:function(e,o){if(1&e&&t.GBs(j,5),2&e){let i;t.mGM(i=t.lsd())&&(o.carritoElement=i.first)}},decls:42,vars:3,consts:[["carrito",""],["slot","start"],[3,"click"],["name","arrow-back-outline"],["slot","end"],["name","person-outline"],[1,"carrito",2,"display","none"],["alt","Carrito","src","assets/icon/carrito.png"],[1,"mensaje"],["expand","block",1,"ion-padding",3,"click"],[2,"font-weight","bold"],[1,"card-ofrece"],["alt","Modo ofrece viajes","src","assets/images/modo-ofrece-viajes.png"],["expand","block",3,"click"],[1,"card-busca"],["alt","Modo busca transporte","src","assets/images/modo-busca-transporte.png"]],template:function(e,o){if(1&e){const i=t.RV6();t.j41(0,"ion-header")(1,"ion-toolbar")(2,"ion-buttons",1)(3,"ion-button",2),t.bIt("click",function(){return t.eBV(i),t.Njj(o.volver())}),t.nrm(4,"ion-icon",3),t.k0s()(),t.j41(5,"ion-buttons",4)(6,"ion-button",2),t.bIt("click",function(){return t.eBV(i),t.Njj(o.goToProfile())}),t.nrm(7,"ion-icon",5),t.k0s()(),t.j41(8,"ion-title"),t.EFF(9),t.k0s()(),t.j41(10,"div",6,0),t.nrm(12,"br")(13,"br")(14,"img",7),t.j41(15,"span",8),t.EFF(16,"Tu viaje est\xe1 en curso"),t.k0s(),t.nrm(17,"br")(18,"br"),t.k0s()(),t.j41(19,"ion-content")(20,"ion-button",9),t.bIt("click",function(){return t.eBV(i),t.Njj(o.goToUserAccept())}),t.EFF(21," Tus viajes"),t.k0s(),t.j41(22,"h3",10),t.EFF(23," Elige tu modo "),t.k0s(),t.j41(24,"ion-card",11),t.nrm(25,"img",12),t.j41(26,"ion-card-header")(27,"ion-card-title"),t.EFF(28,"Ofrece viajes"),t.k0s()(),t.j41(29,"ion-card-content"),t.EFF(30," Este modo te permitir\xe1 ofrecer viajes a otros estudiantes del Duoc y ganar dinero. "),t.j41(31,"ion-button",13),t.bIt("click",function(){return t.eBV(i),t.Njj(o.goToOfferServices())}),t.EFF(32,"Ir"),t.k0s()()(),t.j41(33,"ion-card",14),t.nrm(34,"img",15),t.j41(35,"ion-card-header")(36,"ion-card-title"),t.EFF(37,"Busca transporte"),t.k0s()(),t.j41(38,"ion-card-content"),t.EFF(39," Este modo te permitir\xe1 buscar transporte proporcionado por otros estudiantes del Duoc. "),t.j41(40,"ion-button",13),t.bIt("click",function(){return t.eBV(i),t.Njj(o.goToSearchServices())}),t.EFF(41,"Ir"),t.k0s()()()()}2&e&&(t.R7$(9),t.SpI("Bienvenide ",o.name,"!"),t.R7$(11),t.AVh("con-carrito",o.carritoVisible))},dependencies:[r.Jm,r.QW,r.b_,r.I9,r.ME,r.tN,r.W9,r.eU,r.iq,r.BC,r.ai],styles:['@charset "UTF-8";#container[_ngcontent-%COMP%]{text-align:center;position:absolute;left:0;right:0;top:50%;transform:translateY(-50%)}#container[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{font-size:20px;line-height:26px}#container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:16px;line-height:22px;color:#8c8c8c;margin:0}#container[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none}.carrito[_ngcontent-%COMP%]{position:absolute;top:50%;left:10px;transform:translateY(-50%)}@keyframes _ngcontent-%COMP%_moverCarrito{0%{left:-100px}to{left:100%}}.con-carrito[_ngcontent-%COMP%]{margin-top:50px}.carrito[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-right:10px;position:relative;top:10px}.carrito[_ngcontent-%COMP%]   .mensaje[_ngcontent-%COMP%]{font-size:20px;color:#333;white-space:nowrap;position:relative;top:-10px}']}),c})()}];let C=(()=>{var n;class c{}return(n=c).\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.$C({type:n}),n.\u0275inj=t.G2t({imports:[u.iI.forChild(P),u.iI]}),c})(),b=(()=>{var n;class c{}return(n=c).\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.$C({type:n}),n.\u0275inj=t.G2t({imports:[p.MD,f.YN,r.bv,C]}),c})()}}]);