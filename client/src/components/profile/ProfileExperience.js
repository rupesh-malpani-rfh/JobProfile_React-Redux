import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group'
import ExperienceCardHome from './ExperienceCardHome';

class ProfileExperience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appearCard: true,
            properties: this.props.profile.experience,
            property: this.props.profile.experience[0],
            current: 0
        }
    }

    nextCard = () => {
        // const newIndex = this.state.property.index + 1;
        const newIndex = ++this.state.current;
        this.setState({
            property: this.props.profile.experience[newIndex]
        })
    }

    prevCard = () => {
        // const newIndex = this.state.property.index - 1;
        const newIndex = --this.state.current;
        this.setState({
            property: this.props.profile.experience[newIndex]
        })
    }

    render() {
        const { properties, property, appearCard } = this.state;
        return (
            <div className="profile-exp bg-white p-2 my-1">
                <h2 className="text-primary">Experiences Details</h2>
                <CSSTransition
                    in={appearCard}
                    appear={true}
                    timeout={1000}
                    classNames="fade"
                >
                    <ExperienceCardHome property={property} />
                </CSSTransition>
                <div className="center-element">
                    <button
                        className="btn btn-primary"
                        onClick={() => this.prevCard()}
                        disabled={this.state.current === 0}
                    >
                        Previous
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => this.nextCard()}
                        disabled={this.state.current === this.props.profile.experience.length - 1}
                    >
                        Next
                    </button>
                </div>
            </div>
        )
    }
}

export default ProfileExperience;