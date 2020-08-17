// import React, { Component } from 'react';
// import { CSSTransition } from 'react-transition-group'
// import ExperienceCardHome from './ExperienceCardHome';

// class ProfileExperience extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             appearCard: true,
//             properties: this.props.profile.experience,
//             property: this.props.profile.experience[0],
//             current: 0
//         }
//     }

//     nextCard = () => {
//         // const newIndex = this.state.property.index + 1;
//         const newIndex = ++this.state.current;
//         this.setState({
//             property: this.props.profile.experience[newIndex]
//         })
//     }

//     prevCard = () => {
//         // const newIndex = this.state.property.index - 1;
//         const newIndex = --this.state.current;
//         this.setState({
//             property: this.props.profile.experience[newIndex]
//         })
//     }

//     render() {
//         const { properties, property, appearCard } = this.state;
//         return (
//             <div className="profile-exp bg-white p-2 my-1">
//                 <h2 className="text-primary">Experiences Details</h2>
//                 <CSSTransition
//                     in={appearCard}
//                     appear={true}
//                     timeout={1000}
//                     classNames="fade"
//                 >
//                     <ExperienceCardHome property={property} />
//                 </CSSTransition>
//                 <div className="center-element">
//                     <button
//                         className="btn btn-primary"
//                         onClick={() => this.prevCard()}
//                         disabled={this.state.current === 0}
//                     >
//                         Previous
//                     </button>
//                     <button
//                         className="btn btn-primary"
//                         onClick={() => this.nextCard()}
//                         disabled={this.state.current === this.props.profile.experience.length - 1}
//                     >
//                         Next
//                     </button>
//                 </div>
//             </div>
//         )
//     }
// }

// export default ProfileExperience;

// import React from 'react';
// import Moment from 'react-moment';
// import PropTypes from 'prop-types';

// const ProfileExperience = ({
//     company,
//     joblocation,
//     fromdate,
//     todate,
//     jobtitle,
//     description
// }) => {

//     return (
//         <div>
//             <div className="my-1">
//                 <p><strong>Company: </strong> {company}</p>
//                 <p><strong>Location: </strong> {joblocation}</p>
//                 <Moment format='MMMM YYYY'>{fromdate}</Moment> - {' '}
//                 {
//                     todate === null ? ('Current') : (<Moment format='MMMM YYYY'>{todate}</Moment>)
//                 }
//                 <p><strong>Position: </strong> {jobtitle}</p>
//                 <p>
//                     <strong>Description: </strong>{description}</p>
//             </div>
//         </div>
//     );
// }

// ProfileExperience.propTypes = {
//     experience: PropTypes.object.isRequired
// }

// export default ProfileExperience;

import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';

const ProfileExperience = ({
    experience: { company,
        joblocation,
        fromdate,
        todate,
        jobtitle,
        description }
}) => (
        <div className="my-1">
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
    );

ProfileExperience.propTypes = {
    experience: PropTypes.object.isRequired
};

export default ProfileExperience;