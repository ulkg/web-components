const template = document.createElement('template');
template.innerHTML = `
<style>

/*CSS RESET*/
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
  font-size: 100%;
  vertical-align: baseline;
}

html {
    line-height: 1;
  }
  
  ol, ul {
    list-style: none;
    background-color: black;
  }

  body {
    background-color: black;
    height: 100%;
    width: 100%;
    font-family:"Lucida Grande", "Lucida Sans Unicode", Tahoma, Sans-Serif;
  }
  #autocomplete-container {
    width: 300px;
  }
  #autocomplete-input {
    background: black;
    -moz-appearance: none;
    -webkit-appearance: none;
    width: 100%;
    padding: 20px 15px;
    outline: none;
    color: white;
    font-size: 20px;
  }
  #autocomplete-input:-webkit-placeholder {
    color: grey;
  }
  #autocomplete-input::-moz-placeholder {
    color: grey;
  }
  #autocomplete-results {
    display: none;
    width: 100%;
    background-color: black;
    margin-top: -2px;
    color: #eee;
  }
  #autocomplete-results li {
    width: 100%;
    padding: 7px 15px;
  }
  #autocomplete-results li:hover {
    background:rgba(105, 111, 118, 0.8);;
  }
</style>
<div id="autocomplete-container">
  <input type="text" autofocus="true" name="autofocus sample" placeholder="Search by Country" id="autocomplete-input"></input>
  <ul id="autocomplete-results">
  </ul>
</div>
`;

export class AutoCompleteTextInput extends HTMLElement {
  // provides the browser a list of attribute names for which the component would like to receive a notification when they change
  // attributeChangedCallback method is called by the browser whenever one of the attributes listed in attributeChangedCallback changes
  static get observedAttributes() {
    return ['placeholder', 'suggestions'];
  }

  set placeholder(value) {
    if (this.searchInputText === undefined || this.searchInputText == null) {
      return;
    }
    this.searchInputText.placeholder = value;
  }

  set suggestions(value) {
    this._suggestions = value;
  }

  constructor() {
    super();
    // create shadow DOM
    // Styles inside a shadow tree are scoped to the shadow tre
    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.appendChild(template.content.cloneNode(true));
    this.placeholder = "autocomplete";
    this.searchInputText = this.shadow.querySelector("input");

    this.updateInputEvent();
    this.selectValueEvent();
    this.lostFocusEvent();
  }

  lostFocusEvent() {
    const searchInputText = this.shadow.querySelector("input");
    searchInputText.addEventListener('blur', () =>
      this.dispatchEvent(new CustomEvent('lostFocus', { detail: searchInputText.value })));
  }

  updateInputEvent() {
    var input = this.shadow.querySelector("input");
    var suggestions_to_show = [];
    var autocomplete_results = this.shadow.getElementById("autocomplete-results");
    var that = this;

    input.addEventListener('keyup', function () {
      const input_val = input.value.toLowerCase();

      if (input_val.length <= 0) {
        suggestions_to_show = [];
        autocomplete_results.innerHTML = "";
        return;
      }

      autocomplete_results.innerHTML = "";
      suggestions_to_show = that.autocomplete(input_val);

      suggestions_to_show.forEach((value, i) => {
        autocomplete_results.innerHTML +=
          "<li id=" +
          suggestions_to_show[i] +
          ' class="list-item">' +
          suggestions_to_show[i] +
          "</li>";
      });
      autocomplete_results.style.display = "block";
    });
  }

  selectValueEvent() {
    var autocomplete_results = this.shadow.getElementById("autocomplete-results");
    var input = this.shadow.querySelector("input");
    var that = this;
    autocomplete_results.addEventListener('click', function (event) {
      const target = event.target;
      // event.target is the element that was clicked, if it was a list item output the value
      if (target && target.nodeName === "LI") {
        that.dispatchEvent(new CustomEvent('chosenSubject', { detail: target.innerHTML }));
        input.value = target.innerHTML;
        autocomplete_results.innerHTML = null; //empty the value
      }
    });
  }

  autocomplete(val) {
    var suggestions_returned = [];

    this._suggestions.forEach((value, i) => {
      if (val === this._suggestions[i].toLowerCase().slice(0, val.length)) {
        suggestions_returned.push(this._suggestions[i]);
      }
    })

    return suggestions_returned;
  }
}

// Create a auto-complete-text-input as an autonomous custom element
window.customElements.define('auto-complete-text-input', AutoCompleteTextInput);