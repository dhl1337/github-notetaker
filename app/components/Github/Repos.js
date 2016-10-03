var React = require('react');

var Repos = React.createClass({
    propTypes: {
        username: React.PropTypes.string.isRequired,
        repos: React.PropTypes.array.isRequired
    },
    render() {
        return (
            <div>
                <p>Repots</p>

            </div>
        )
    }
});

module.exports = Repos;