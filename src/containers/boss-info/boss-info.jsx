import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile';
import HeaderSelector from '../../components/header-selector/header-selector'
import {updateUser} from '../../redux/actions'
import {Redirect} from 'react-router-dom'

class BossInfo extends Component {
    state = {
        avatar: '',
        post: '',
        info: '',
        company: '',
        salary: ''
    }

    handleChange = (name, val) => {
        this.setState({[name]: val})
    }
    save =  () => {
        this.props.updateUser(this.state)
    }
    setAvatar = (avatar) => {
        this.setState(avatar)
    }

    render() {
        const {header, type} = this.props.user
        if (header) {
            const path = type === 'boss' ? '/boss' : '/employee'
            return <Redirect to={path}/>
        }
        return (<div>
            <NavBar>老板信息完善</NavBar>
            <HeaderSelector setAvatar={this.setAvatar}/>
            <InputItem clear placeholder="請輸入職位:" onChange={val => this.handleChange('post', val)}>招聘信息</InputItem>
            <InputItem clear placeholder="請輸入公司名稱:" onChange={val => this.handleChange('company', val)}>公司名稱</InputItem>
            <InputItem clear placeholder="請輸入職位薪資:" onChange={val => this.handleChange('salary', val)}>職位薪資</InputItem>
            <TextareaItem title="職位要求:" autoHeight onChange={val => this.handleChange('info', val)}></TextareaItem>
            <Button type="primary" onClick={this.save}>保存</Button>
        </div>)
    }

}

export default connect(state => ({user: state.user}), {updateUser})(BossInfo)
