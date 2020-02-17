import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import BossInfo from '../boss-info/boss-info'
import EmployeeInfo from '../employee-info/employee-info'
import Boss from '../boss/boss'
import Employee from '../employee/employee'
import Message from '../message/message'
import NotFound from '../../components/not-found/not-found'
import Personal from '../personal/personal'
import Chat from '../chat/chat'

import NavFooter from '../../components/nav-footer/nav-footer'

import Cookies from 'js-cookie'
import {connect} from 'react-redux'
import {getRedirectTo} from '../../utils'
import {getUser} from '../../redux/actions'
import {NavBar} from "antd-mobile";


class Main extends Component {
    // 给组件对象添加属性
    navList = [
        {
            path: '/boss', // 路由路径
            component: Boss,
            title: '員工列表',
            icon: 'dashen',
            text: '員工',
        },
        {
            path: '/employee', // 路由路径
            component: Employee,
            title: '老板列表',
            icon: 'laoban',
            text: '老板',
        },
        {
            path: '/message', // 路由路径
            component: Message,
            title: '消息列表',
            icon: 'message',
            text: '消息',
        },
        {
            path: '/personal', // 路由路径
            component: Personal,
            title: '用户中心',
            icon: 'personal',
            text: '个人',
        }
    ]

    async componentDidMount() {
        //登錄過(cookie中有userid),但現在沒有登錄(redux管理中沒有_id)發請求取得對象的user
        const userid = Cookies.get('userid')
        const {_id} = this.props.user
        if (userid && !_id) {
            //發送異步請求,取得user
             await this.props.getUser()
            if(!this.props.user._id){
                Cookies.set('userid', '');
            }
        }
    }

    render() {
        const userid = Cookies.get('userid')
        if (!userid) {
            return <Redirect to='/login'/>
        }
        //如有userid讀取redux中的user狀態

        const {user, unReadCount} = this.props


        //如果user中沒有_id,返回null
        if (!user._id) {
            return null
        } else {
            let path = this.props.location.pathname
            if (path === '/') {
                path = getRedirectTo(user.type, user.avatar)
                return <Redirect to={path}/>
            }
        }

        const {navList} = this
        const path = this.props.location.pathname
        const currentNav = navList.find(nav => nav.path === path)
        return (<div>
            {currentNav ? <NavBar className='sticky-header'>{currentNav.title}</NavBar> : null}
            <Switch>
                <Route path='/bossinfo' component={BossInfo}/>
                <Route path='/employeeinfo' component={EmployeeInfo}/>
                {navList.map(nav => <Route path={nav.path} component={nav.component}/>)}
                <Route path='/chat/:userid' component={Chat}/>
                <Route component={NotFound}/>
            </Switch>
            {currentNav ? <NavFooter navList={navList} type={this.props.user.type}
                                     unReadCount={unReadCount ? unReadCount : null}/> : null}

        </div>)
    }

}

export default connect(state => ({user: state.user, unReadCount: state.chat.unReadCount}), {getUser})(Main)
