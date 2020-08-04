import React from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
    profile: {
        bio,
        skillset,
        user: {
            name,
        }
    }
}) => {
    return (
        <div className="bg-light p-2 align-center">
            <h2 className="text-primary">{name.trim().split(' ')[0]} Bio</h2>
            <p>{bio}</p>
            <div className="line"></div>
            <h2 className="text-primary">Skill Set</h2>
            <div className="skills">
                {skillset.slice(0, 7).map((skill, index) => (
                    <div key={index} className="p-1 animate__animated animate__backInDown animate__delay-2s">
                        <i className="fas fa-check" style={{ marginRight: '5px' }}></i>
                        {skill}
                    </div>
                ))}
            </div>
        </div>
    )
}

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired
};

export default ProfileAbout;