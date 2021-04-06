import React, { Component } from "react"
import CIcon from '@coreui/icons-react';
import { Link } from "react-router-dom";
import moment from 'moment';
import { CButton, CModalHeader, CModalBody, CModalFooter, CModal } from '@coreui/react';
import '../pages/login/login.css';

class List extends Component{
    constructor(props) {
        super(props);
        this.state = {
            list:'',
        }
    }
    
     render() {
       const {handleDeleting,toggle, modal}=this.props
       return (
               <CModal show={modal} onClick={() => toggle()} >
                   <CModalHeader class="p-3 mb-2 bg-warning text-white">Warning</CModalHeader>
                   <CModalBody>Make sure that you want to delete</CModalBody>
                   <CModalFooter>
                       <CButton onClick={() => handleDeleting()} color="primary">Yes</CButton>{' '}
                       <CButton color="secondary" onClick={this.toggle}>Cancel</CButton>
                   </CModalFooter>
               </CModal>

       )
   }
}
export default List