(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],[,,,function(t,e,r){t.exports=r.p+"static/media/hole.41925c22.png"},,,,,function(t,e,r){t.exports=r.p+"static/media/up.497a6ae6.png"},function(t,e,r){t.exports=r.p+"static/media/generate.51f84ad0.png"},function(t,e,r){t.exports=r.p+"static/media/revert.d73f66a3.png"},function(t,e,r){t.exports=r.p+"static/media/next.c1e46992.png"},function(t,e,r){t.exports=r(13)},function(t,e,r){"use strict";r.r(e);var n=r(1),a=r(2),i=r(4),s=r(5),o=r(0),c=r.n(o),u=r(7),l=r.n(u),m=(r(18),r(19),r(8)),h=r.n(m),p=r(3),d=r.n(p),f=r(9),g=r.n(f),y=r(10),b=r.n(y),N=r(11),v=r.n(N);function E(t){var e;return e=1===t.value?h.a:(t.value,d.a),c.a.createElement("button",{className:"grid",onClick:t.onClick},c.a.createElement("img",{className:"img",src:e,alt:""}))}var k=function(t){Object(s.a)(r,t);var e=Object(i.a)(r);function r(){return Object(n.a)(this,r),e.apply(this,arguments)}return Object(a.a)(r,[{key:"renderGrid",value:function(t,e,r){var n=this;return c.a.createElement(E,{key:r,value:this.props.grids[t][e],onClick:function(){return n.props.onClick(t,e)}})}},{key:"render",value:function(){for(var t=this,e=new Array(this.props.dimension),r=0;r<this.props.dimension;r++)e[r]=new Array(this.props.dimension).fill(null);var n=e.map((function(e,r){return c.a.createElement("div",{key:r,className:"board-row"},e.map((function(e,n){return t.renderGrid(r,n,n)})))}));return c.a.createElement("div",null,n)}}]),r}(c.a.Component),C=function(t){Object(s.a)(r,t);var e=Object(i.a)(r);function r(t){var a;Object(n.a)(this,r),a=e.call(this,t);for(var i=new Array(4),s=0;s<4;s++)i[s]=new Array(4).fill(null);var o=O({grids:i,legal_actions:[],stepNumber:0});return a.state={dimension:4,history:[o],historyNumber:0},a}return Object(a.a)(r,[{key:"handleClick",value:function(t,e){var r=this.state.history.slice(0,this.state.historyNumber+1),n=r[r.length-1],a=n.grids.slice();if(!x(a,this.state.dimension)&&1===a[t][e]){var i=function(t,e,r){var n=t.grids.length,a=w(t),i=a.grids,s=a.legal_actions;i[e][r]=0,e-1!==-1&&(1===i[e-1][r]?(i[e-1][r]=0,s=s.filter((function(t){return t[0]===e-1&&t[1]===r}))):(i[e-1][r]=1,s.push([e-1,r])));r+1!==n&&(1===i[e][r+1]?(i[e][r+1]=0,s=s.filter((function(t){return t[0]===e&&t[1]===r+1}))):(i[e][r+1]=1,s.push([e,r+1])));e+1!==n&&(1===i[e+1][r]?(i[e+1][r]=0,s=s.filter((function(t){return t[0]===e+1&&t[1]===r}))):(i[e+1][r]=1,s.push([e+1,r])));r-1!==-1&&(1===i[e][r-1]?(i[e][r-1]=0,s=s.filter((function(t){return t[0]===e&&t[1]===r-1}))):(i[e][r-1]=1,s.push([e,r-1])));return a.stepNumber=a.stepNumber+1,a}(n,t,e);this.setState({history:r.concat([i]),historyNumber:r.length})}}},{key:"jumpTo",value:function(t){this.setState({historyNumber:t})}},{key:"getCurrent",value:function(){return this.state.history[this.state.history.length-1]}},{key:"render",value:function(){var t,e,r=this,n=this.state.history,a=n[this.state.historyNumber],i=x(a.grids,this.state.dimension),s=n.map((function(t,e){var n=e?"Go to history #"+e:"Go to game start";return c.a.createElement("li",{key:e},c.a.createElement("button",{style:{fontSize:"15px",width:"100%",border:j(r.state.historyNumber,e)},id:"history",onClick:function(){r.jumpTo(e)}},n))}));return t=i?"Win! Step used: "+this.state.history[this.state.historyNumber].stepNumber:"Steps used: "+this.state.history[this.state.historyNumber].stepNumber,e="Now at history #"+this.state.historyNumber,c.a.createElement("div",{className:"game"},c.a.createElement("div",{className:"game-board"},c.a.createElement(k,{grids:a.grids,onClick:function(t,e){return r.handleClick(t,e)},dimension:this.state.dimension})),c.a.createElement("div",{className:"game-control"},c.a.createElement("button",{className:"grid",onClick:function(){var t=r.state.history.slice(0,r.state.historyNumber+1),e=O(t[t.length-1]);r.setState({history:t.concat(e),historyNumber:t.length})}},c.a.createElement("img",{className:"img",src:g.a,alt:""})),c.a.createElement("button",{className:"grid",onClick:function(){r.jumpTo(0===r.state.historyNumber?0:r.state.historyNumber-1)}},c.a.createElement("img",{className:"img",src:b.a,alt:""})),c.a.createElement("button",{className:"grid",onClick:function(){r.jumpTo(r.state.historyNumber===r.state.history.length-1?r.state.historyNumber:r.state.historyNumber+1)}},c.a.createElement("img",{className:"img",src:v.a,alt:""}))),c.a.createElement("div",{className:"game-info"},c.a.createElement("div",{className:"status"},t),c.a.createElement("div",{className:"status"},e),c.a.createElement("ol",null,s)))}}]),r}(c.a.Component);function j(t,e){if(t===e)return"4px solid #8c8b4b"}function w(t){return{grids:t.grids.map((function(t){return t.slice()})),legal_actions:t.legal_actions.slice(),stepNumber:t.stepNumber}}function x(t,e){for(var r=0;r<e;r++)for(var n=0;n<e;n++)if(0!==t[r][n])return!1;return!0}function O(t){for(var e=w(t),r=e.grids,n=e.legal_actions,a=0;a<r.length;a++)for(var i=0;i<r.length;i++){Math.random()<.5?(r[a][i]=1,n.push([a,i])):r[a][i]=0}return e.stepNumber=0,e}l.a.render(c.a.createElement(C,null),document.getElementById("root"))},,,,,function(t,e,r){}],[[12,1,2]]]);
//# sourceMappingURL=main.711019d0.chunk.js.map