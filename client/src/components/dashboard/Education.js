import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profile';

const Education = ({ education, deleteEducation }) => {

    const educations = education.map((edu) => (
        <tr key={edu._id}>
            <td>{edu.institutetype}</td>
            <td>{edu.institutename}</td>
            <td>{edu.university}</td>
            <td>{edu.degree}</td>
            <td>{edu.fieldofstudy}</td>
            <td>
                <Moment format='DD-MM-YYYY'>{edu.fromdate}</Moment> - {' '}
                {
                    edu.todate === null ? ('Now') : (<Moment format='DD-MM-YYYY'>{edu.todate}</Moment>)
                }
            </td>
            <td>
                <button onClick={() => deleteEducation(edu._id)} className="btn btn-danger">Delete</button>
            </td>
        </tr>
    ));

    return (
        <Fragment>
            <h2 className="my-1">Education Details</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Institution Type</th>
                        <th>Institution Name</th>
                        <th>University</th>
                        <th>Degree</th>
                        <th>Field of Study</th>
                        <th className="hide-sm">Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {educations}
                </tbody>
            </table>
        </Fragment>
    );
}

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired
};

export default connect(null, { deleteEducation })(Education);