import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

import ProfileTop from './ProfileTop';
import { getProfileById } from '../../actions/profile';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';

const Profile = ({ match, getProfileById, profile: { profile, loading }, auth }) => {
    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById, match.params.id]);

    return (
        <Fragment>
            {profile === null || loading ? <Spinner /> : <Fragment>
                <Link to='/profiles' className="btn animate__animated animate__bounce animate__slow">Back to Profiles</Link>
                {
                    auth.isAuthenticated && auth.loading === false && auth.user._id ===
                    profile.user._id && <Link to='/edit-profile' className="btn btn-dark">
                        Edit Profile
                    </Link>
                }
                <div className="profile-container">
                    <ProfileTop profile={profile} />
                    <ProfileAbout profile={profile} />
                    <ProfileExperience profile={profile} />
                    <ProfileEducation profile={profile} />
                </div>
            </Fragment>}
        </Fragment>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile)