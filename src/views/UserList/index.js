import React, { Component } from "react"
import CIcon from '@coreui/icons-react';
import { getUserList, Deleting } from '../../api/user.api';
import { Link } from "react-router-dom";
import moment from 'moment';
import { CButton, CModalHeader, CModalBody, CModalFooter, CModal } from '@coreui/react';
import '../pages/login/login.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import {PrivateRoute} from './../../../src/common/PrivateRoute';
import Login from "../pages/login/Login";
import ReactDOM from 'react-dom';
import List from './List'

class UserList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            modal: false,
            id: "",
            openmenu: false
        }
    }

    toggle = (_id) => {
        this.setState({
            modal: !this.state.modal,
            id: _id
        })
    }

    handleDeleting = async () => {
        const id = this.state.id
        await Deleting(id).then(res => {
            const users = res.data
            this.setState({
                users,
                modal: false,
            })
            const { history } = this.props
            history.push('/')
        }).catch(err => {
            this.setState({
                modal: false,
            })
        })
    }
    getUserList = async () => {
        await getUserList().then(res => {
            this.setState({
                list: res.data
            })
        }).catch(err => {
        })
    }
    componentDidMount = async () => {
        await this.getUserList()
    }
   
    editUser = (id) => {
        this.props.history.push(`/user/${id}/edit`)
    }
    render(){
        return(
            <List  
            list={this.state.list} 
            editUser={this.editUser} 
            toggle={this.toggle} 
            modal={this.state.modal}
            handleDeleting={this.handleDeleting}
              />
        )
    }
}

export default UserList;



  