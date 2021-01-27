import React, { Component } from "react"
import CIcon from '@coreui/icons-react';
import axios from 'axios';
import { getUserList } from '../../api/user.api';
const baseUrl = process.env.REACT_APP_BASE_URL
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

)}
    render() {
        const { list } = this.state
        return (
            <div className="container">
                <div className="col-sm-2 btn btn-success">ADD A NEW USER</div><br /><br />
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
                            this.state.list.map((value, index) => {
                                return <tr>
                                    <td>{value.name}</td>
                                    <td>{value.role}</td>
                                    <td>{value.email}</td>
                                    <td>{value.createdAt}</td>
                                    {value.role === 'admin' && <td><button type="submit" className="btn btn-success"><CIcon name="cil-comment-square-edit" /> Edit</button>   <button type="submit" className="btn btn-success"><CIcon name="cil-trash" /><i className="cil-trash"></i> Delete</button></td>}

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