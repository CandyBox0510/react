import React from 'react';
import 'whatwg-fetch';
import Formdata from './components/Formdata.js'
import ProBanner from './components/ProBanner.js'
import './clientlibs/css/common/main.css'
import './clientlibs/css/main.css'


//생성자
class App extends React.Component {
  constructor(){
		super(...arguments);
		this.state = {
			currentAttr : 'promotion-banner',
			promotionBanner : [
				{
					'uniq' : 'banner',
					'class' : ''
				},
				{
					'uniq' : 'btn',
					'class' : ''
				}
			]
		};
  }
  

  //컴포넌트 생성이 완료되었을때
  componentDidMount(){
		fetch('http://localhost:3050/onload',{
			method: 'get',
			dataType: 'json'
		}).then((res) =>{
      if(res.status === 200 || res.statue === 201){
				res.json().then(
					json =>	this.setState({currentAttr : 'promotion-banner'+json})
				);
      }else{
        console.error(res.statusText);
      }
    }).catch(err => console.error(err));
	}


	//Attr을 세팅하는 함수
	handleAttr = (uniq,attr) =>{
		console.log(JSON.stringify({uniq : uniq, attr : attr}));
		fetch('http://localhost:3050/setting',{
			//post방식으로
			method: 'post',
			headers : new Headers({
				'Accept' : 'application/json',
				//Content-Type이 json이 되지 않음. jsonString으로 request
				'Content-Type' : 'text/plain',
			}),
			body : JSON.stringify({uniq : uniq, attr : attr}).toString()
		}).then((res) =>{
      if(res.status === 200 || res.status === 201){
				res.json().then(
					//현재 state에 set
					json =>	this.setState({currentAttr : 'promotion-banner'+json})
				);
      }else{
		console.log('res.status : ' + res.status);
      }
    }).catch(err => console.error(err));
	}
  
  render() {
		const info = this.state;
		let subAttr = '';
		if(info.currentAttr.indexOf(' ')>-1){
			subAttr = info.currentAttr.split(' ')[1];
		}
    return (
      <div>
				<Formdata onAttr={this.handleAttr} currentAttr={info.currentAttr} subAttr={subAttr}/>
				<div>현재 클래스 : {info.currentAttr}</div>
				<ProBanner currentAttr={info.currentAttr}/>
      </div>
    );
  }
}


export default App;
