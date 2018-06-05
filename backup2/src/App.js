import React from 'react';
import 'whatwg-fetch';
import Formdata from './components/Formdata.js'
import ProBanner from './components/ProBanner.js'
import './clientlibs/css/common/main.css'
import './clientlibs/css/main.css'


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
  
  componentDidMount(){
		fetch('http://localhost:3050/onload',{
			method: 'get',
			dataType: 'json'
			// headers:{
			// 'Accept': 'application/json',
			// 'Content-Type': 'application/json'}
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

	handleAttr = (info) =>{
		console.log(JSON.stringify({uniq : 'test', attr : info}));
		fetch('http://localhost:3050/setting',{
			method: 'post',
			headers : new Headers({
				'Accept' : 'application/json',
				'Content-Type' : 'text/plain',
			}),
			// body : JSON.stringify({uniq : 'test', attr : info})
			body : JSON.stringify({uniq : 'banner', attr : info}).toString()
			// headers:{
			// 'Accept': 'application/json',
			// 'Content-Type': 'application/json'}
		}).then((res) =>{
      if(res.status === 200 || res.status === 201){
				res.json().then(
					json =>	this.setState({currentAttr : 'promotion-banner'+json})
				);
      }else{
				console.log('res.status : ' + res.status);
        console.error(res.statusText);
      }
    }).catch(err => console.error(err));
	}
  
  render() {
		const info = this.state;
		let subAttr = '';
		if(info.currentAttr.indexOf(' ')>-1){
			subAttr = info.currentAttr.split(' ')[1];
			console.log(subAttr);
		}
    console.log(info);
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
