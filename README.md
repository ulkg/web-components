# Web Components
A web component was created for the auto-complete text input, which contains the following properties 
properties:
- Both a placeholder and the suggestions of the auto-complete text box can be specified as input parameters.
input parameters can be provided
```
static get observedAttributes() {
 return ['placeholder', 'suggestions'];
}
```
- A CustomEvent called lostFocus is dispatched whenever the focus is lost for the text input 
is lost (e.g. tab is pressed or clicked outside)
```
searchInputText.addEventListener('blur', () =>
    this.dispatchEvent(new CustomEvent('lostFocus', { detail: searchInputText.value }))
);
```
- A CustomEvent called chosenSubject is dispatched when a selection is made in the dropdown that appears. 
dropdown is selected
```
that.dispatchEvent(new CustomEvent('chosenSubject', { detail: target.innerHTML}));
```
The web component contains the necessary logic to evaluate key-up and click events in the autocomplete textbox. This is how the ``<auto-complete-text-input .../>`` custom HTML component can be created.

## Web component in Angular
Angular has two different syntax parts for binding to properties and events. These can 
also be used for web components.
Using property binding in square brackets, properties of the web component can be 
can be defined, for example the placeholder and suggestions (defined in AppComponent):
```
[placeholder]="placeholder" [suggestions]="suggestions"
```
In the event syntax, DOM events as well as Angular and Web Component events can be listened to. These events can be bound to, for example, whether the focus was lost or a selection has been made (handleLostFocus and handleSelection methods in the AppComponent):
```
(lostFocus)="handleLostFocus($event)" (chosenSubject)="handleSelection($event)"
```

## Web component in React
The React system does not use a built-in custom browser event, which means that web components 
components cannot communicate directly with React components. Therefore wrapper components must be created that wrap around the web components.
In the componentDidMount() life cycle hook, the Web Component properties and events are mapped to the 
React version of the component. The current reference to the DOMElement is obtained with current.
```
 this.autoCompleteTextRef.current.suggestions = this.props.suggestions;
 this.autoCompleteTextRef.current.placeholder = this.props.placeholder;
 if (this.props.onLostFocus) {
 this.autoCompleteTextRef.current.addEventListener('lostFocus', e =>
 this.props.onLostFocus(e)
 );
 }
```
This React Wrapper Component can then be called with the corresponding status properties and 
events can be called:
```
<AutocompleteText placeholder={this.state.placeholder} suggestions={this.state.sugge
stions} onLostFocus={this.handleLostFocus} onChosenSubject={this.handleSelection}>
</AutocompleteText>
```

## Tutorials used:

Javascript auto-complete with vanilla JS
https://codepen.io/amit-mb/pen/dJpZJp
Web components:
https://www.webcomponents.org/specs
Angular:
https://www.grapecity.com/blogs/using-web-components-in-angular
https://coryrylan.com/blog/using-web-components-in-angular
React:
https://coryrylan.com/blog/using-web-components-in-react
https://www.grapecity.com/blogs/using-web-components-with-react-201
