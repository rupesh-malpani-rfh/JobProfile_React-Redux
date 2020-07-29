import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createProfile } from '../../actions/profile';

const CreateProfile = ({ createProfile, history }) => {
    const [formData, setFormData] = useState({
        company: '',
        website: '',
        location: '',
        email: '',
        phone: '',
        role: '',
        skillset: '',
        bio: '',
        githubusername: '',
        twitter: '',
        facebook: '',
        youtube: '',
        linkedin: '',
        instagram: ''
    });

    const {
        company,
        website,
        location,
        email,
        phone,
        role,
        skillset,
        bio,
        githubusername,
        twitter,
        facebook,
        youtube,
        linkedin,
        instagram
    } = formData;

    const [socialInputs, toggleSocialInputs] = useState(false);

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = async e => {
        e.preventDefault();
        createProfile(formData, history);
    }

    return (
        <Fragment>
            <h1 className="text-large text-primary">
                Create Your Profile
        </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Let's get some information to make your
            profile stand out
        </p>
            <small>* = required fields</small>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <select name="role" value={role} onChange={e => onChange(e)}>
                        <option value="0">* Select Professional Status</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Developer">Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Principle Software Engineer">Principle Software Engineer</option>
                        <option value="Manager">Manager</option>
                        <option value="Senior Manager">Senior Manager</option>
                        <option value="Architect">Architect</option>
                        <option value="Director">Director</option>
                        <option value="Other">Other</option>
                    </select>
                    <small className="form-text">Give us an idea of where you are at in your career</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Company" name="company" value={company} onChange={e => onChange(e)} />
                    <small className="form-text">Could be your own company or one you work for</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Website" name="website" value={website} onChange={e => onChange(e)} />
                    <small className="form-text">Could be your own or a company website</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Location" name="location" value={location} onChange={e => onChange(e)} />
                    <small className="form-text">City & state suggested (eg. Boston, MA)</small>
                </div>
                <div className="form-group">
                    <input type="email" placeholder="* Email" name="email" value={email} onChange={e => onChange(e)} />
                    <small className="form-text">Please enter your E-mail Id.</small>
                </div>
                <div className="form-group">
                    <input type="number" placeholder="* Contact No" name="phone" value={phone} onChange={e => onChange(e)} />
                    <small className="form-text">Please enter your E-mail Id.</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Skills" name="skillset" value={skillset} onChange={e => onChange(e)} />
                    <small className="form-text">Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP)</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Github Username" name="githubusername" value={githubusername} onChange={e => onChange(e)} />
                    <small className="form-text">If you want your latest repos and a Github link, include your
                    username</small>
                </div>
                <div className="form-group">
                    <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={e => onChange(e)}></textarea>
                    <small className="form-text">Tell us a little about yourself</small>
                </div>

                <div className="my-2">
                    <button onClick={() => toggleSocialInputs(!socialInputs)} type="button" className="btn">
                        Add Social Network Links
                </button>
                    <span>Optional</span>
                </div>
                {
                    socialInputs && (
                        <Fragment>
                            <div className='form-group social-input'>
                                <i className='fab fa-twitter fa-2x' />
                                <input
                                    type='text'
                                    placeholder='Twitter URL'
                                    name='twitter'
                                    value={twitter}
                                    onChange={e => onChange(e)}
                                />
                            </div>

                            <div className='form-group social-input'>
                                <i className='fab fa-facebook fa-2x' />
                                <input
                                    type='text'
                                    placeholder='Facebook URL'
                                    name='facebook'
                                    value={facebook}
                                    onChange={e => onChange(e)}
                                />
                            </div>

                            <div className='form-group social-input'>
                                <i className='fab fa-youtube fa-2x' />
                                <input
                                    type='text'
                                    placeholder='YouTube URL'
                                    name='youtube'
                                    value={youtube}
                                    onChange={e => onChange(e)}
                                />
                            </div>

                            <div className='form-group social-input'>
                                <i className='fab fa-linkedin fa-2x' />
                                <input
                                    type='text'
                                    placeholder='Linkedin URL'
                                    name='linkedin'
                                    value={linkedin}
                                    onChange={e => onChange(e)}
                                />
                            </div>

                            <div className='form-group social-input'>
                                <i className='fab fa-instagram fa-2x' />
                                <input
                                    type='text'
                                    placeholder='Instagram URL'
                                    name='instagram'
                                    value={instagram}
                                    onChange={e => onChange(e)}
                                />
                            </div>
                        </Fragment>
                    )
                }
                <input type="submit" className="btn btn-primary my-1" />
                <Link className='btn btn-light my-1' to='/dashboard'>
                    Go Back
                </Link>
            </form>
        </Fragment >
    )
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired
};

export default connect(null, { createProfile })(withRouter(CreateProfile))