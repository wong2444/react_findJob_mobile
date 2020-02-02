import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavBar, List, InputItem, Grid, Icon} from 'antd-mobile'
import {sendMsg, readMsg} from '../../redux/actions'
import QueueAnim from 'rc-queue-anim';


const Item = List.Item

class Chat extends Component {
    state = {
        content: '',
        isShow: false//是否顯示表情列表
    }
    handleSend = () => {
        const from = this.props.user._id
        const to = this.props.match.params.userid
        const content = this.state.content
        if (content.trim()) {
            this.props.sendMsg({from, to, content})
        }
        this.setState({content: ''})
    }

    componentDidMount() {
        window.scrollTo(0, document.body.scrollHeight);

    }

    componentDidUpdate() {
        //更新列表顯示
        window.scrollTo(0, document.body.scrollHeight);
    }

    componentWillUnmount() {
        //退出頁面前更新狀態
        //更新消息未讀狀態
        const targetId = this.props.match.params.userid

        this.props.readMsg(targetId)
    }

    componentWillMount() {
        //在第一次render()之前調用
        const emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂',
            '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩',
            '😘', '😗', '☺', '😛', '😋', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫']
        this.emojis = emojis.map(emoji => ({text: emoji}))

    }

    toggleShow = () => {
        this.setState({isShow: !this.state.isShow})
        if (this.state.isShow) {
            // 异步手动派发 resize 事件,解决表情列表显示的bug
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'))
            }, 0)
        }
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'))
        }, 0)
    }

    render() {
        const {user} = this.props
        const {users, chatMsgs} = this.props.chat

        const meId = user._id
        const toUserid = this.props.match.params.userid
        const chatId = [meId, toUserid].sort().join('_')
        if (!users[toUserid]) {//如果沒有數據,不做任何事
            return null
        }
        const toAvatar = require(`../../assets/images/${users[toUserid].avatar}.png`) || ''

        return (<div id='chat-page'>
                <NavBar icon={<Icon type='left'/>}
                        onLeftClick={() => this.props.history.goBack()}
                        className='sticky-header'>{users[toUserid].username}
                </NavBar>
                <List style={{marginBottom: 44, marginTop: 45}}>
                    <QueueAnim type='alpha' delay={100}>
                    {chatMsgs.filter(msg => msg.chat_id === chatId).map(msg => {
                        if (msg.from === toUserid) {
                            return (<Item thumb={toAvatar}>
                                {msg.content}</Item>)
                        } else {
                            return (<Item
                                className='chat-me'
                                extra='我'>
                                {msg.content}
                            </Item>)
                        }
                    })}
                    </QueueAnim>
                </List>

                <div className='am-tab-bar'>
                    {this.state.isShow ? (<Grid data={this.emojis} columnNum={8} carouselMaxRow={4}
                                                isCarousel={true}
                                                onClick={item => this.setState({content: this.state.content + item.text})}/>) : null}
                    <InputItem

                        placeholder="请输入"
                        value={this.state.content}
                        onChange={val => this.setState({content: val})}
                        onFocus={() => this.setState({isShow: false})}
                        extra={
                            <span>
                                 <span onClick={this.toggleShow}>🙂</span>
                            <span onClick={this.handleSend}>发送</span>
                            </span>


                        }
                    />
                </div>


            </div>


        )
    }

}

export default connect(state => ({user: state.user, chat: state.chat}), {sendMsg, readMsg})(Chat)
