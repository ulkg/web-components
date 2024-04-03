import React, { Component } from 'react';
// import the custom web component 
import '../web-components/AutoCompleteTextInput';

// AutocompleteText component that wraps the custom auto-complete-text-input web component
export class AutocompleteText extends Component {
  constructor(props) {
    super(props);
    this.autoCompleteTextRef = React.createRef(); //grab a DOM reference to the autocomplete text
  }

  componentDidMount() {
    // map the Web Component properties to the React version of the component
    // current gets the current DOM element attached to the ref
    this.autoCompleteTextRef.current.suggestions = this.props.suggestions;
    this.autoCompleteTextRef.current.placeholder = this.props.placeholder;

    // map the Web Component events to the React version of the component
    if (this.props.onLostFocus) {
      this.autoCompleteTextRef.current.addEventListener('lostFocus', e =>
        this.props.onLostFocus(e) // call any passed functions to the onLostFocus prop for the react component
      );
    }

    if (this.props.onChosenSubject) {
      this.autoCompleteTextRef.current.addEventListener('chosenSubject', e =>
        this.props.onChosenSubject(e)
      );
    }
  }

  // listen for prop updates when one of the props on the React component change
  componentDidUpdate(prevProps) {
    if (this.props.placeholder !== prevProps.placeholder) {
      this.autoCompleteTextRef.current.placeholder = this.props.placeholder;
    }

    if (this.props.suggestions !== prevProps.suggestions) {
      this.autoCompleteTextRef.current.suggestions = this.props.suggestions;
    }
  }

  render() {
    return (
      <auto-complete-text-input ref={this.autoCompleteTextRef}>{this.props.children}</auto-complete-text-input>
    );
  }
}
