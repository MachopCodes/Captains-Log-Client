import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { signUp, signIn } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'
import { Form, Button, Spinner } from 'react-bootstrap'

class SignUp extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
      loading: false
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignUp = event => {
    event.preventDefault()
    this.setState({ loading: true })
    const { msgAlert, history, setUser } = this.props
    signUp(this.state)
      .then(() => signIn(this.state))
      .then(res => {
        setUser(res.data)
        msgAlert({
          heading: 'Sign Up Success',
          message: messages.signUpSuccess,
          variant: 'success'
        })
        history.push('/')
      })
      .catch(error => {
        this.setState({ email: '', password: '', passwordConfirmation: '', loading: false })
        console.log(error)
        msgAlert({
          heading: 'Sign Up Failed with error: ' + error.message,
          message: messages.signUpFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { email, password, passwordConfirmation, loading } = this.state
    return (
      <section className='section page-section auth-image parallax text-light text-center'>
        <Form onSubmit={this.onSignUp}>
          <Form.Group controlId="email">
            <Form.Label className="main">Email</Form.Label>
            <Form.Control
              required
              type="email"
              name="email"
              value={email}
              placeholder="Enter email"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label className="main">Password</Form.Label>
            <Form.Control
              required
              name="password"
              value={password}
              type="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="passwordConfirmation">
            <Form.Label className="main">Password Confirmation</Form.Label>
            <Form.Control
              required
              name="passwordConfirmation"
              value={passwordConfirmation}
              type="password"
              placeholder="Confirm Password"
              onChange={this.handleChange}
            />
          </Form.Group>
          {loading
            ? <Fragment>
              <Button variant="primary" disabled>
                <Spinner as="span" animation="border" role="status" aria-hidden="true" />
              </Button>
            </Fragment>
            : <Fragment><Button variant="success" type="submit">Sign Up</Button></Fragment> }
        </Form>
      </section>
    )
  }
}

export default withRouter(SignUp)
