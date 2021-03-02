import React, { Component } from "react"
import CIcon from '@coreui/icons-react';
import { getUserList, Deleting } from '../../api/user.api';
import { Link } from "react-router-dom";
import moment from 'moment';
import { CButton, CModalHeader, CModalBody, CModalFooter, CModal } from '@coreui/react';
import '../pages/login/login.css';
class UserList extends Component {
    constructor() {
        super()
        this.state = {
            list: [],
            modal: false,
            id: "",
            errorMessage:"",
        }
    }    
    toggle = (_id) => {
        this.setState({
            modal: !this.state.modal,
            id: _id

        })
    }
    handleDeleting = async () => {
        const id=this.state.id
        console.log(id)
        console.log(this.state.list)
        await Deleting(id).then(res => {
            console.log(res)
            const users = res.data
            this.setState({
                users,
                modal:false,
            })
            const { history } = this.props
            history.push('/')
        }).catch(err => {
            console.log(err = "error")
            this.setState({
                modal: false,   
            })
        })
    }
    getUserList=async()=>{
        await getUserList().then(res => {
            this.setState({
                list: res.data
            })
        }).catch(err => {
        })
    }
    componentDidMount = () => {
        this.getUserList()
    }
    render() {
        const { list } = this.state
        return (
            <div className="container">
                <div class="row">
                    <h2 class="col-9">User listing</h2>
                    <div class="col-3 col-auto">
                        <Link to="/register" className="col-sm-2 btn btn-success">ADD A NEW USER</Link>
                    </div>
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Username</th>
                            <th scope="col">Role for</th>
                            <th scope="col">Email</th>
                            <th scope="col">Created At</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            list.map((value) => {
                                return <tr>
                                    <td>{value.name}</td>
                                    <td>{value.role}</td>
                                    <td>{value.email}</td>
                                    <td>{moment(value.createdAt).format("MMM Do YY")}</td>
                                    <td>{value.role === 'user' && <><CButton type="submit" color="success" onClick={() => this.props.history.push(`/user/${value._id}/edit`)}  >Edit</CButton>         
                                    &ensp;<CButton click="warningModal = true" type="submit" className="bg-danger" onClick={() => this.toggle(value._id)}><CIcon name="cil-trash" /><i className="cil-trash"></i> Delete</CButton>
                                    </>
                                    }</td>

                                </tr>
                            })
                        }

                    </tbody>
                </table>
                <CModal show={this.state.modal} onClick={() => this.toggle()} >
                     <CModalHeader  class="p-3 mb-2 bg-warning text-white">Warning</CModalHeader>
                        <CModalBody>Make sure that you want to delete</CModalBody>
                    <CModalFooter>
                        <CButton onClick={() => this.handleDeleting()} color="primary">Yes</CButton>{' '}
                        <CButton color="secondary" onClick={this.toggle}>Cancel</CButton>
                    </CModalFooter>
                </CModal>  
            </div>

        )

    }
}
export default UserList 