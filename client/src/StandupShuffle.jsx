import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore';

class StandupShuffle extends React.Component {
    constructor() {
        super();

        this.state = { people: [], names: '' }
    }

    randomize = () => {
        this.setState({ people: _.shuffle(this.state.names.split(",")) });
    }

    onNameChange = (event) => {
        this.setState({ names: event.target.value });
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
            <button 
                type="button" 
                className={classes}
                disabled={btnDisabled}
                onClick={this.randomize}
                aria-disabled={ariaDisabled}
                >
                    Randomize
            </button>
        )
    }

    render() {
        var people = this.state.people.map( (person, index) => {
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
                                <label for="namesList">Comma-separated list of all names: </label>
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