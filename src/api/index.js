/*包含n個接口函數*/

import ajax from './ajax'

export const reqRegister = user => ajax('/register', user, 'POST')
export const reqLogin = ({username, password}) => ajax('/login', {username, password}, 'POST')
export const reqUpdateUser = user => ajax('/update', user, 'POST')
export const reqGetUser = () => ajax('/user')
export const reqGetUserList = type => ajax('/userlist', type, 'GET')
//取得當前用戶的聊天消息列表
export const reqChatMsgList = () => ajax('/msglist')
//修改指定訊息為已讀
export const reqReadMsg = (from) => {
    console.log(from)
   return ajax('/readmsg', from, 'POST')
}

