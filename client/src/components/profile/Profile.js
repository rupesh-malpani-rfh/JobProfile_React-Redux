import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

import ProfileTop from './ProfileTop';
import { getProfileById } from '../../actions/profile';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import useListCycle from '../../hooks/useListCycle';

const Profile = ({ match, getProfileById, profile: { profile, loading }, auth }) => {
    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById, match.params.id]);

    const [currentExp, setCurrentExp] = useState(0);
    const [currentEdu, setCurrentEdu] = useState(0);

    const nextExp = () => {
        const next = currentExp + 1;
        if (next < profile.experience.length) setCurrentExp(next);
    };

    const prevExp = () => {
        const prev = currentExp - 1;
        if (prev >= 0) setCurrentExp(prev);
    };

    const nextEdu = () => {
        const next = currentEdu + 1;
        if (next < profile.education.length) setCurrentEdu(next);
    };

    const prevEdu = () => {
        const prev = currentEdu - 1;
        if (prev >= 0) setCurrentEdu(prev);
    };

    let sortedExperiences;
    let sortedEducation;
    if (profile) {
        sortedExperiences = profile.experience
            .map(exp => ({
                ...exp,
                sortby: new Date(exp.fromdate)
            }))
            .sort((a, b) => b.sortby - a.sortby);

        sortedEducation = profile.education
            .map(edu => ({
                ...edu,
                sortby: new Date(edu.fromdate)
            }))
            .sort((a, b) => b.sortby - a.sortby);
    }

    const currentExpVar = profile ? sortedExperiences[currentExp] : null;
    const currentEduVar = profile ? sortedEducation[currentEdu] : null;

    // const exp = useListCycle(profile ? sortedExperiences : []);
    // const edu = useListCycle(profile ? sortedEducation : []);

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
                    {/* <ProfileExperience profile={profile} /> */}
                    <div className="profile-exp bg-white p-2 my-1">
                        <h2 className="text-primary">Experiences Details</h2>
                        {profile.experience.length > 0 ? (
                            <Fragment>
                                <ProfileExperience
                                    key={currentExpVar._id}
                                    experience={currentExpVar}
                                // experience={exp.current}
                                />
                                <div className="center-element">
                                    <button className="btn btn-primary" onClick={prevExp} disabled={currentExp <= 0}>
                                        Prev
                                    </button>
                                    <button
                                        onClick={nextExp}
                                        className="btn btn-primary"
                                        disabled={currentExp >= profile.experience.length - 1}
                                    >
                                        Next
                                    </button>
                                </div>
                                {/* <div className="center-element">
                                    <button className="btn btn-primary" onClick={exp.decrement} disabled={!exp.hasPrev}>
                                        Prev
                                    </button>
                                    <button
                                        onClick={exp.increment}
                                        className="btn btn-primary"
                                        disabled={!exp.hasNext}
                                    >
                                        Next
                                    </button>
                                </div> */}
                            </Fragment>
                        ) : (
                                <h4>No experience credentials</h4>
                            )}
                    </div>
                    {/* <ProfileEducation profile={profile} /> */}
                    <div className="profile-edu bg-white p-2 my-1">
                        <h2 className="text-primary">Education Details</h2>
                        {profile.education.length > 0 ? (
                            <Fragment>
                                <ProfileEducation
                                    key={currentEduVar._id}
                                    education={currentEduVar}
                                // education={edu.current}
                                />
                                <div className="center-element">
                                    <button className="btn btn-primary" onClick={prevEdu} disabled={currentEdu <= 0}>
                                        Prev
                                    </button>
                                    <button
                                        onClick={nextEdu}
                                        className="btn btn-primary"
                                        disabled={currentEdu >= profile.education.length - 1}
                                    >
                                        Next
                                    </button>
                                </div>
                                {/* <div className="center-element">
                                    <button className="btn btn-primary" onClick={edu.decrement} disabled={!edu.hasPrev}>
                                        Prev
                                    </button>
                                    <button
                                        onClick={edu.increment}
                                        className="btn btn-primary"
                                        disabled={!edu.hasNext}
                                    >
                                        Next
                                    </button>
                                </div> */}
                            </Fragment>
                        ) : (
                                <h4>No education credentials</h4>
                            )}
                    </div>
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