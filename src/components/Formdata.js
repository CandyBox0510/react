import React, { Component } from 'react'
//import { Map, List } from 'immutable';


class Formdata extends Component{
    
    state = {
        uniq : '',
        attr : '',
        idx : 0,
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
    

    static defaultProps ={
        onAttr : () => console.warn('onAttr not defined'),
        subAttr : () => console.warn('subAttr is not defined'),
    }

    //속성 설정하는 함수 설정
    handleAttr = (e) =>{
        this.handleChange(e);
        this.props.onAttr(this.state.uniq,this.state.attr);
    }


    //변경될때마다 key(uniq)값을 id로, value(attr)값을 value로 설정
    handleChange = (e) => {
        this.setState({
           [e.target.name] : e.target.value,
           uniq : e.target.id,
           idx : 1
        });
    }


    render(){
        let subAttr = null;
        //첫 렌더시에만 인풋박스에 텍스트 표시를위한 로직
        if(this.state.idx === 0){
            subAttr=this.props.subAttr;
            console.log(this.state.idx);
            console.log(subAttr);
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