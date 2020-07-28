import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Alert = ({ alerts }) =>
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => (
        <div key={alert.id} className={`alert my-1 alert-${alert.alertType}`}>
            {alert.alertMsg}
        </div>
    ));

Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(Alert)

// import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

// const Alert = ({ alerts }) =>
//     alerts !== null &&
//     alerts.length > 0 &&
//     alerts.map(alert => (
//         <div key={alert.id} className={`alert alert-${alert.alertType}`}>
//             {alert.alertMsg}
//         </div>
//     ));

// Alert.propTypes = {
//     alerts: PropTypes.array.isRequired
// };

// const mapStateToProps = state => ({
//     alerts: state.alert
// });

// export default connect(mapStateToProps)(Alert);
