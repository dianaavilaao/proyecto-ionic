"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[2375],{2375:(k,m,p)=>{p.r(m),p.d(m,{ion_accordion:()=>x,ion_accordion_group:()=>C});var h=p(467),s=p(9230),u=p(4920),b=p(3992),g=p(9275),v=p(4929);const x=class{constructor(r){var e=this;(0,s.r)(this,r),this.updateListener=()=>this.updateState(!1),this.setItemDefaults=()=>{const t=this.getSlottedHeaderIonItem();t&&(t.button=!0,t.detail=!1,void 0===t.lines&&(t.lines="full"))},this.getSlottedHeaderIonItem=()=>{const{headerEl:t}=this;if(!t)return;const o=t.querySelector("slot");return o&&void 0!==o.assignedElements?o.assignedElements().find(i=>"ION-ITEM"===i.tagName):void 0},this.setAria=(t=!1)=>{const o=this.getSlottedHeaderIonItem();if(!o)return;const n=(0,u.g)(o).querySelector("button");n&&n.setAttribute("aria-expanded",`${t}`)},this.slotToggleIcon=()=>{const t=this.getSlottedHeaderIonItem();if(!t)return;const{toggleIconSlot:o,toggleIcon:i}=this;if(t.querySelector(".ion-accordion-toggle-icon"))return;const a=document.createElement("ion-icon");a.slot=o,a.lazy=!1,a.classList.add("ion-accordion-toggle-icon"),a.icon=i,a.setAttribute("aria-hidden","true"),t.appendChild(a)},this.expandAccordion=(t=!1)=>{const{contentEl:o,contentElWrapper:i}=this;t||void 0===o||void 0===i?this.state=4:4!==this.state&&(void 0!==this.currentRaf&&cancelAnimationFrame(this.currentRaf),this.shouldAnimate()?(0,u.r)(()=>{this.state=8,this.currentRaf=(0,u.r)((0,h.A)(function*(){const n=i.offsetHeight,a=(0,u.t)(o,2e3);o.style.setProperty("max-height",`${n}px`),yield a,e.state=4,o.style.removeProperty("max-height")}))}):this.state=4)},this.collapseAccordion=(t=!1)=>{const{contentEl:o}=this;t||void 0===o?this.state=1:1!==this.state&&(void 0!==this.currentRaf&&cancelAnimationFrame(this.currentRaf),this.shouldAnimate()?this.currentRaf=(0,u.r)((0,h.A)(function*(){o.style.setProperty("max-height",`${o.offsetHeight}px`),(0,u.r)((0,h.A)(function*(){const n=(0,u.t)(o,2e3);e.state=2,yield n,e.state=1,o.style.removeProperty("max-height")}))})):this.state=1)},this.shouldAnimate=()=>!(typeof window>"u"||matchMedia("(prefers-reduced-motion: reduce)").matches||!g.c.get("animated",!0)||this.accordionGroupEl&&!this.accordionGroupEl.animated),this.updateState=(0,h.A)(function*(t=!1){const o=e.accordionGroupEl,i=e.value;if(!o)return;const n=o.value;if(Array.isArray(n)?n.includes(i):n===i)e.expandAccordion(t),e.isNext=e.isPrevious=!1;else{e.collapseAccordion(t);const l=e.getNextSibling(),c=null==l?void 0:l.value;void 0!==c&&(e.isPrevious=Array.isArray(n)?n.includes(c):n===c);const d=e.getPreviousSibling(),f=null==d?void 0:d.value;void 0!==f&&(e.isNext=Array.isArray(n)?n.includes(f):n===f)}}),this.getNextSibling=()=>{if(!this.el)return;const t=this.el.nextElementSibling;return"ION-ACCORDION"===(null==t?void 0:t.tagName)?t:void 0},this.getPreviousSibling=()=>{if(!this.el)return;const t=this.el.previousElementSibling;return"ION-ACCORDION"===(null==t?void 0:t.tagName)?t:void 0},this.state=1,this.isNext=!1,this.isPrevious=!1,this.value="ion-accordion-"+_++,this.disabled=!1,this.readonly=!1,this.toggleIcon=b.l,this.toggleIconSlot="end"}valueChanged(){this.updateState()}connectedCallback(){var r;const e=this.accordionGroupEl=null===(r=this.el)||void 0===r?void 0:r.closest("ion-accordion-group");e&&(this.updateState(!0),(0,u.a)(e,"ionValueChange",this.updateListener))}disconnectedCallback(){const r=this.accordionGroupEl;r&&(0,u.b)(r,"ionValueChange",this.updateListener)}componentDidLoad(){this.setItemDefaults(),this.slotToggleIcon(),(0,u.r)(()=>{this.setAria(4===this.state||8===this.state)})}toggleExpanded(){const{accordionGroupEl:r,disabled:e,readonly:t,value:o,state:i}=this;e||t||!r||r.requestAccordionToggle(o,1===i||2===i)}render(){const{disabled:r,readonly:e}=this,t=(0,g.b)(this),o=4===this.state||8===this.state,i=o?"header expanded":"header",n=o?"content expanded":"content";return this.setAria(o),(0,s.h)(s.f,{key:"073e1d02c18dcbc20c68648426e87c14750c031d",class:{[t]:!0,"accordion-expanding":8===this.state,"accordion-expanded":4===this.state,"accordion-collapsing":2===this.state,"accordion-collapsed":1===this.state,"accordion-next":this.isNext,"accordion-previous":this.isPrevious,"accordion-disabled":r,"accordion-readonly":e,"accordion-animated":this.shouldAnimate()}},(0,s.h)("div",{key:"9b4cf326de8bb6b4033992903c0c1bfd7eea9bcc",onClick:()=>this.toggleExpanded(),id:"header",part:i,"aria-controls":"content",ref:a=>this.headerEl=a},(0,s.h)("slot",{key:"464c32a37f64655eacf4218284214f5f30b14a1e",name:"header"})),(0,s.h)("div",{key:"8bb52e6a62d7de0106b253201a89a32e79d9a594",id:"content",part:n,role:"region","aria-labelledby":"header",ref:a=>this.contentEl=a},(0,s.h)("div",{key:"1d9dfd952ad493754aaeea7a8f625b33c2dd90a0",id:"content-wrapper",ref:a=>this.contentElWrapper=a},(0,s.h)("slot",{key:"970dfbc55a612d739d0ca3b7b1a08e5c96d0c479",name:"content"}))))}static get delegatesFocus(){return!0}get el(){return(0,s.i)(this)}static get watchers(){return{value:["valueChanged"]}}};let _=0;x.style={ios:":host{display:block;position:relative;width:100%;background-color:var(--ion-background-color, #ffffff);overflow:hidden;z-index:0}:host(.accordion-expanding) ::slotted(ion-item[slot=header]),:host(.accordion-expanded) ::slotted(ion-item[slot=header]){--border-width:0px}:host(.accordion-animated){-webkit-transition:all 300ms cubic-bezier(0.25, 0.8, 0.5, 1);transition:all 300ms cubic-bezier(0.25, 0.8, 0.5, 1)}:host(.accordion-animated) #content{-webkit-transition:max-height 300ms cubic-bezier(0.25, 0.8, 0.5, 1);transition:max-height 300ms cubic-bezier(0.25, 0.8, 0.5, 1)}#content{overflow:hidden;will-change:max-height}:host(.accordion-collapsing) #content{max-height:0 !important}:host(.accordion-collapsed) #content{display:none}:host(.accordion-expanding) #content{max-height:0}:host(.accordion-expanding) #content-wrapper{overflow:auto}:host(.accordion-disabled) #header,:host(.accordion-readonly) #header,:host(.accordion-disabled) #content,:host(.accordion-readonly) #content{pointer-events:none}:host(.accordion-disabled) #header,:host(.accordion-disabled) #content{opacity:0.4}@media (prefers-reduced-motion: reduce){:host,#content{-webkit-transition:none !important;transition:none !important}}:host(.accordion-next) ::slotted(ion-item[slot=header]){--border-width:0.55px 0px 0.55px 0px}",md:":host{display:block;position:relative;width:100%;background-color:var(--ion-background-color, #ffffff);overflow:hidden;z-index:0}:host(.accordion-expanding) ::slotted(ion-item[slot=header]),:host(.accordion-expanded) ::slotted(ion-item[slot=header]){--border-width:0px}:host(.accordion-animated){-webkit-transition:all 300ms cubic-bezier(0.25, 0.8, 0.5, 1);transition:all 300ms cubic-bezier(0.25, 0.8, 0.5, 1)}:host(.accordion-animated) #content{-webkit-transition:max-height 300ms cubic-bezier(0.25, 0.8, 0.5, 1);transition:max-height 300ms cubic-bezier(0.25, 0.8, 0.5, 1)}#content{overflow:hidden;will-change:max-height}:host(.accordion-collapsing) #content{max-height:0 !important}:host(.accordion-collapsed) #content{display:none}:host(.accordion-expanding) #content{max-height:0}:host(.accordion-expanding) #content-wrapper{overflow:auto}:host(.accordion-disabled) #header,:host(.accordion-readonly) #header,:host(.accordion-disabled) #content,:host(.accordion-readonly) #content{pointer-events:none}:host(.accordion-disabled) #header,:host(.accordion-disabled) #content{opacity:0.4}@media (prefers-reduced-motion: reduce){:host,#content{-webkit-transition:none !important;transition:none !important}}"};const C=(()=>{let r=class{constructor(e){(0,s.r)(this,e),this.ionChange=(0,s.d)(this,"ionChange",7),this.ionValueChange=(0,s.d)(this,"ionValueChange",7),this.animated=!0,this.multiple=void 0,this.value=void 0,this.disabled=!1,this.readonly=!1,this.expand="compact"}valueChanged(){const{value:e,multiple:t}=this;!t&&Array.isArray(e)&&(0,v.p)(`ion-accordion-group was passed an array of values, but multiple="false". This is incorrect usage and may result in unexpected behaviors. To dismiss this warning, pass a string to the "value" property when multiple="false".\n\n  Value Passed: [${e.map(o=>`'${o}'`).join(", ")}]\n`,this.el),this.ionValueChange.emit({value:this.value})}disabledChanged(){var e=this;return(0,h.A)(function*(){const{disabled:t}=e,o=yield e.getAccordions();for(const i of o)i.disabled=t})()}readonlyChanged(){var e=this;return(0,h.A)(function*(){const{readonly:t}=e,o=yield e.getAccordions();for(const i of o)i.readonly=t})()}onKeydown(e){var t=this;return(0,h.A)(function*(){const o=document.activeElement;if(!o||!o.closest('ion-accordion [slot="header"]'))return;const n="ION-ACCORDION"===o.tagName?o:o.closest("ion-accordion");if(!n||n.closest("ion-accordion-group")!==t.el)return;const l=yield t.getAccordions(),c=l.findIndex(f=>f===n);if(-1===c)return;let d;"ArrowDown"===e.key?d=t.findNextAccordion(l,c):"ArrowUp"===e.key?d=t.findPreviousAccordion(l,c):"Home"===e.key?d=l[0]:"End"===e.key&&(d=l[l.length-1]),void 0!==d&&d!==o&&d.focus()})()}componentDidLoad(){var e=this;return(0,h.A)(function*(){e.disabled&&e.disabledChanged(),e.readonly&&e.readonlyChanged(),e.valueChanged()})()}setValue(e){const t=this.value=e;this.ionChange.emit({value:t})}requestAccordionToggle(e,t){var o=this;return(0,h.A)(function*(){const{multiple:i,value:n,readonly:a,disabled:l}=o;if(!a&&!l)if(t)if(i){const c=null!=n?n:[],d=Array.isArray(c)?c:[c];void 0===d.find(w=>w===e)&&void 0!==e&&o.setValue([...d,e])}else o.setValue(e);else if(i){const c=null!=n?n:[],d=Array.isArray(c)?c:[c];o.setValue(d.filter(f=>f!==e))}else o.setValue(void 0)})()}findNextAccordion(e,t){const o=e[t+1];return void 0===o?e[0]:o}findPreviousAccordion(e,t){const o=e[t-1];return void 0===o?e[e.length-1]:o}getAccordions(){var e=this;return(0,h.A)(function*(){return Array.from(e.el.querySelectorAll(":scope > ion-accordion"))})()}render(){const{disabled:e,readonly:t,expand:o}=this,i=(0,g.b)(this);return(0,s.h)(s.f,{key:"82f3e77066fabb4736638ee4c487ad56efd39c63",class:{[i]:!0,"accordion-group-disabled":e,"accordion-group-readonly":t,[`accordion-group-expand-${o}`]:!0},role:"presentation"},(0,s.h)("slot",{key:"a3c791ea887fc640b512f81d429be465ae902b3d"}))}get el(){return(0,s.i)(this)}static get watchers(){return{value:["valueChanged"],disabled:["disabledChanged"],readonly:["readonlyChanged"]}}};return r.style={ios:":host{display:block}:host(.accordion-group-expand-inset){-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:16px;margin-bottom:16px}:host(.accordion-group-expand-inset) ::slotted(ion-accordion.accordion-expanding),:host(.accordion-group-expand-inset) ::slotted(ion-accordion.accordion-expanded){border-bottom:none}",md:":host{display:block}:host(.accordion-group-expand-inset){-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:16px;margin-bottom:16px}:host(.accordion-group-expand-inset) ::slotted(ion-accordion){-webkit-box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)}:host(.accordion-group-expand-inset) ::slotted(ion-accordion.accordion-expanding),:host(.accordion-group-expand-inset) ::slotted(ion-accordion.accordion-expanded){margin-left:0;margin-right:0;margin-top:16px;margin-bottom:16px;border-radius:6px}:host(.accordion-group-expand-inset) ::slotted(ion-accordion.accordion-previous){border-end-end-radius:6px;border-end-start-radius:6px}:host(.accordion-group-expand-inset) ::slotted(ion-accordion.accordion-next){border-start-start-radius:6px;border-start-end-radius:6px}:host(.accordion-group-expand-inset) ::slotted(ion-accordion):first-of-type{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}"},r})()}}]);