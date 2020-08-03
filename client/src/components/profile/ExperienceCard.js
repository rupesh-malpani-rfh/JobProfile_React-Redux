import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

const ExperienceCard = ({ property }) => {
    console.log("property", property)
    const {
        company,
        joblocation,
        fromdate,
        todate,
        jobtitle,
        description
    } = property;
    return (
        <div>
            <div className="my-1 card">
                <p><strong>Company: </strong> {company}</p>
                <p><strong>Location: </strong> {joblocation}</p>
                <Moment format='MMMM YYYY'>{fromdate}</Moment> - {' '}
                {
                    todate === null ? ('Current') : (<Moment format='MMMM YYYY'>{todate}</Moment>)
                }
                <p><strong>Position: </strong> {jobtitle}</p>
                <p>
                    <strong>Description: </strong>{description}</p>
            </div>
        </div>
    );
}

ExperienceCard.propTypes = {
    property: PropTypes.object.isRequired
}

export default ExperienceCard;