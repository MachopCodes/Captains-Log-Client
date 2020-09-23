import React, { Fragment, Component } from 'react'
import { withRouter } from 'react-router-dom'
import { signIn } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'
import { Form, Button, Spinner } from 'react-bootstrap'

class SignIn extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: '',
      loading: false
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignIn = event => {
    event.preventDefault()
    this.setState({ loading: true })
    const { msgAlert, history, setUser } = this.props
    signIn(this.state)
      .then(res => setUser(res.data))
      .then(() => {
        this.setState({ loading: false })
        msgAlert({
          heading: 'Sign In Success',
          message: messages.signInSuccess,
          variant: 'success'
        })
        history.push('/')
      })
      .catch(error => {
        this.setState({ email: '', password: '', loading: false })
        console.log(error)
        msgAlert({
          heading: 'Sign In Failed with error: ' + error.message,
          message: messages.signInFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { email, password, loading } = this.state

    return (
      <section className='section page-section auth-image parallax text-light text-center'>
        <Form onSubmit={this.onSignIn}>
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
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={this.handleChange}
            />
          </Form.Group>
          {loading
            ? <Fragment>
              <Button variant="primary" disabled>
                <Spinner as="span" animation="border" role="status" aria-hidden="true" />
              </Button>
            </Fragment>
            : <Fragment><Button variant="primary" type="submit">Sign In</Button></Fragment> }
        </Form>
      </section>
    )
  }
}

export default withRouter(SignIn)
