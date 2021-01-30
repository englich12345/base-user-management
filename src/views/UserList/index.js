import React, { Component } from "react"
import CIcon from '@coreui/icons-react';
import { getUserList } from '../../api/user.api';
import { Link } from "react-router-dom";
import moment from 'moment';
import {CButton} from '@coreui/react'

class UserList extends Component {
    constructor() {
        super()
        this.state = {
            list: [
            ]
        }
    }

    componentDidMount = async () => {
        await getUserList().then(res => {
            console.log(res)
            this.setState({
                list: res.data
            })
        }).catch(err => {
            console.log(err)
        }

        )
    }
    render() {
        const { list } = this.state
        return (
            <div className="container">
                <div>
                    <Link to="/Register" className="col-sm-2 btn btn-success">ADD A NEW USER</Link><br /><br />
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
                            list.map((value, index) => {
                                return <tr>
                                    <td>{value.name}</td>
                                    <td>{value.role}</td>
                                    <td>{value.email}</td>
                                    <td>{moment(value.createdAt).format("MMM Do YY")}</td>
                                    {value.role === 'user' && <td>
                                    <CButton type="submit" className="btn btn-success">Edit</CButton>  
                                     <button type="submit" className="btn btn-success bg-danger"><CIcon name="cil-trash" /><i className="cil-trash"></i> Delete</button></td>}

                                </tr>

                            })
                        }

                    </tbody>
                </table>
            </div>
        )

    }
}
export default UserList 