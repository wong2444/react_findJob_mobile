import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {register} from '../../redux/actions'
import {NavBar, WingBlank, List, InputItem, WhiteSpace, Radio, Button} from 'antd-mobile'
import Logo from '../../components/logo/logo'
import '../../assets/css/index.scss'

const Item = List.Item;


class Register extends Component {

    state = {
        username: '',
        password: '',
        password2: '',
        type: 'employee'
    }
    register = () => {
        // console.log(this.state)
        this.props.register(this.state)
    }
    handleChange = (name, val) => {
        //屬性名默認為字符串,加[]將其變為變量
        this.setState({[name]: val})
    }
    toLogin = () => {
        this.props.history.push('/login')
    }

    render() {
        const {type} = this.state
        const {msg, redirectTo} = this.props.user
        if (redirectTo) {
            return <Redirect to={redirectTo}/>
        }
        return (<div>

            <NavBar>找工作</NavBar>
            <Logo></Logo>
            <WingBlank>
                <List renderHeader={() => '個人資料'}>
                    {msg ? <div className='err-msg'>{msg}</div> : null}
                    <InputItem onChange={val => {
                        this.handleChange('username', val)
                    }} placeholder="user name">用戶名:</InputItem>
                    <WhiteSpace/>
                    <InputItem
                        type="password"
                        placeholder="password"
                        onChange={val => {
                            this.handleChange('password', val)
                        }}>密碼:</InputItem>
                    <WhiteSpace/>
                    <InputItem
                        type="password"
                        placeholder="confirm password"
                        onChange={val => {
                            this.handleChange('password2', val)
                        }}>確認密碼:</InputItem>
                    <WhiteSpace/>
                    <Item>
                        <span>用戶類型:</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Radio checked={type === 'employee'}
                               onChange={() => this.handleChange('type', 'employee')}>員工</Radio>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Radio checked={type === 'boss'} onChange={() => this.handleChange('type', 'boss')}>老闆</Radio>
                    </Item>
                </List>
                <WhiteSpace/>
                <Button type="primary" onClick={this.register}>注冊</Button>
                <WhiteSpace/>
                <Button onClick={this.toLogin}>已有帳戶</Button>
            </WingBlank>
        </div>)
    }

}

export default connect(state => ({user: state.user}), {register})(Register)

