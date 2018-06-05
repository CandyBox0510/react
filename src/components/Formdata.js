import React, { Component } from 'react'
//import { Map, List } from 'immutable';


class Formdata extends Component{
    
    state = {
        uniq : '',
        attr : '',
        init : true,
        promotionBanner:[
            {
                'uniq' : 'banner',
                'attr' : ''
            },
            {
                'uniq' : 'temp',
                'attr' : ''
            },
            {
                'uniq' : 'dummy',
                'attr' : ''
            },
            {
                'uniq' : 'switch',
                'attr' : 'currentWindow'
            }
        ]
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     // 여기서는 setState 를 하는 것이 아니라
    //     // 특정 props 가 바뀔 때 설정하고 설정하고 싶은 state 값을 리턴하는 형태로
    //     // 사용됩니다.
    //     console.log("why1 : " + nextProps.subAttr);
    //     console.log("why2 : " + prevState.promotionBanner[0].attr);
    //     console.log("why3 : " + prevState.init);
    //     let promotionBanner = prevState.promotionBanner;
    //     let nextPromotionBanner = [...promotionBanner]; 
    //     nextPromotionBanner[0] = {
    //         ...promotionBanner[0],
    //         attr : nextProps.subAttr
    //     }

    //     if(nextProps.subAttr && (prevState.promotionBanner[0].attr=='' && (prevState.init))){
    //         return {
    //             promotionBanner : nextPromotionBanner
    //         };
    //     }
        
    //     // if( nextProps.onData !== 'default' && nextProps.onData){
    //     //     return {
    //     //         className: 'promotion-banner '+nextProps.onData
    //     //     }
    //     // }else{
    //     //     return{
    //     //         className: 'promotion-banner'
    //     //     }
    //     // }

    //     return null; // null 을 리턴하면 따로 업데이트 할 것은 없다라는 의미
    // }

    static defaultProps ={
        onAttr : () => console.warn('onAttr not defined'),
        subAttr : () => console.warn('subAttr is not defined'),
    }

    handleAttr = (e) =>{
        this.handleChange(e);
        this.props.onAttr(this.state.promotionBanner);
    }

    handleChange = (e) => {
        const promotionBanner = this.state.promotionBanner;
        const nextPromotionBanner = [...promotionBanner]; 
        let exist = false;
        let existIdx = 0;
        for(let i = 0, length=promotionBanner.length; i<length; i++){
            if(promotionBanner[i].uniq == e.target.id){
                exist = true;
                existIdx = i;
            }
        }
        if(exist){
            nextPromotionBanner[existIdx] = {
                ...promotionBanner[existIdx],
                [e.target.name] : e.target.value
            }
            this.setState({
                promotionBanner : nextPromotionBanner,
                init : false
            });
        }else{
            this.setState({
                promotionBanner: promotionBanner.concat({
                    'uniq' : e.target.id,
                    [e.target.name] : e.target.value
                  }),
                init : false
            })
        }
    }



    render(){
        return(
            <div>
                <input
                    id='banner'
                    placeholder='attr'
                    name='attr'
                    value={this.state.promotionBanner[0].attr}
                    //value = {this.state.attr}
                    onChange={this.handleChange}
                />
                <select id='select' name='attr' onChange={this.handleChange}>
                    <option value="currentWindow">현재 창</option>
                    <option value="newWindow">새 창</option>
                </select>
                <button onClick={this.handleAttr}>설정</button>
            </div>
        );
    }
}

export default Formdata;