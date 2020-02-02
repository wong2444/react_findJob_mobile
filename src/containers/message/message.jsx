import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'


const Item = List.Item
const Brief = Item.Brief

class Message extends Component {
    getLastMsg = (chatMsgs, userid) => {

        //找出每個聊天的lastMsg,並用一個對象容器來儲存
        const lastMsgObjs = {}
        chatMsgs.forEach(msg => {
            // 進行單一msg未讀數量統計
            if (msg.to === userid && !msg.read) {
                msg.unReadCount = 1
            } else {
                msg.unReadCount = 0
            }
            //得到msg的聊天chat_id
            const chatId = msg.chat_id
            //取得已保存的當前組件的LastMsg
            let lastMsg = lastMsgObjs[chatId]
            if (!lastMsg) {
                lastMsgObjs[chatId] = msg
            } else {
                //累加所有訊息的unReadCount
                const unReadCount = msg.unReadCount + lastMsg.unReadCount
                if (msg.create_time > lastMsg.create_time) {
                    lastMsgObjs[chatId] = msg
                }
                lastMsgObjs[chatId].unReadCount = unReadCount
            }
        })
        //得到所有lastMsg的數組
        const lastMsgs = Object.values(lastMsgObjs)
        //數組排序
        lastMsgs.sort((m1, m2) => m2.create_time - m1.create_time)
        return lastMsgs
    }

    render() {
        const {user} = this.props
        const {users, chatMsgs,unReadCount} = this.props.chat
        //對chatMsgs按chat_id進行分組
        if (!chatMsgs) {
            return null
        }
        const lastMsgs = this.getLastMsg(chatMsgs, user._id)

        return (
            <List style={{marginBottom: 44, marginTop: 45}}>
                {lastMsgs.map(msg => {
                    let avatar = msg.from === user._id ? users[msg.to].avatar : users[msg.from].avatar
                    let targetid = msg.from === user._id ? msg.to : msg.from
                    return (<Item
                        onClick={() => this.props.history.push(`/chat/${targetid}`)}
                        extra={<Badge text={msg.unReadCount}/>}
                        thumb={require(`../../assets/images/${avatar}.png`)}
                        arrow='horizontal'
                    >
                        {msg.content}
                        <Brief>{msg.from === user._id ? users[msg.to].username : users[msg.from].username}</Brief>
                    </Item>)

                })}


            </List>
        )
    }


}

export default connect(state => ({user: state.user, chat: state.chat}), {})(Message)
