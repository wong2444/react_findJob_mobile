/*包含n個reducer函數:根據老的state和指定的action返回一個新的state*/
import {combineReducers} from 'redux'
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG,
    MSG_READ
} from "./action-types";
import {getRedirectTo} from "../utils/index"

const initUser = {
    username: '',
    type: '',
    msg: ''//錯誤提示信息
}

function user(state = initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            const {type, avatar} = action.data

            return {...action.data, redirectTo: getRedirectTo(type, avatar)}//更新state
        case ERROR_MSG:
            return {...action.data, msg: action.data}
        case RECEIVE_USER:
            return action.data
        case RESET_USER:
            return {...initUser, msg: action.data}
        default:
            return state
    }
}

const initUserList = []
function userList(state = initUserList, action) {
    switch (action.type) {
        case RECEIVE_USER_LIST:
            return action.data

        default:
            return state
    }

}

const initChat = {
    users: {},//所有用戶信息的對象,屬性名:userid,屬性值:{username,avatar}
    chatMsg: [],//當前用戶所有相關msg的數組
    unReadCount: 0//總的未讀數量
}

function chat(state = initChat, action) {
    switch (action.type) {
        case RECEIVE_MSG_LIST:
            const {users, chatMsgs, userid} = action.data

            const unReadCount = chatMsgs.reduce((preTotal, msg) => {
                if (msg.to === userid && !msg.read) {
                    preTotal += 1
                }
                return preTotal
            }, 0)
            return {users, chatMsgs, unReadCount}
        case RECEIVE_MSG:
            const {chatMsg, user_id} = action.data
            return {
                users: state.users,
                chatMsgs: [...state.chatMsgs, chatMsg],
                unReadCount: user_id === chatMsg.to ? state.unReadCount + 1 : state.unReadCount
            }
        case MSG_READ:
            const {count, from, to} = action.data
            return {
                users: state.users,
                chatMsgs: state.chatMsgs.map(msg => {//不可修改原數組只可產生新數組
                    if (msg.from === from && msg.to === to && !msg.read) {
                        return {...msg, read: true}
                    } else {
                        return msg
                    }
                }),
                unReadCount: state.unReadCount - count
            }
        default:
            return state
    }
}

export default combineReducers({
    user,
    userList,
    chat
})
//{xxx:0,yyy:0}
