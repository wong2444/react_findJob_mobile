import React, {Component} from 'react'
import {connect} from 'react-redux'
import UserList from "../../components/user-list/user-list";
import {getUserList} from '../../redux/actions'

class Employee extends Component {
    componentDidMount() {
        const {getUserList} = this.props
        getUserList({type: 'boss'})
    }

    render() {
        return (<div>
            <UserList userList={this.props.userList}/>
        </div>)
    }

}


export default connect(state => ({userList: state.userList}), {getUserList})(Employee)
