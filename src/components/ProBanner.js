import React , { Component } from 'react';
import pc from '../imgs/@promotion-bg-pc.jpg'
import mo from '../imgs/@promotion-bg-mo.jpg'

class ProBanner extends Component{

    getAttr = (attrList,uniq) =>{
        var obj = {};
        for(let i = 0, length = attrList.length; i < length; i ++){
            obj = JSON.parse(JSON.stringify(attrList[i]))
            if(obj.uniq == uniq) return obj.attr
        }
    }

    render(){
        let bannerAttr = this.getAttr(this.props.info,'banner');
        let switchAttr = this.getAttr(this.props.info,'switch');
        console.log('?????????'+switchAttr);
        if(switchAttr == 'newWindow'){
            switchAttr = 's-btn-text s-white s-ico-new-window'
        }else if(switchAttr == 'currentWindow'){
            switchAttr = 's-btn-text s-white'
        }
        
        return(
            <section className={"promotion-banner "+bannerAttr}>
                <h2 className="blind">Promotion Banner</h2>
                <div className="promotion-banner__text-wrap">
                    <div className="promotion-banner__content">
                        <strong className="promotion-banner__text-wrap-tit">Premium Care</strong>
                        <p className="promotion-banner__text-wrap-txt">Get covered with Samsung care with a team of experts ready to come to you<br/> to get it done, no matter what it is and no matter where you are.</p>
                        <a href="#" className={switchAttr} target="_blank" title="Open in a new window">LEARN MORE</a>
                    </div>
                </div>
                <div className="promotion-banner__img-wrap">
                    <img className="js-img-src" src={pc} data-src-pc={pc} data-src-mobile={mo} width="1440" height="320" alt=""/>
                </div>
            </section>
        );
    }
}

export default ProBanner;