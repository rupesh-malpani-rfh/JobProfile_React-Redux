import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = e => {
        e.preventDefault();
        login(email, password);
    }

    if (isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return (
        <div className="register-inner">
            <h1 className="text-large text-primary">
                Sign In
                    </h1>
            <p className="lead"><i className="fas fa-user"></i> Sign into your account</p>

            <form onSubmit={e => onSubmit(e)} className="form login-form">
                <div className="form-group">
                    <input type="email" name="email" placeholder="Email Address" value={email} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <input type="password" name="password" placeholder="Password" minLength="6" value={password} onChange={e => onChange(e)} />
                </div>
                <input type="submit" value="Login" className="btn btn-primary" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </div>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login)
