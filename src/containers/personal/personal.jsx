import React, {Component} from 'react'
import {resetUser} from '../../redux/actions'
import {connect} from 'react-redux'
import {Result, List, WhiteSpace, Button, Modal} from 'antd-mobile';
import Cookies from 'js-cookie'

const Item = List.Item;
const Brief = Item.Brief;


class Personal extends Component {
    logout = () => {
        Modal.alert('登出', '確定退出登錄嗎?', [
            {text: '取消', onPress: () => console.log('cancel')},
            {
                text: '確定', onPress: () => {
                    Cookies.remove('userid')
                    this.props.resetUser()
                }
            },
        ])
    }

    render() {
        const {user} = this.props
        return (<div style={{marginBottom: 44, marginTop: 45}}>
            <Result
                img={<img src={require(`../../assets/images/${user.avatar}.png`)} style={{width: 50}} alt='avatar'/>}
                title={user.username}
                message={user.company}
            />
            <List renderHeader={() => '相關信息'}>
                <Item multipleLine>
                    <Brief>職位: {user.post}</Brief>
                    <Brief>簡介: {user.info}</Brief>
                    <Brief>薪資: {user.salary}</Brief>
                </Item>
            </List>
            <WhiteSpace/>
            <List>
                <Button type='warning' onClick={this.logout}>退出登錄</Button>
            </List>

        </div>)
    }

}

export default connect(state => ({user: state.user}), {resetUser})(Personal)
