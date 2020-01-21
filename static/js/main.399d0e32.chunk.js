(this["webpackJsonpinsurance-questionnaire"]=this["webpackJsonpinsurance-questionnaire"]||[]).push([[0],{141:function(e,t,a){e.exports=a(237)},146:function(e,t,a){},147:function(e,t,a){},220:function(e,t,a){},235:function(e,t,a){},236:function(e,t,a){},237:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(8),i=a.n(o),s=(a(146),a(137)),c=a(26),u=a(31),l=a(32),m=a(34),p=a(33),d=a(35),h=a(242),v=(a(147),h.a.Header),f=h.a.Content,y=function(e){function t(){return Object(u.a)(this,t),Object(m.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props.children;return r.a.createElement(h.a,{className:"site-layout"},r.a.createElement(v,{className:"site-layout__header"},r.a.createElement("span",{className:"site-layout__title"},"Insurance Questionnaire")),r.a.createElement(f,{className:"site-layout__content"},e))}}]),t}(n.Component),b=a(69),E=a.n(b),g=a(70),S=a(238),w=a(98),O=a(50),j=a.n(O);var I=a(92);function N(){var e=Object(I.a)(["/recommendation"]);return N=function(){return e},e}function x(){var e=Object(I.a)(["/user"]);return x=function(){return e},e}var k=function(e){return"https://challenge-dot-popsure-204813.appspot.com".concat(e)};var Q=a(97),q=a(239),C=a(243),_=a(9),A=q.a.Paragraph,W=q.a.Text;var L=function(e){var t=e.error,a=t.response.data.errors,n=t.config.data,o=JSON.parse(n);return r.a.createElement(C.a,{status:"error",title:"Submission Failed",subTitle:"Please check and modify the following information before resubmitting.",extra:[r.a.createElement(w.a,{key:"buy",onClick:function(){return window.location.reload(!0)}},"Try Again")]},r.a.createElement("div",{className:"desc"},r.a.createElement(A,null,r.a.createElement(W,{strong:!0,style:{fontSize:16}},"The content you submitted has the following errors:")),Object.entries(a).map((function(e){var t=Object(Q.a)(e,2),a=t[0],n=Object(Q.a)(t[1],1)[0];return r.a.createElement(A,{key:a},r.a.createElement(_.a,{style:{color:"red"},type:"close-circle"}),r.a.createElement(W,{strong:!0}," ",o[a],":")," ",n)}))))},P=[{prompt:"What is your first name?",type:"string",paramKey:"firstName"},{prompt:"What is your address?",type:"string",paramKey:"address"},{prompt:"What is your occupation?",type:"string",options:[{value:"EMPLOYED",label:"Employed"},{value:"SELF_EMPLOYED",label:"Self employed"},{value:"STUDENT",label:"Student"}],paramKey:"occupation"},{prompt:"Do you have any children?",type:"string",options:[{value:"YES",label:"yes"},{value:"NO",label:"No",isNextQuestionSkipped:!0}]},{prompt:"How many children do you have?",type:"number",paramKey:"numberOfChildren",defaultAnswer:0},{prompt:"What is your email?",type:"string",paramKey:"email"}],J=a(240),K=a(244),T=a(241),D=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(m.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(r)))).handleInput=function(e){a.props.handleUserInput(e.target.value)},a.handleNumberInput=function(e){a.props.handleUserInput(e)},a.handleRadio=function(e){a.handleInput(e)},a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e,t=this.props,a=t.handleNext,n=t.question,o=n.type,i=n.options,s=n.answer;return"string"===o?e=i?r.a.createElement(J.a.Group,{onChange:this.handleRadio,value:s},i.map((function(e){return r.a.createElement(J.a,{key:e.value,value:e.value},e.label)}))):r.a.createElement(K.a,{onChange:this.handleInput,onPressEnter:a,value:s}):"number"===o&&(e=r.a.createElement(T.a,{value:s||0,onChange:this.handleNumberInput,min:0})),e}}]),t}(n.Component),U=(a(220),function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(m.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(r)))).state={questions:P,currentQuestionIndex:0,previousQuestionIndices:[],error:null,isLoading:!1},a.saveQuestionnaireState=function(){var e=a.state,t=e.questions,n=e.currentQuestionIndex,r=e.previousQuestionIndices;localStorage.setItem("questionnaireState",JSON.stringify({questions:t,currentQuestionIndex:n,previousQuestionIndices:r}))},a.handleUserInput=function(e){var t=a.state,n=t.questions,r=t.currentQuestionIndex,o=Object(g.a)(n);o[r].answer=e,a.setState({questions:o})},a.handlePrevious=function(){var e=a.state.previousQuestionIndices,t=Object(g.a)(e),n=t.pop();a.setState({currentQuestionIndex:n,previousQuestionIndices:t}),a.saveQuestionnaireState()},a.handleNext=function(){var e=a.state,t=e.questions,n=e.currentQuestionIndex,r=e.previousQuestionIndices,o=n,i=t[n];if(t[n+1]&&i.answer){if(o+=1,i.options)i.options.find((function(e){return e.value===i.answer})).isNextQuestionSkipped&&(o+=1);a.setState({currentQuestionIndex:o,previousQuestionIndices:[].concat(Object(g.a)(r),[n])}),a.saveQuestionnaireState()}},a.handleSubmit=function(){var e,t,n,r,o;return E.a.async((function(i){for(;;)switch(i.prev=i.next){case 0:return a.saveQuestionnaireState(),a.setState({isLoading:!0}),e=a.state.questions,t={},e.forEach((function(e){e.paramKey&&(t[e.paramKey]=e.answer||e.defaultAnswer)})),i.prev=5,i.next=8,E.a.awrap((c=t,j.a.post(k(x()),c)));case 8:return n=i.sent,r=n.data.jwt,(s=r)?j.a.defaults.headers.common.Authorization="Bearer ".concat(s):delete j.a.defaults.headers.common.Authorization,i.next=13,E.a.awrap(j.a.get(k(N()),{}));case 13:o=i.sent,localStorage.setItem("recommendation",JSON.stringify(o.data)),localStorage.setItem("jwt",r),window.location.reload(!0),i.next=22;break;case 19:i.prev=19,i.t0=i.catch(5),a.setState({error:i.t0});case 22:case"end":return i.stop()}var s,c}),null,null,[[5,19]])},a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){if(localStorage.questionnaireState){var e=JSON.parse(localStorage.questionnaireState);this.setState(e)}}},{key:"render",value:function(){if(localStorage.jwt)return r.a.createElement(c.a,{to:{pathname:"/recommendations"}});if(this.state.error)return r.a.createElement(L,{error:this.state.error});var e=this.state,t=e.currentQuestionIndex,a=e.questions,n=e.isLoading,o=a[t],i=a.length-1;return r.a.createElement("div",{className:"questionaire__container"},r.a.createElement(S.a,{title:o.prompt,bordered:!1,style:{maxWidth:800}},r.a.createElement(D,{handleUserInput:this.handleUserInput,handleNext:this.handleNext,question:o}),r.a.createElement("div",{className:"questionaire__buttons"},t>0&&r.a.createElement(w.a,{onClick:this.handlePrevious,type:"primary"},"Previous"),t<i&&r.a.createElement(w.a,{onClick:this.handleNext,type:"primary",disabled:!o.answer},"Next"),t===i&&r.a.createElement(w.a,{onClick:this.handleSubmit,type:"primary",loading:n},"Submit Answers"))))}}]),t}(n.Component)),B=(a(235),function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(m.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(r)))).state={recommendation:[]},a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){if(localStorage.questionnaireState){var e=JSON.parse(localStorage.recommendation);this.setState({recommendation:e})}}},{key:"render",value:function(){return r.a.createElement("div",{className:"recommendation__container"},r.a.createElement(C.a,{status:"success",title:"We got your recommendation",subTitle:"Based on your answers, this is what makes sense for you and what you should pay."}),this.state.recommendation.map((function(e,t){return r.a.createElement(S.a,{key:t,style:{maxWidth:800}},r.a.createElement("div",{className:"insurance-type"},e.type.toLowerCase().replace("_"," ")),r.a.createElement("div",{className:"price"},"".concat(e.price.amount," euros per ").concat(e.price.periodicity.toLowerCase())))})))}}]),t}(n.Component));a(236);var M=function(){var e=localStorage.jwt;return r.a.createElement("div",{className:"App"},r.a.createElement(s.a,null,r.a.createElement(y,null,r.a.createElement(c.d,null,r.a.createElement(c.b,{path:"/questionnaire"},r.a.createElement(U,null)),r.a.createElement(c.b,{path:"/recommendation",render:function(t){var a=t.location;return e?r.a.createElement(B,null):r.a.createElement(c.a,{to:{pathname:"/questionnaire",state:{from:a}}})}}),r.a.createElement(c.b,{path:"/",render:function(t){var a=t.location;return e?r.a.createElement(B,null):r.a.createElement(c.a,{to:{pathname:"/questionnaire",state:{from:a}}})}})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(M,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[141,1,2]]]);
//# sourceMappingURL=main.399d0e32.chunk.js.map