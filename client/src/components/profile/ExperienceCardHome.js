import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import ExperienceCard from './ExperienceCard';

const ExperienceCardHome = ({ property }) => {

    return (
        <section>
            {/* <div className="exp-card my-1">
                <h3>{company}</h3>
                <p><strong>Location: </strong> {joblocation}</p>
                <Moment format='MMMM YYYY'>{fromdate}</Moment> - {' '}
                {
                    todate === null ? ('Current') : (<Moment format='MMMM YYYY'>{todate}</Moment>)
                }
                <p><strong>Position: </strong> {jobtitle}</p>
                <p>
                    <strong>Description: </strong>{description}</p>
            </div> */}
            <TransitionGroup className="card-container my-1">
                <CSSTransition
                    key={property._id}
                    timeout={1000}
                    // timeout={450}
                    classNames="fade"
                >
                    <ExperienceCard property={property} />
                </CSSTransition>

            </TransitionGroup>
        </section>
    );
}

export default ExperienceCardHome;