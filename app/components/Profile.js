var React = require('react');
var Router = require('react-router');
var Repos = require('./Github/Repos');
var UserProfile = require('./Github/UserProfile');
var Notes = require('./Notes/Notes');
var helpers = require('../utils/helpers');
import getGithubInfo from '../utils/helpers';

var Profile = React.createClass({
    mixins: [ReactFireMixin],
    getInitialState() {
        return {
            notes: [],
            bio: {},
            repos: []
        }
    },
    componentDidMount() {
        this.ref = new Firebase('https://github-note-taker.firebaseio.com/');
        this.init(this.props.params.username);
    },
    componentWillReceiveProps(nextProps) {
        this.unbind('notes');
        this.init(nextProps.params.username)
    },
    componentWillUnmount() {
        this.unbind('notes')
    },
    init(username) {
        var childRef = this.ref.child(username);
        this.bindAsArray(childRef, 'notes');

        getGithubInfo(username)
            .then(function (data)  {
                this.setState({
                    bio: data.bio,
                    repos: data.repos
                })
            }.bind(this))
    },
    handleAddNote(newNote) {
        this.ref.child(this.props.params.username).child(this.state.notes.length).set(newNote)
    },
    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <UserProfile username={this.props.params.username} bio={this.state.bio}/>
                </div>
                <div className="col-md-4">
                    <Repos username={this.props.params.username} repos={this.state.repos}/>
                </div>
                <div className="col-md-4">
                    <Notes
                        username={this.props.params.username}
                        notes={this.state.notes}
                        addNote={this.handleAddNote}
                    />
                </div>
            </div>
        )
    }
});

module.exports = Profile;