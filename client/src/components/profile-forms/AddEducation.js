import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEducation } from '../../actions/profile';

const AddEducation = ({ addEducation, history }) => {

    const [formData, setFormData] = useState({
        institutetype: '',
        institutename: '',
        university: '',
        degree: '',
        fieldofstudy: '',
        fromdate: '',
        todate: '',
        current: false,
        description: ''
    });

    const [toDateShow, toggleToDateShow] = useState(false);

    const {
        institutetype,
        institutename,
        university,
        degree,
        fieldofstudy,
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
        addEducation(formData, history);
        history.push('/dashboard');
    }

    return (
        <Fragment>
            <h1 className="text-large text-primary">
                Add Your Education
        </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any School, College, University details that
            you have attended in past
        </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="text" placeholder="* Institution Type" name="institutetype" value={institutetype} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Institution Name" name="institutename" value={institutename} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* University" name="university" value={university} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Degree" name="degree" value={degree} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Field of Study" name="fieldofstudy" value={fieldofstudy} onChange={e => onChange(e)} required />
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

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired
};

export default connect(null, { addEducation })(withRouter(AddEducation))