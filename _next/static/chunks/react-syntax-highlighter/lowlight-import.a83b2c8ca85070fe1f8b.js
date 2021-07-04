(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7764],{21102:function(e,t,n){"use strict";var r=n(46291),i=a(Error);function a(e){return t.displayName=e.displayName||e.name,t;function t(t){return t&&(t=r.apply(null,arguments)),new e(t)}}e.exports=i,i.eval=a(EvalError),i.range=a(RangeError),i.reference=a(ReferenceError),i.syntax=a(SyntaxError),i.type=a(TypeError),i.uri=a(URIError),i.create=a},46291:function(e){!function(){var t;function n(e){for(var t,n,r,i,a=1,s=[].slice.call(arguments),o=0,l=e.length,c="",u=!1,g=!1,d=function(){return s[a++]},h=function(){for(var n="";/\d/.test(e[o]);)n+=e[o++],t=e[o];return n.length>0?parseInt(n):null};o<l;++o)if(t=e[o],u)switch(u=!1,"."==t?(g=!1,t=e[++o]):"0"==t&&"."==e[o+1]?(g=!0,t=e[o+=2]):g=!0,i=h(),t){case"b":c+=parseInt(d(),10).toString(2);break;case"c":c+="string"===typeof(n=d())||n instanceof String?n:String.fromCharCode(parseInt(n,10));break;case"d":c+=parseInt(d(),10);break;case"f":r=String(parseFloat(d()).toFixed(i||6)),c+=g?r:r.replace(/^0/,"");break;case"j":c+=JSON.stringify(d());break;case"o":c+="0"+parseInt(d(),10).toString(8);break;case"s":c+=d();break;case"x":c+="0x"+parseInt(d(),10).toString(16);break;case"X":c+="0x"+parseInt(d(),10).toString(16).toUpperCase();break;default:c+=t}else"%"===t?u=!0:c+=t;return c}(t=e.exports=n).format=n,t.vsprintf=function(e,t){return n.apply(null,[e].concat(t))},"undefined"!==typeof console&&"function"===typeof console.log&&(t.printf=function(){console.log(n.apply(null,arguments))})}()},47802:function(e){function t(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach((function(n){var r=e[n];"object"!=typeof r||Object.isFrozen(r)||t(r)})),e}var n=t,r=t;n.default=r;class i{constructor(e){void 0===e.data&&(e.data={}),this.data=e.data}ignoreMatch(){this.ignore=!0}}function a(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function s(e,...t){const n=Object.create(null);for(const r in e)n[r]=e[r];return t.forEach((function(e){for(const t in e)n[t]=e[t]})),n}const o=e=>!!e.kind;class l{constructor(e,t){this.buffer="",this.classPrefix=t.classPrefix,e.walk(this)}addText(e){this.buffer+=a(e)}openNode(e){if(!o(e))return;let t=e.kind;e.sublanguage||(t=`${this.classPrefix}${t}`),this.span(t)}closeNode(e){o(e)&&(this.buffer+="</span>")}value(){return this.buffer}span(e){this.buffer+=`<span class="${e}">`}}class c{constructor(){this.rootNode={children:[]},this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(e){this.top.children.push(e)}openNode(e){const t={kind:e,children:[]};this.add(t),this.stack.push(t)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(e){return this.constructor._walk(e,this.rootNode)}static _walk(e,t){return"string"===typeof t?e.addText(t):t.children&&(e.openNode(t),t.children.forEach((t=>this._walk(e,t))),e.closeNode(t)),e}static _collapse(e){"string"!==typeof e&&e.children&&(e.children.every((e=>"string"===typeof e))?e.children=[e.children.join("")]:e.children.forEach((e=>{c._collapse(e)})))}}class u extends c{constructor(e){super(),this.options=e}addKeyword(e,t){""!==e&&(this.openNode(t),this.addText(e),this.closeNode())}addText(e){""!==e&&this.add(e)}addSublanguage(e,t){const n=e.root;n.kind=t,n.sublanguage=!0,this.add(n)}toHTML(){return new l(this,this.options).value()}finalize(){return!0}}function g(e){return e?"string"===typeof e?e:e.source:null}const d="[a-zA-Z]\\w*",h="[a-zA-Z_]\\w*",f="\\b\\d+(\\.\\d+)?",p="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",m="\\b(0b[01]+)",b={begin:"\\\\[\\s\\S]",relevance:0},x={className:"string",begin:"'",end:"'",illegal:"\\n",contains:[b]},v={className:"string",begin:'"',end:'"',illegal:"\\n",contains:[b]},E={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},y=function(e,t,n={}){const r=s({className:"comment",begin:e,end:t,contains:[]},n);return r.contains.push(E),r.contains.push({className:"doctag",begin:"(?:TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):",relevance:0}),r},w=y("//","$"),N=y("/\\*","\\*/"),R=y("#","$"),k={className:"number",begin:f,relevance:0},_={className:"number",begin:p,relevance:0},M={className:"number",begin:m,relevance:0},O={className:"number",begin:f+"(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",relevance:0},L={begin:/(?=\/[^/\n]*\/)/,contains:[{className:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[b,{begin:/\[/,end:/\]/,relevance:0,contains:[b]}]}]},A={className:"title",begin:d,relevance:0},I={className:"title",begin:h,relevance:0},S={begin:"\\.\\s*[a-zA-Z_]\\w*",relevance:0};var B=Object.freeze({__proto__:null,IDENT_RE:d,UNDERSCORE_IDENT_RE:h,NUMBER_RE:f,C_NUMBER_RE:p,BINARY_NUMBER_RE:m,RE_STARTERS_RE:"!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",SHEBANG:(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=function(...e){return e.map((e=>g(e))).join("")}(t,/.*\b/,e.binary,/\b.*/)),s({className:"meta",begin:t,end:/$/,relevance:0,"on:begin":(e,t)=>{0!==e.index&&t.ignoreMatch()}},e)},BACKSLASH_ESCAPE:b,APOS_STRING_MODE:x,QUOTE_STRING_MODE:v,PHRASAL_WORDS_MODE:E,COMMENT:y,C_LINE_COMMENT_MODE:w,C_BLOCK_COMMENT_MODE:N,HASH_COMMENT_MODE:R,NUMBER_MODE:k,C_NUMBER_MODE:_,BINARY_NUMBER_MODE:M,CSS_NUMBER_MODE:O,REGEXP_MODE:L,TITLE_MODE:A,UNDERSCORE_TITLE_MODE:I,METHOD_GUARD:S,END_SAME_AS_BEGIN:function(e){return Object.assign(e,{"on:begin":(e,t)=>{t.data._beginMatch=e[1]},"on:end":(e,t)=>{t.data._beginMatch!==e[1]&&t.ignoreMatch()}})}});function T(e,t){"."===e.input[e.index-1]&&t.ignoreMatch()}function j(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=T,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords)}function P(e,t){Array.isArray(e.illegal)&&(e.illegal=function(...e){return"("+e.map((e=>g(e))).join("|")+")"}(...e.illegal))}function D(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function C(e,t){void 0===e.relevance&&(e.relevance=1)}const H=["of","and","for","in","not","or","if","then","parent","list","value"];function U(e,t){return t?Number(t):function(e){return H.includes(e.toLowerCase())}(e)?0:1}function $(e,{plugins:t}){function n(t,n){return new RegExp(g(t),"m"+(e.case_insensitive?"i":"")+(n?"g":""))}class r{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(e,t){t.position=this.position++,this.matchIndexes[this.matchAt]=t,this.regexes.push([t,e]),this.matchAt+=function(e){return new RegExp(e.toString()+"|").exec("").length-1}(e)+1}compile(){0===this.regexes.length&&(this.exec=()=>null);const e=this.regexes.map((e=>e[1]));this.matcherRe=n(function(e,t="|"){const n=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;let r=0,i="";for(let a=0;a<e.length;a++){r+=1;const s=r;let o=g(e[a]);for(a>0&&(i+=t),i+="(";o.length>0;){const e=n.exec(o);if(null==e){i+=o;break}i+=o.substring(0,e.index),o=o.substring(e.index+e[0].length),"\\"===e[0][0]&&e[1]?i+="\\"+String(Number(e[1])+s):(i+=e[0],"("===e[0]&&r++)}i+=")"}return i}(e),!0),this.lastIndex=0}exec(e){this.matcherRe.lastIndex=this.lastIndex;const t=this.matcherRe.exec(e);if(!t)return null;const n=t.findIndex(((e,t)=>t>0&&void 0!==e)),r=this.matchIndexes[n];return t.splice(0,n),Object.assign(t,r)}}class i{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(e){if(this.multiRegexes[e])return this.multiRegexes[e];const t=new r;return this.rules.slice(e).forEach((([e,n])=>t.addRule(e,n))),t.compile(),this.multiRegexes[e]=t,t}resumingScanAtSamePosition(){return 0!==this.regexIndex}considerAll(){this.regexIndex=0}addRule(e,t){this.rules.push([e,t]),"begin"===t.type&&this.count++}exec(e){const t=this.getMatcher(this.regexIndex);t.lastIndex=this.lastIndex;let n=t.exec(e);if(this.resumingScanAtSamePosition())if(n&&n.index===this.lastIndex);else{const t=this.getMatcher(0);t.lastIndex=this.lastIndex+1,n=t.exec(e)}return n&&(this.regexIndex+=n.position+1,this.regexIndex===this.count&&this.considerAll()),n}}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=s(e.classNameAliases||{}),function t(r,a){const o=r;if(r.compiled)return o;[D].forEach((e=>e(r,a))),e.compilerExtensions.forEach((e=>e(r,a))),r.__beforeBegin=null,[j,P,C].forEach((e=>e(r,a))),r.compiled=!0;let l=null;if("object"===typeof r.keywords&&(l=r.keywords.$pattern,delete r.keywords.$pattern),r.keywords&&(r.keywords=function(e,t){const n={};return"string"===typeof e?r("keyword",e):Object.keys(e).forEach((function(t){r(t,e[t])})),n;function r(e,r){t&&(r=r.toLowerCase()),r.split(" ").forEach((function(t){const r=t.split("|");n[r[0]]=[e,U(r[0],r[1])]}))}}(r.keywords,e.case_insensitive)),r.lexemes&&l)throw new Error("ERR: Prefer `keywords.$pattern` to `mode.lexemes`, BOTH are not allowed. (see mode reference) ");return l=l||r.lexemes||/\w+/,o.keywordPatternRe=n(l,!0),a&&(r.begin||(r.begin=/\B|\b/),o.beginRe=n(r.begin),r.endSameAsBegin&&(r.end=r.begin),r.end||r.endsWithParent||(r.end=/\B|\b/),r.end&&(o.endRe=n(r.end)),o.terminatorEnd=g(r.end)||"",r.endsWithParent&&a.terminatorEnd&&(o.terminatorEnd+=(r.end?"|":"")+a.terminatorEnd)),r.illegal&&(o.illegalRe=n(r.illegal)),r.contains||(r.contains=[]),r.contains=[].concat(...r.contains.map((function(e){return function(e){e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map((function(t){return s(e,{variants:null},t)})));if(e.cachedVariants)return e.cachedVariants;if(z(e))return s(e,{starts:e.starts?s(e.starts):null});if(Object.isFrozen(e))return s(e);return e}("self"===e?r:e)}))),r.contains.forEach((function(e){t(e,o)})),r.starts&&t(r.starts,a),o.matcher=function(e){const t=new i;return e.contains.forEach((e=>t.addRule(e.begin,{rule:e,type:"begin"}))),e.terminatorEnd&&t.addRule(e.terminatorEnd,{type:"end"}),e.illegal&&t.addRule(e.illegal,{type:"illegal"}),t}(o),o}(e)}function z(e){return!!e&&(e.endsWithParent||z(e.starts))}function K(e){const t={props:["language","code","autodetect"],data:function(){return{detectedLanguage:"",unknownLanguage:!1}},computed:{className(){return this.unknownLanguage?"":"hljs "+this.detectedLanguage},highlighted(){if(!this.autoDetect&&!e.getLanguage(this.language))return console.warn(`The language "${this.language}" you specified could not be found.`),this.unknownLanguage=!0,a(this.code);let t={};return this.autoDetect?(t=e.highlightAuto(this.code),this.detectedLanguage=t.language):(t=e.highlight(this.language,this.code,this.ignoreIllegals),this.detectedLanguage=this.language),t.value},autoDetect(){return!this.language||(e=this.autodetect,Boolean(e||""===e));var e},ignoreIllegals:()=>!0},render(e){return e("pre",{},[e("code",{class:this.className,domProps:{innerHTML:this.highlighted}})])}};return{Component:t,VuePlugin:{install(e){e.component("highlightjs",t)}}}}const F={"after:highlightBlock":({block:e,result:t,text:n})=>{const r=V(e);if(!r.length)return;const i=document.createElement("div");i.innerHTML=t.value,t.value=function(e,t,n){let r=0,i="";const s=[];function o(){return e.length&&t.length?e[0].offset!==t[0].offset?e[0].offset<t[0].offset?e:t:"start"===t[0].event?e:t:e.length?e:t}function l(e){function t(e){return" "+e.nodeName+'="'+a(e.value)+'"'}i+="<"+G(e)+[].map.call(e.attributes,t).join("")+">"}function c(e){i+="</"+G(e)+">"}function u(e){("start"===e.event?l:c)(e.node)}for(;e.length||t.length;){let t=o();if(i+=a(n.substring(r,t[0].offset)),r=t[0].offset,t===e){s.reverse().forEach(c);do{u(t.splice(0,1)[0]),t=o()}while(t===e&&t.length&&t[0].offset===r);s.reverse().forEach(l)}else"start"===t[0].event?s.push(t[0].node):s.pop(),u(t.splice(0,1)[0])}return i+a(n.substr(r))}(r,V(i),n)}};function G(e){return e.nodeName.toLowerCase()}function V(e){const t=[];return function e(n,r){for(let i=n.firstChild;i;i=i.nextSibling)3===i.nodeType?r+=i.nodeValue.length:1===i.nodeType&&(t.push({event:"start",offset:r,node:i}),r=e(i,r),G(i).match(/br|hr|img|input/)||t.push({event:"stop",offset:r,node:i}));return r}(e,0),t}const X=e=>{console.error(e)},W=(e,...t)=>{console.log(`WARN: ${e}`,...t)},q=(e,t)=>{console.log(`Deprecated as of ${e}. ${t}`)},Z=a,J=s,Y=Symbol("nomatch");var Q=function(e){const t=Object.create(null),r=Object.create(null),a=[];let s=!0;const o=/(^(<[^>]+>|\t|)+|\n)/gm,l="Could not find the language '{}', did you forget to load/include a language module?",c={disableAutodetect:!0,name:"Plain text",contains:[]};let g={noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",tabReplace:null,useBR:!1,languages:null,__emitter:u};function d(e){return g.noHighlightRe.test(e)}function h(e,t,n,r){const i={code:t,language:e};R("before:highlight",i);const a=i.result?i.result:f(i.language,i.code,n,r);return a.code=i.code,R("after:highlight",a),a}function f(e,n,r,o){const c=n;function u(e,t){const n=N.case_insensitive?t[0].toLowerCase():t[0];return Object.prototype.hasOwnProperty.call(e.keywords,n)&&e.keywords[n]}function d(){null!=_.subLanguage?function(){if(""===L)return;let e=null;if("string"===typeof _.subLanguage){if(!t[_.subLanguage])return void O.addText(L);e=f(_.subLanguage,L,!0,M[_.subLanguage]),M[_.subLanguage]=e.top}else e=p(L,_.subLanguage.length?_.subLanguage:null);_.relevance>0&&(A+=e.relevance),O.addSublanguage(e.emitter,e.language)}():function(){if(!_.keywords)return void O.addText(L);let e=0;_.keywordPatternRe.lastIndex=0;let t=_.keywordPatternRe.exec(L),n="";for(;t;){n+=L.substring(e,t.index);const r=u(_,t);if(r){const[e,i]=r;O.addText(n),n="",A+=i;const a=N.classNameAliases[e]||e;O.addKeyword(t[0],a)}else n+=t[0];e=_.keywordPatternRe.lastIndex,t=_.keywordPatternRe.exec(L)}n+=L.substr(e),O.addText(n)}(),L=""}function h(e){return e.className&&O.openNode(N.classNameAliases[e.className]||e.className),_=Object.create(e,{parent:{value:_}}),_}function m(e,t,n){let r=function(e,t){const n=e&&e.exec(t);return n&&0===n.index}(e.endRe,n);if(r){if(e["on:end"]){const n=new i(e);e["on:end"](t,n),n.ignore&&(r=!1)}if(r){for(;e.endsParent&&e.parent;)e=e.parent;return e}}if(e.endsWithParent)return m(e.parent,t,n)}function b(e){return 0===_.matcher.regexIndex?(L+=e[0],1):(B=!0,0)}function x(e){const t=e[0],n=e.rule,r=new i(n),a=[n.__beforeBegin,n["on:begin"]];for(const i of a)if(i&&(i(e,r),r.ignore))return b(t);return n&&n.endSameAsBegin&&(n.endRe=new RegExp(t.replace(/[-/\\^$*+?.()|[\]{}]/g,"\\$&"),"m")),n.skip?L+=t:(n.excludeBegin&&(L+=t),d(),n.returnBegin||n.excludeBegin||(L=t)),h(n),n.returnBegin?0:t.length}function v(e){const t=e[0],n=c.substr(e.index),r=m(_,e,n);if(!r)return Y;const i=_;i.skip?L+=t:(i.returnEnd||i.excludeEnd||(L+=t),d(),i.excludeEnd&&(L=t));do{_.className&&O.closeNode(),_.skip||_.subLanguage||(A+=_.relevance),_=_.parent}while(_!==r.parent);return r.starts&&(r.endSameAsBegin&&(r.starts.endRe=r.endRe),h(r.starts)),i.returnEnd?0:t.length}let E={};function w(t,n){const i=n&&n[0];if(L+=t,null==i)return d(),0;if("begin"===E.type&&"end"===n.type&&E.index===n.index&&""===i){if(L+=c.slice(n.index,n.index+1),!s){const t=new Error("0 width match regex");throw t.languageName=e,t.badRule=E.rule,t}return 1}if(E=n,"begin"===n.type)return x(n);if("illegal"===n.type&&!r){const e=new Error('Illegal lexeme "'+i+'" for mode "'+(_.className||"<unnamed>")+'"');throw e.mode=_,e}if("end"===n.type){const e=v(n);if(e!==Y)return e}if("illegal"===n.type&&""===i)return 1;if(S>1e5&&S>3*n.index){throw new Error("potential infinite loop, way more iterations than matches")}return L+=i,i.length}const N=y(e);if(!N)throw X(l.replace("{}",e)),new Error('Unknown language: "'+e+'"');const R=$(N,{plugins:a});let k="",_=o||R;const M={},O=new g.__emitter(g);!function(){const e=[];for(let t=_;t!==N;t=t.parent)t.className&&e.unshift(t.className);e.forEach((e=>O.openNode(e)))}();let L="",A=0,I=0,S=0,B=!1;try{for(_.matcher.considerAll();;){S++,B?B=!1:_.matcher.considerAll(),_.matcher.lastIndex=I;const e=_.matcher.exec(c);if(!e)break;const t=w(c.substring(I,e.index),e);I=e.index+t}return w(c.substr(I)),O.closeAllNodes(),O.finalize(),k=O.toHTML(),{relevance:A,value:k,language:e,illegal:!1,emitter:O,top:_}}catch(T){if(T.message&&T.message.includes("Illegal"))return{illegal:!0,illegalBy:{msg:T.message,context:c.slice(I-100,I+100),mode:T.mode},sofar:k,relevance:0,value:Z(c),emitter:O};if(s)return{illegal:!1,relevance:0,value:Z(c),emitter:O,language:e,top:_,errorRaised:T};throw T}}function p(e,n){n=n||g.languages||Object.keys(t);const r=function(e){const t={relevance:0,emitter:new g.__emitter(g),value:Z(e),illegal:!1,top:c};return t.emitter.addText(e),t}(e),i=n.filter(y).filter(N).map((t=>f(t,e,!1)));i.unshift(r);const a=i.sort(((e,t)=>{if(e.relevance!==t.relevance)return t.relevance-e.relevance;if(e.language&&t.language){if(y(e.language).supersetOf===t.language)return 1;if(y(t.language).supersetOf===e.language)return-1}return 0})),[s,o]=a,l=s;return l.second_best=o,l}const m={"before:highlightBlock":({block:e})=>{g.useBR&&(e.innerHTML=e.innerHTML.replace(/\n/g,"").replace(/<br[ /]*>/g,"\n"))},"after:highlightBlock":({result:e})=>{g.useBR&&(e.value=e.value.replace(/\n/g,"<br>"))}},b=/^(<[^>]+>|\t)+/gm,x={"after:highlightBlock":({result:e})=>{g.tabReplace&&(e.value=e.value.replace(b,(e=>e.replace(/\t/g,g.tabReplace))))}};function v(e){let t=null;const n=function(e){let t=e.className+" ";t+=e.parentNode?e.parentNode.className:"";const n=g.languageDetectRe.exec(t);if(n){const t=y(n[1]);return t||(W(l.replace("{}",n[1])),W("Falling back to no-highlight mode for this block.",e)),t?n[1]:"no-highlight"}return t.split(/\s+/).find((e=>d(e)||y(e)))}(e);if(d(n))return;R("before:highlightBlock",{block:e,language:n}),t=e;const i=t.textContent,a=n?h(n,i,!0):p(i);R("after:highlightBlock",{block:e,result:a,text:i}),e.innerHTML=a.value,function(e,t,n){const i=t?r[t]:n;e.classList.add("hljs"),i&&e.classList.add(i)}(e,n,a.language),e.result={language:a.language,re:a.relevance,relavance:a.relevance},a.second_best&&(e.second_best={language:a.second_best.language,re:a.second_best.relevance,relavance:a.second_best.relevance})}const E=()=>{if(E.called)return;E.called=!0;document.querySelectorAll("pre code").forEach(v)};function y(e){return e=(e||"").toLowerCase(),t[e]||t[r[e]]}function w(e,{languageName:t}){"string"===typeof e&&(e=[e]),e.forEach((e=>{r[e]=t}))}function N(e){const t=y(e);return t&&!t.disableAutodetect}function R(e,t){const n=e;a.forEach((function(e){e[n]&&e[n](t)}))}Object.assign(e,{highlight:h,highlightAuto:p,fixMarkup:function(e){return q("10.2.0","fixMarkup will be removed entirely in v11.0"),q("10.2.0","Please see https://github.com/highlightjs/highlight.js/issues/2534"),t=e,g.tabReplace||g.useBR?t.replace(o,(e=>"\n"===e?g.useBR?"<br>":e:g.tabReplace?e.replace(/\t/g,g.tabReplace):e)):t;var t},highlightBlock:v,configure:function(e){e.useBR&&(q("10.3.0","'useBR' will be removed entirely in v11.0"),q("10.3.0","Please see https://github.com/highlightjs/highlight.js/issues/2559")),g=J(g,e)},initHighlighting:E,initHighlightingOnLoad:function(){window.addEventListener("DOMContentLoaded",E,!1)},registerLanguage:function(n,r){let i=null;try{i=r(e)}catch(a){if(X("Language definition for '{}' could not be registered.".replace("{}",n)),!s)throw a;X(a),i=c}i.name||(i.name=n),t[n]=i,i.rawDefinition=r.bind(null,e),i.aliases&&w(i.aliases,{languageName:n})},listLanguages:function(){return Object.keys(t)},getLanguage:y,registerAliases:w,requireLanguage:function(e){q("10.4.0","requireLanguage will be removed entirely in v11."),q("10.4.0","Please see https://github.com/highlightjs/highlight.js/pull/2844");const t=y(e);if(t)return t;throw new Error("The '{}' language is required, but not loaded.".replace("{}",e))},autoDetection:N,inherit:J,addPlugin:function(e){a.push(e)},vuePlugin:K(e).VuePlugin}),e.debugMode=function(){s=!1},e.safeMode=function(){s=!0},e.versionString="10.5.0";for(const i in B)"object"===typeof B[i]&&n(B[i]);return Object.assign(e,B),e.addPlugin(m),e.addPlugin(F),e.addPlugin(x),e}({});e.exports=Q},96470:function(e,t,n){"use strict";var r=n(47802),i=n(21102);t.highlight=s,t.highlightAuto=function(e,t){var n,o,l,c,u=t||{},g=u.subset||r.listLanguages(),d=u.prefix,h=g.length,f=-1;null!==d&&void 0!==d||(d=a);if("string"!==typeof e)throw i("Expected `string` for value, got `%s`",e);o={relevance:0,language:null,value:[]},n={relevance:0,language:null,value:[]};for(;++f<h;)c=g[f],r.getLanguage(c)&&((l=s(c,e,t)).language=c,l.relevance>o.relevance&&(o=l),l.relevance>n.relevance&&(o=n,n=l));o.language&&(n.secondBest=o);return n},t.registerLanguage=function(e,t){r.registerLanguage(e,t)},t.listLanguages=function(){return r.listLanguages()},t.registerAlias=function(e,t){var n,i=e;t&&((i={})[e]=t);for(n in i)r.registerAliases(i[n],{languageName:n})},o.prototype.addText=function(e){var t,n,r=this.stack;if(""===e)return;t=r[r.length-1],(n=t.children[t.children.length-1])&&"text"===n.type?n.value+=e:t.children.push({type:"text",value:e})},o.prototype.addKeyword=function(e,t){this.openNode(t),this.addText(e),this.closeNode()},o.prototype.addSublanguage=function(e,t){var n=this.stack,r=n[n.length-1],i=e.rootNode.children,a=t?{type:"element",tagName:"span",properties:{className:[t]},children:i}:i;r.children=r.children.concat(a)},o.prototype.openNode=function(e){var t=this.stack,n=this.options.classPrefix+e,r=t[t.length-1],i={type:"element",tagName:"span",properties:{className:[n]},children:[]};r.children.push(i),t.push(i)},o.prototype.closeNode=function(){this.stack.pop()},o.prototype.closeAllNodes=l,o.prototype.finalize=l,o.prototype.toHTML=function(){return""};var a="hljs-";function s(e,t,n){var s,l=r.configure({}),c=(n||{}).prefix;if("string"!==typeof e)throw i("Expected `string` for name, got `%s`",e);if(!r.getLanguage(e))throw i("Unknown language: `%s` is not registered",e);if("string"!==typeof t)throw i("Expected `string` for value, got `%s`",t);if(null!==c&&void 0!==c||(c=a),r.configure({__emitter:o,classPrefix:c}),s=r.highlight(e,t,!0),r.configure(l||{}),s.errorRaised)throw s.errorRaised;return{relevance:s.relevance,language:s.language,value:s.emitter.rootNode.children}}function o(e){this.options=e,this.rootNode={children:[]},this.stack=[this.rootNode]}function l(){}}}]);