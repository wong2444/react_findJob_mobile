import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/actions'
import UserList from '../../components/user-list/user-list'

class Boss extends Component {
    componentDidMount() {
        const {getUserList} = this.props
        getUserList({type: 'employee'})
    }

    render() {
        return (<div>
            <UserList userList={this.props.userList}/>
        </div>)
    }

}

export default connect(state => ({userList: state.userList}), {getUserList})(Boss)
