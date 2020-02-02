import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavBar, InputItem, Button} from 'antd-mobile';
import HeaderSelector from '../../components/header-selector/header-selector'
import {updateUser} from '../../redux/actions'
import {Redirect} from 'react-router-dom'

class EmployeeInfo extends Component {
    state = {
        avatar: '',
        post: '',
        info: '',

    }

    handleChange = (name, val) => {
        this.setState({[name]: val})
    }
    save = () => {
        this.props.updateUser(this.state)
    }
    setAvatar = (avatar) => {
        this.setState(avatar)
    }

    render() {
        const {avatar, type} = this.props.user
        if (avatar) {
            const path = type === 'boss' ? '/boss' : '/employee'
            return <Redirect to={path}/>
        }
        return (<div>
            <NavBar>員工信息完善</NavBar>
            <HeaderSelector setAvatar={this.setAvatar}/>
            <InputItem clear placeholder="請輸入求職崗位:" onChange={val => this.handleChange('post', val)}>求職崗位</InputItem>
            <InputItem clear placeholder="請輸入個人介紹:" onChange={val => this.handleChange('info', val)}>個人介紹</InputItem>

            <Button type="primary" onClick={this.save}>保存</Button>
        </div>)
    }

}

export default connect(state => ({user: state.user}), {updateUser})(EmployeeInfo)
