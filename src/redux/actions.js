/*action creator 異步action,同步action*/
import {
    reqRegister,
    reqLogin,
    reqUpdateUser,
    reqGetUser,
    reqGetUserList,
    reqChatMsgList,
    reqReadMsg
} from '../api/index'
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG,
    MSG_READ
} from './action-types'
import io from 'socket.io-client'
//授權成功的同步action
const authSuccess = user => ({type: AUTH_SUCCESS, data: user})
//錯誤提示信息的同步action
const errorMsg = msg => ({type: ERROR_MSG, data: msg})
//接收用戶的同步action
const receiveUser = user => ({type: RECEIVE_USER, data: user})
//重置用戶的同步action
export const resetUser = msg => ({type: RESET_USER, data: msg})

const receiveUserList = userList => ({type: RECEIVE_USER_LIST, data: userList})

const receiveMsgList = ({users, chatMsgs, userid}) => ({type: RECEIVE_MSG_LIST, data: {users, chatMsgs, userid}})

// const receiveMsgList = ({users, chatMsgs, userid}) => ({type: RECEIVE_MSG_LIST, data: {users, chatMsgs, userid}})

//接收一個消息的同步action
const receiveMsg = (chatMsg, user_id) => ({type: RECEIVE_MSG, data: {chatMsg, user_id}})

const msgRead = ({count, from, to}) => ({type: MSG_READ, data: {count, from, to}})

function initIO(dispatch, userid) {

    if (!io.socket) {
        // 连接服务器, 得到代表连接的 socket 对象
        io.socket = io('ws://localhost:4000')
        // 绑定'receiveMessage'的监听, 来接收服务器发送的消息
        io.socket.on('receiveMsg', function (chatMsg) {
            // console.log('浏览器端接收到消息:', chatMsg)
            // 過濾msg
            if (userid === chatMsg.from || userid === chatMsg.to) {

                dispatch(receiveMsg(chatMsg, userid))
            }

        })
    }
}

export const sendMsg = ({from, to, content}) => {

    //發消息
    return async dispatch => {
        io.socket.emit('sendMsg', {from, to, content})
    }


}

async function getMsgList(dispatch, userid) {
    initIO(dispatch, userid)
    //發送異步ajax請求
    const response = await reqChatMsgList()
    const result = response.data
    const {users, chatMsgs} = result.data

    if (result.code === 0) {
        dispatch(receiveMsgList({users, chatMsgs, userid}))
    } else {
        dispatch(errorMsg(result.msg))
    }

}




export const register = (user) => {
    const {username, password, password2, type} = user
    //前台表單檢查,不通過返回同步errorMsg action
    if (!username) {
        return errorMsg('用戶名必須填寫')
    } else if (password !== password2) {
        return errorMsg('2次密碼要一致!')
    }

    return async dispatch => {
        //發送異步ajax請求
        const response = await reqRegister({username, password, type})
        const result = response.data

        if (result.code === 0) {
            getMsgList(dispatch, result.data._id)
            dispatch(authSuccess(result.data))
        } else {
            dispatch(errorMsg(result.msg))
        }
    }
}

export const login = (user) => {
    const {username, password} = user
    //前台表單檢查,不通過返回同步errorMsg action
    if (!username) {
        return errorMsg('用戶名必須填寫')
    } else if (!password) {
        return errorMsg('密碼必須填寫')
    }

    return async dispatch => {
        //發送異步ajax請求
        const response = await reqLogin(user)
        const result = response.data
        if (result.code === 0) {
            getMsgList(dispatch, result.data._id)
            dispatch(authSuccess(result.data))
        } else {
            dispatch(errorMsg(result.msg))
        }
    }
}

export const updateUser = (user) => {
    return async dispatch => {
        const response = await reqUpdateUser(user)
        const result = response.data
        if (result.code === 0) {
            dispatch(receiveUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}
export const getUser = () => {//cookie登錄
    return async dispatch => {
        const response = await reqGetUser()
        const result = response.data
        if (result.code === 0) {
            getMsgList(dispatch, result.data._id)
            dispatch(receiveUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}

export const getUserList = (type) => {

    return async dispatch => {
        const response = await reqGetUserList(type)
        const result = response.data
        if (result.code === 0) {
            console.log(result.data)
            dispatch(receiveUserList(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}


export const readMsg = (from) => {
    return async dispatch => {
        const response = await reqReadMsg({from})
        const result = response.data
        if (result.code === 0) {
            console.log(result.data)
            dispatch(msgRead(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}
