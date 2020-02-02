import React, {Component} from 'react'

import {List, Grid} from 'antd-mobile';
import PropTypes from 'prop-types'

export default class HeaderSelector extends Component {
    static propTypes = {
        setAvatar: PropTypes.func.isRequired
    }
    state = {
        icon: null//圖片對象
    }

    constructor(props) {
        super(props)
        this.headerList = []//準備需要顯示的頭像數據
        for (let i = 0; i < 20; i++) {
            this.headerList.push({
                text: '头像' + (i + 1),
                icon: require('../../assets/images/' + '头像' + (i + 1) + '.png')
            })
        }
    }

    handleClick = (el) => {
        this.setState({icon: el})
        this.props.setAvatar({avatar: el.text})
    }

    render() {
        const listHeader = this.state.icon
        return (<div>
            <List renderHeader={() => {
                return listHeader ? <div>你選的頭像是: <img src={listHeader.icon}/></div> : '請選擇頭像'
            }}>
                <Grid data={this.headerList} columnNum={5} activeStyle={false}
                      onClick={(el) => this.handleClick(el)}/>
            </List>
        </div>)
    }

}
