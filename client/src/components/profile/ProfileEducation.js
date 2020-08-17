// import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';
// import Moment from 'react-moment';

// const ProfileEducation = ({ profile: { education } }) => {
//     return (
//         <div className="profile-edu bg-white p-2 my-1">
//             <h2 className="text-primary">Education Details</h2>
//             {education.length > 0 ? (
//                 <Fragment>
//                     {
//                         education.map((edu) => (
//                             <div className="my-1" key={edu._id}>
//                                 <h3><strong>Degree: </strong> {edu.degree}</h3>
//                                 <Moment format='MMMM YYYY'>{edu.fromdate}</Moment> - {' '}
//                                 {
//                                     edu.todate === null ? ('Current') : (<Moment format='MMMM YYYY'>{edu.todate}</Moment>)
//                                 }
//                                 <p><strong>University: </strong> {edu.university}</p>
//                                 <p><strong>Field Of Study: </strong> {edu.fieldofstudy}</p>
//                                 <p><strong>Description: </strong> {edu.description}</p>
//                             </div>
//                         ))
//                     }
//                 </Fragment>
//             ) : (<h4>Education is not added</h4>)}

//         </div>
//     )
// }

// ProfileEducation.propTypes = {
//     profile: PropTypes.object.isRequired
// };

// export default ProfileEducation;

import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';

const ProfileEducation = ({
    education: { degree, fieldofstudy, university, todate, fromdate, description }
}) => (
        <div className="my-1">
            <h3><strong>Degree: </strong> {degree}</h3>
            <Moment format='MMMM YYYY'>{fromdate}</Moment> - {' '}
            {
                todate === null ? ('Current') : (<Moment format='MMMM YYYY'>{todate}</Moment>)
            }
            <p><strong>University: </strong> {university}</p>
            <p><strong>Field Of Study: </strong> {fieldofstudy}</p>
            <p><strong>Description: </strong> {description}</p>
        </div>
    );

ProfileEducation.propTypes = {
    education: PropTypes.object.isRequired
};

export default ProfileEducation;