import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExperience } from '../../actions/profile';

const AddExperience = ({ addExperience, history }) => {

    const [formData, setFormData] = useState({
        jobtitle: '',
        company: '',
        joblocation: '',
        fromdate: '',
        todate: '',
        current: false,
        description: ''
    });

    const [toDateShow, toggleToDateShow] = useState(false);

    const {
        jobtitle,
        company,
        joblocation,
        fromdate,
        todate,
        current,
        description
    } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = async e => {
        e.preventDefault();
        addExperience(formData, history);
        history.push('/dashboard');
    }

    return (
        <Fragment>
            <h1 className="text-large text-primary">
                Add An Experience
        </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any developer/programming
            positions that you have had in the past
        </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => onSubmit(e)}>
                {/* <div className="form-group">
                    <input type="text" placeholder="* Job Title" name="jobtitle" value={jobtitle} onChange={e => onChange(e)} required />
                </div> */}

                <div className="form-group">
                    <select name="jobtitle" value={jobtitle} onChange={e => onChange(e)} required>
                        <option value="0">* Select Professional Status</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Developer">Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Principle Software Engineer">Principle Software Engineer</option>
                        <option value="Manager">Manager</option>
                        <option value="Senior Manager">Senior Manager</option>
                        <option value="Architect">Architect</option>
                        <option value="Director">Director</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <input type="text" placeholder="* Company" name="company" value={company} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Location" name="joblocation" value={joblocation} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="fromdate" value={fromdate} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <p><input type="checkbox" name="current" checked={current} value={current} onChange={e => {
                        setFormData({ ...formData, current: !current })
                        toggleToDateShow(!toDateShow);
                    }} /> {' '}Current Job</p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input
                        type="date"
                        name="todate"
                        value={todate}
                        onChange={e => onChange(e)} disabled={toDateShow ? 'disabled' : ''}
                    />
                </div>
                <div className="form-group">
                    <textarea name="description" value={description} onChange={e => onChange(e)} cols="30" rows="5" placeholder="Job Description"></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className='btn btn-light my-1' to='/dashboard'>
                    Go Back
                </Link>
            </form>
        </Fragment>
    )
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired
};

export default connect(null, { addExperience })(withRouter(AddExperience))