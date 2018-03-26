import React from 'react';
import PropTypes from 'prop-types';
import dwv from 'dwv';

// gui overrides

// decode query
dwv.utils.decodeQuery = dwv.utils.base.decodeQuery;
// progress
dwv.gui.displayProgress = function () {};
// window
dwv.gui.getWindowSize = dwv.gui.base.getWindowSize;
// get element
dwv.gui.getElement = dwv.gui.base.getElement;
// refresh element
dwv.gui.refreshElement = dwv.gui.base.refreshElement;

class DwvApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      legend: 'Powered by dwv ' + dwv.getVersion() + ' and React ' + React.version
    };
  }

  render() {
    const {id, label, instructions} = this.props;
    return (
      <div id={id}>
      <div className="legend">Instructions: {instructions}</div>
        <div className="button-row">
          <button value="Scroll" onClick={this.onClick.bind(this)}>Scroll</button>
          <button value="WindowLevel" onClick={this.onClick.bind(this)}>WindowLevel</button>
          <button value="ZoomAndPan" onClick={this.onClick.bind(this)}>ZoomAndPan</button>
          <button value="Livewire" onClick={this.onClick.bind(this)}>Livewire</button>
        </div>
        <div className="layerContainer">
          <div className="dropBox"></div>
          <canvas className="imageLayer">Only for HTML5 compatible browsers...</canvas>
        </div>
        <div className="legend">{label}</div>
      </div>
    );
  }

  componentDidMount() {
    const id = this.props[0];
    // create app
    var app = new dwv.App();
    // initialise app
    app.init({
      'containerDivId': id,
      'fitToWindow': true,
      //'gui': ['tool', 'load', 'help', 'undo', 'version', 'tags', 'drawList'],
      //'tools': ['Scroll', 'ZoomAndPan', 'WindowLevel'],
      'loaders': ['File', 'Url', 'GoogleDrive', 'Dropbox'],
      'tools': ['Scroll', 'WindowLevel', 'ZoomAndPan', 'Draw', 'Livewire', 'Floodfill'],
      'isMobile': true,
      //'filters': ['Threshold', 'Sharpen', 'Sobel'],
      'shapes': ['Arrow', 'Ruler', 'Protractor', 'Rectangle', 'Roi', 'Ellipse', 'FreeHand']
    });
    // store
    this.setState({dwvApp: app});
  }

  onClick(event) {
    if ( this.state.dwvApp ) {
      this.state.dwvApp.onChangeTool(event);
    }
  }

}

DwvApp.propTypes = {
    /**
     * The ID used to identify this compnent in Dash callbacks
     */
    id: PropTypes.string,

    /**
     * A label that will be printed when this component is rendered.
     */
    label: PropTypes.string.isRequired,

    /**
     * The value displayed in the input
     */
    instructions: PropTypes.string
};

DwvApp.defaultProps = {
    label: 'Click whatever you want to!',
    instructions: 'Just do it!'
}

export default DwvApp;
