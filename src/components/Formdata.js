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
                'class' : ''
            },
            {
                'uniq' : 'btn',
                'class' : ''
            }
        ]
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        // 여기서는 setState 를 하는 것이 아니라
        // 특정 props 가 바뀔 때 설정하고 설정하고 싶은 state 값을 리턴하는 형태로
        // 사용됩니다.
        
        if(nextProps.subAttr && (prevState.attr==='' && (prevState.init))){
            return {
                attr : nextProps.subAttr
            };
        }
        
        // if( nextProps.onData !== 'default' && nextProps.onData){
        //     return {
        //         className: 'promotion-banner '+nextProps.onData
        //     }
        // }else{
        //     return{
        //         className: 'promotion-banner'
        //     }
        // }

        return null; // null 을 리턴하면 따로 업데이트 할 것은 없다라는 의미
    }

    static defaultProps ={
        onAttr : () => console.warn('onAttr not defined'),
        subAttr : () => console.warn('subAttr is not defined'),
    }

    handleAttr = (e) =>{
        this.handleChange(e);
        this.props.onAttr(this.state.uniq,this.state.attr);
    }

    handleChange = (e) => {
        this.setState({
           [e.target.name] : e.target.value,
           uniq : e.target.id,
           init : false
        });
    }



    render(){
        let subAttr = null;
        if(this.state.init){
            subAttr=this.props.subAttr;
        }
        
        return(
            <div>
                <input
                    id='banner'
                    placeholder='attr'
                    name='attr'
                    value={!!(subAttr) ? subAttr : this.state.attr}
                    //value = {this.state.attr}
                    onChange={this.handleChange}
                />
                <select>
                    <option value="">현재 창</option>
                    <option value="">새 창</option>
                </select>
                <button onClick={this.handleAttr}>설정</button>
            </div>
        );
    }
}

export default Formdata;