import React, { Component } from 'react';
import { AutocompleteText } from './components/AutocompleteText.js';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            placeholder: 'Enter something...',
            suggestions: ['Advanced IT Project Management', 'Advanced Modeling', 'Advanced Software Testing', 'Führung von verteilten, multikulturellen und inernationalen Teams', 'Funktionale Programmierung', 'Requirements Engineering',
                'Softwarearchitektur', 'Software Engineering', 'User Centered Design', 'Advanced Software Quality Mangement', 'Software Frameworks']

        };
        // bind to this component
        this.handleLostFocus = this.handleLostFocus.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
    }

    render() {
        return (
            <div>
                <h1>Autocomplete text input using Web Components</h1>
                <AutocompleteText placeholder={this.state.placeholder} suggestions={this.state.suggestions}
                    onLostFocus={this.handleLostFocus} onChosenSubject={this.handleSelection}></AutocompleteText>

                <p>{(this.state.lostFocus === '' && this.state.chosenSubject === '') ? 'You lost focus without providing any input.' : ''}</p>
                <p>{(this.state.lostFocus !== '' && this.state.chosenSubject === '') ? 'You lost focus and entered:' + this.state.lostFocus : ''}</p>
                <p>{(this.state.chosenSubject && this.state.chosenSubject !== 'Software Frameworks') ?
                    'You selected ' + this.state.chosenSubject + ', but actually you wanted to select Software Frameworks' : ''}</p>
                <p>{(this.state.chosenSubject && this.state.chosenSubject === 'Software Frameworks') ?
                    'You did the only right thing and selected ' + this.state.chosenSubject : ''}</p>
            </div>
        );
    }

    // called when custom lostFocus event was dispatched
    handleLostFocus(e) {
        this.setState({ lostFocus: e.detail, chosenSubject: ''});
    }

    // called when custom chosenSubject event was dispatched
    handleSelection(e) {
        this.setState({ chosenSubject: e.detail });
    }
}

export default App;
