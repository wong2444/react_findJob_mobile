import React, {Component} from 'react'
import {Card, WingBlank, WhiteSpace} from 'antd-mobile';
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

class UserList extends Component {
    static propsTypes = {
        userList: PropTypes.array.isRequired
    }

    render() {
        const {userList} = this.props
        return (
            <div className='userList'>
                {
                    userList.map((user) => {
                            if (user.avatar) {
                                return (<div key={user._id}>
                                    <WingBlank>
                                        <WhiteSpace/>
                                        <Card onClick={()=>this.props.history.push('/chat/'+user._id)}>
                                            <Card.Header
                                                thumb={require(`../../assets/images/${user.avatar}.png`)}
                                                extra={user.username}
                                            />
                                            <Card.Body>
                                                <div>職位: {user.post}</div>
                                                {user.company ? <div>公司: {user.company}</div> : null}
                                                {user.salary ? <div>月薪: {user.salary}</div> : null}
                                                {user.info ? <div>描述: {user.info}</div> : null}
                                            </Card.Body>
                                        </Card>
                                        <WhiteSpace/>
                                    </WingBlank>
                                </div>)
                            }
                        }
                    )
                }
            </div>
        )
    }

}
export default withRouter(UserList)
