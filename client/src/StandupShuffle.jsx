import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore';

class StandupShuffle extends React.Component {
    constructor() {
        super();

        this.state = { 
            people: [], 
            names: '',
            remaining: [],
            currentName: '',
            action: 'empty'
        }

        this.actions = {
            randomlist: 'random list',
            nextname: 'next name',
            empty: 'empty'
        }
    }

    onNameChange = (event) => {
        this.setState({ names: event.target.value });
    }

    getRandomList = () => {
        var lst = _.shuffle(this.state.names.split(","));

        this.setState({ 
            people: lst,
            action: this.actions.randomlist 
        });
    }

    getNextRandomName = () => {
        var lst;

        if (this.state.action === this.actions.empty) {
            lst = _.shuffle(this.state.names.split(","));
        }
        else if (this.state.action === this.actions.randomlist) {
            lst = _.shuffle(this.state.names.split(","));
        }
        else {
            lst = this.state.remaining.map((x) => x);
        }

        var name;

        if (lst.length == 0) {
            name = "That's everyone! You're done!";
        }
        else {
            name = "Current: " + lst.pop();
        }

        this.setState({
            remaining: lst,
            currentName: name,
            action: this.actions.nextname
        })

    }

    getButton = () => {
        let classes = "btn btn-primary";
        let btnDisabled = null;
        let ariaDisabled = null;
        if (this.state.names.trim() === "") {
            btnDisabled = "disabled";
            classes += " disabled-button";
            ariaDisabled = "true";
        }

        return (
            <div>
                <button 
                    type="button" 
                    className={classes}
                    disabled={btnDisabled}
                    onClick={this.getRandomList}
                    aria-disabled={ariaDisabled}
                    >
                        Generate a random list
                </button>
                <span>&nbsp;&nbsp; or &nbsp;&nbsp;</span>
                <button
                    type="button" 
                    className={classes}
                    disabled={btnDisabled}
                    onClick={this.getNextRandomName}
                    aria-disabled={ariaDisabled}
                    >
                    Get next random name
                </button>
            </div>
        )
    }

    render() {
        var people = [];
        var nextName = null;
        if (this.state.action === this.actions.randomlist) {
            people = this.state.people.map( (person, index) => {
                if (person.trim() == "") {
                    return null;
                }
                else {
                    return (
                        <li>
                            <p>{person.trim()}</p>
                        </li>
                    )    
                }
            });    
        }
        else if (this.state.action === this.actions.nextname) {
            nextName = <p>{this.state.currentName}</p>
        }

        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <h1>Standup Shuffle</h1>
                        <p className="lead">Everyone talks over each other or nobody likes going first in your daily standup? Put their names in the list and generate a random order each day!</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <form>
                            <div className="form-group">
                                <label htmlFor="namesList">Comma-separated list of all names: </label>
                                <input type="text" id="namesList" className="form-control" value={this.state.names} onChange={this.onNameChange} />
                            </div>
                            {this.getButton()}
                        </form>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <ul>
                            {people}
                        </ul>
                        {nextName}
                    </div>
                </div>
            </div>
        )
    }
}

var el = document.getElementById("app");
if (el) {
    ReactDOM.render(<StandupShuffle />, el);
}