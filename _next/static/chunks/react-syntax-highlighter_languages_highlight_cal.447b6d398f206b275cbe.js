(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[36],{d4EH:function(e,n){e.exports=function(e){const n="div mod in and or not xor asserterror begin case do downto else end exit for if of repeat then to until while with var",a=[e.C_LINE_COMMENT_MODE,e.COMMENT(/\{/,/\}/,{relevance:0}),e.COMMENT(/\(\*/,/\*\)/,{relevance:10})],s={className:"string",begin:/'/,end:/'/,contains:[{begin:/''/}]},r={className:"string",begin:/(#\d+)+/},o={className:"function",beginKeywords:"procedure",end:/[:;]/,keywords:"procedure|10",contains:[e.TITLE_MODE,{className:"params",begin:/\(/,end:/\)/,keywords:n,contains:[s,r]}].concat(a)},i={className:"class",begin:"OBJECT (Table|Form|Report|Dataport|Codeunit|XMLport|MenuSuite|Page|Query) (\\d+) ([^\\r\\n]+)",returnBegin:!0,contains:[e.TITLE_MODE,o]};return{name:"C/AL",case_insensitive:!0,keywords:{keyword:n,literal:"false true"},illegal:/\/\*/,contains:[s,r,{className:"number",begin:"\\b\\d+(\\.\\d+)?(DT|D|T)",relevance:0},{className:"string",begin:'"',end:'"'},e.NUMBER_MODE,i,o]}}}}]);