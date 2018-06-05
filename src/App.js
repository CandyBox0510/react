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
					'attr' : ''
				},
				{
					'uniq' : 'btn',
					'attr' : ''
				},
				{
					'uniq' : 'switch',
					'attr' : ''
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
					json =>	{
											for(let j = 0, jsonLength=json.length; j < jsonLength; j++){
											let promotionBanner = this.state.promotionBanner;
											let nextPromotionBanner = [...promotionBanner]; 
											let exist = false;
											let existIdx = 0;
												for(let i = 0, length=promotionBanner.length; i<length; i++){
													if(promotionBanner[i].uniq == json[j].uniq){
															exist = true;
															existIdx = i;
													}
												}
												if(exist){
														nextPromotionBanner[existIdx] = {
																...promotionBanner[existIdx],
																attr : json[j].attr
														}
														this.setState({
																promotionBanner : nextPromotionBanner,
														});
												}else{
														this.setState({
																promotionBanner: promotionBanner.concat({
																		'uniq' : json[j].uniq,
																		'attr' : json[j].attr
																	}),
														})
												}
											}
									console.log(this.state);
							}
				);
      }else{
        console.error(res.statusText);
      }
    }).catch(err => console.error(err));
	}

	handleAttr = (list) =>{
		console.log(JSON.stringify(list));
		fetch('http://localhost:3050/setting',{
			method: 'post',
			headers : new Headers({
				'Accept' : 'application/json',
				'Content-Type' : 'text/plain',
			}),
			// body : JSON.stringify({uniq : 'test', attr : info})
			body : JSON.stringify(list).toString()
			// headers:{
			// 'Accept': 'application/json',
			// 'Content-Type': 'application/json'}
		}).then((res) =>{
      if(res.status === 200 || res.status === 201){
				res.json().then(
					json =>	{
									for(let j = 0, jsonLength=json.length; j < jsonLength; j++){
									let promotionBanner = this.state.promotionBanner;
									let nextPromotionBanner = [...promotionBanner]; 
									let exist = false;
									let existIdx = 0;
										for(let i = 0, length=promotionBanner.length; i<length; i++){
											if(promotionBanner[i].uniq == json[j].uniq){
													exist = true;
													existIdx = i;
											}
										}
										if(exist){
												nextPromotionBanner[existIdx] = {
														...promotionBanner[existIdx],
														attr : json[j].attr
												}
												this.setState({
														promotionBanner : nextPromotionBanner,
												});
										}else{
												this.setState({
														promotionBanner: promotionBanner.concat({
																'uniq' : json[j].uniq,
																'attr' : json[j].attr
															}),
												})
										}
									}
					}
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
		}
    return (
      <div>
				<Formdata onAttr={this.handleAttr} currentAttr={info.currentAttr} subAttr={subAttr}/>
				<div>현재 클래스 : {'promotion-banner '+info.promotionBanner[0].attr}</div>
				<ProBanner info={this.state.promotionBanner}/>
      </div>
    );
  }
}


export default App;
