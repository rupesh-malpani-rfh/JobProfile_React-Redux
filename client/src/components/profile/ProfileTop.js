import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
    profile: {
        company,
        location,
        email,
        phone,
        role,
        social,
        user: {
            name,
            avatar
        }
    }
}) => {
    return (
        <div className="bg-primary p-2 align-center my-1">
            <img
                className="complete-round-img my-1"
                src={avatar}
                alt=""
                style={{ width: '250px' }}
            />

            <h1 className="text-x-large">{name}</h1>
            <p className="lead">{role} at {company}</p>
            <p className="lead"><i className="fa fa-map-marker" style={{ marginRight: '5px' }}></i>{location}</p>
            <p className="lead"><i className="fa fa-envelope" style={{ marginRight: '5px' }}></i>{email}</p>
            <p className="lead"><i className="fa fa-phone-square" style={{ marginRight: '5px' }}></i>{phone}</p>
            <div className="icons">
                {
                    social && social.twitter && (
                        <a href={social.twitter} target="_blank">
                            <i className="fab fa-twitter fa-2x"></i>
                        </a>
                    )
                }
                {
                    social && social.facebook && (
                        <a href={social.facebook} target="_blank">
                            <i className="fab fa-facebook fa-2x"></i>
                        </a>
                    )
                }
                {
                    social && social.youtube && (
                        <a href={social.youtube} target="_blank">
                            <i className="fab fa-youtube fa-2x"></i>
                        </a>
                    )
                }
                {
                    social && social.linkedin && (
                        <a href={social.linkedin} target="_blank">
                            <i className="fab fa-linkedin fa-2x"></i>
                        </a>
                    )
                }
                {
                    social && social.instagram && (
                        <a href={social.instagram} target="_blank">
                            <i className="fab fa-instagram fa-2x"></i>
                        </a>
                    )
                }
            </div>
        </div>
    )
}

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired
};

export default ProfileTop;