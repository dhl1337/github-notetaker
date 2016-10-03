var React = require('react');

var UserProfile = React.createClass({
    propTypes: {
        username: React.PropTypes.string.isRequired,
        bio: React.PropTypes.object.isRequired
    },
    render() {
        return (
            <div>
                <p>
                    User Profile!
                </p>
                <p>{this.props.username}</p>
                <p>{this.props.bio.name}</p>
            </div>
        )
    }
});

module.exports = UserProfile;