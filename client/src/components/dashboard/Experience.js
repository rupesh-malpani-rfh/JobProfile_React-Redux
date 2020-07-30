import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profile';

const Experience = ({ experience, deleteExperience }) => {

    const experiences = experience.map((exp) => (
        <tr key={exp._id}>
            <td>{exp.jobtitle}</td>
            <td>{exp.company}</td>
            <td>{exp.joblocation}</td>
            <td>
                <Moment format='DD-MM-YYYY'>{exp.fromdate}</Moment> - {' '}
                {
                    exp.todate === null ? ('Now') : (<Moment format='DD-MM-YYYY'>{exp.todate}</Moment>)
                }
            </td>
            <td>
                <button onClick={() => deleteExperience(exp._id)} className="btn btn-danger">Delete</button>
            </td>
        </tr>
    ));

    return (
        <Fragment>
            <h2 className="my-1">Experience Details</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Job Title</th>
                        <th>Company</th>
                        <th>Job Location</th>
                        <th className="hide-sm">Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {experiences}
                </tbody>
            </table>
        </Fragment>
    );
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired
};

export default connect(null, { deleteExperience })(Experience)