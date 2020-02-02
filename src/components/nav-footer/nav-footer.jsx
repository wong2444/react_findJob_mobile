import React, {Component} from 'react'
import {TabBar} from "antd-mobile";
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

//希望在非路由組件中,使用路由api
class NavFooter extends Component {
    static propTypes = {
        navList: PropTypes.array.isRequired,
        type: PropTypes.string.isRequired,

    }

    render() {
        const {navList, type, unReadCount} = this.props
        const path = this.props.location.pathname
        return (<div>
            <TabBar>
                {
                    navList.filter(nav => {
                        if (type === 'employee') {
                            if (nav.text === '員工') {
                                return false
                            }
                        } else if (type === 'boss') {
                            if (nav.text === '老板') {
                                return false
                            }
                        }
                        return true
                    }).map(nav => (
                        <TabBar.Item key={nav.path}
                                     badge={unReadCount&&nav.path==='/message' ? unReadCount : null}
                                     title={nav.text}
                                     icon={{uri: require(`./images/${nav.icon}.png`)}}
                                     selectedIcon={{uri: require(`./images/${nav.icon}-selected.png`)}}
                                     selected={path === nav.path}
                                     onPress={() => this.props.history.replace(nav.path)}

                        />


                    ))
                }
            </TabBar>
        </div>)
    }

}

//向外曝露withRouter()包裝產生的組件
export default withRouter(NavFooter)
