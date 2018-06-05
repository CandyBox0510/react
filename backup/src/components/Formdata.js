import React, { Component } from 'react'

class Formdata extends Component{
    
    state = {
        attr : '',
        idx : 0
    }

    static defaultProps ={
        onAttr : () => console.warn('onAttr not defined'),
        subAttr : () => console.warn('subAttr is not defined'),
    }

    handleAttr = () =>{
        this.props.onAttr(this.state.attr);
    }

    handleChange = (e) => {
        this.setState({
           [e.target.name] : e.target.value,
           idx : 1
        });
    }

    render(){
        let subAttr = null;
        if(this.state.idx == 0){
            subAttr = this.props.subAttr;
        }
        console.log(this.state.idx);
        console.log(subAttr);
        return(
            <div>
                <input
                    id = 'promotion-banner'
                    placeholder = 'attr'
                    name = 'attr'
                    value = {!!(subAttr) ? subAttr : this.state.attr}
                    //value = {this.state.attr}
                    onChange = {this.handleChange}
                />
                <button onClick={this.handleAttr}>설정</button>
            </div>
        );
    }
}

export default Formdata;