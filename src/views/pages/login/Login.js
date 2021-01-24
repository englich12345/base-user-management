import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CSpinner
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { login } from '../../../api/user.api'
import { setUser } from '../../../common/localStorage'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loading: false,
      errors: {
        email: "",
        password: "",
      }
    };
    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    const { name, value } = event.target
    const errors = {
      userName: "",
      password: "",
    }
    if (!value) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          [name]: [name] + " is not empty"
        }
      }))
    }
    else {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          [name]: ""
        }
      }))
    }
    this.setState({
      [name]: value
    });
  }

  loginForm = async () => {
    const { email, password } = this.state;
    const form = {
      email,
      password
    }
    this.setState({
      loading: true
    })
    await login(form).then(res => {
      this.setState({
        loading: false
      })
      setUser('token', res.data.accessToken)
      const { history } = this.props
      history.push('/')
    }).catch(error => {
      this.setState({
        loading: false
      })

    })
  }

  render() {
    const { email, password, errors } = this.state
    return (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="6">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="text" disabled={this.state.loading} name="email" value={email} placeholder="Email" autoComplete="username" onChange={this.handleChange} />
                        <div className="text-danger">{errors.email}</div>
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="password" disabled={this.state.loading} name="password" value={password} placeholder="Password" autoComplete="current-password" onChange={this.handleChange} />
                        <div className="text-danger">{errors.password}</div>
                      </CInputGroup>
                      <CRow>
                        <CCol xs="6">
                          <CButton color="primary" disabled={this.state.loading} className="px-12" onClick={() => this.loginForm()}>Login</CButton>
                          {this.state.loading && <CSpinner color="info" size="sm" />}

                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>

              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    )

  }
}


export default Login
