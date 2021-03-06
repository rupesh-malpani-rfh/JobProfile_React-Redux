import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({ profile: {
    user: { _id, name, avatar },
    company,
    role,
    location,
    skillset
} }) => {
    return (
        <div className="profile bg-light">
            <img className="round-img" src={avatar} alt="" />
            <div>
                <h2>{name}</h2>
                <p>{role} {company && <span> at {company}</span>}</p>
                <p>{location}</p>
                <Link to={`/profile/${_id}`} className="btn btn-primary">View Profile</Link>
            </div>
            <ul>
                {skillset.slice(0, 7).map((skill, index) => (
                    <li key={index} className="text-primary">
                        <i className="fas fa-check" style={{ marginRight: '5px' }}></i>
                        {skill}
                    </li>
                ))}
            </ul>
        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
};


export default ProfileItem;