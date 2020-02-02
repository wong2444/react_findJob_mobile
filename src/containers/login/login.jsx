import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {login} from '../../redux/actions'
import {NavBar, WingBlank, List, InputItem, WhiteSpace, Radio, Button} from 'antd-mobile'
import Logo from '../../components/logo/logo'


class Login extends Component {
    state = {
        username: '',
        password: '',

    }
    login = () => {
        this.props.login(this.state)
    }
    handleChange = (name, val) => {
        //屬性名默認為字符串,加[]將其變為變量
        this.setState({[name]: val})
    }
    toRegister = () => {
        this.props.history.push('/register')
    }


    render() {
        const {msg, redirectTo} = this.props.user
        if (redirectTo) {
            return <Redirect to={redirectTo}/>
        }
        return (<div>

            <NavBar>找工作</NavBar>
            <Logo></Logo>
            <WingBlank>
                <List renderHeader={() => '請登入'}>
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


                </List>
                <WhiteSpace/>
                <Button type="primary" onClick={this.login}>登入</Button>
                <WhiteSpace/>
                <Button onClick={this.toRegister}>沒有帳戶</Button>
            </WingBlank>
        </div>)
    }

}

export default connect(state => ({user: state.user}), {login})(Login)
