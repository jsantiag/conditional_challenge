import React, {Component}from 'react';
import Dropdown from 'react-dropdown';
import '../styling/control-row.css';


class ControlRow extends Component {
    constructor (props) {
        super(props);
        this.onSelectProp = this.onSelectProp.bind(this)
        this.onSelectOp = this.onSelectOp.bind(this)
        this.onSelectPropVal = this.onSelectPropVal.bind(this)
        this.onFilterClear = this.onFilterClear.bind(this)
        this.updatePropertyValue = this.updatePropertyValue.bind(this)
      }

      onSelectProp (option) {
        this.props.handlers.onSelectProperty(option)
      }
      onSelectOp (option) {
        this.props.handlers.onSelectOperator(option)
      }
      onSelectPropVal (option) {
        this.props.handlers.onSelectPropertyVal(option)
      }
      onFilterClear(e){
        this.props.handlers.onFilterClear(e)
      }
      updatePropertyValue(event){
        event.preventDefault();
        this.props.handlers.updatePropertyValue(event)
      }

      render () {
          const props = this.props
          // const [defaultProperty, defaultOperation, defaultPropVal] = [this.props.propertySelect, this.props.operatorSelect, this.props.propertyValueSelect]
         return(
            <div className="ControlRow">
                <div className="FilterProp">
                    <Dropdown className="PropertySelect" options={props.elements.properties} onChange={this.onSelectProp} value={props.filter.propertySelect} placeholder="Select a property"></Dropdown>
                </div>
                {props.filterToggle ? 
                <div className="FilterOp">
                    <Dropdown className="OperatorSelect" options={props.elements.operators} onChange={this.onSelectOp} value={props.filter.operatorSelect} placeholder="Select an operator"></Dropdown>
                </div>
                :
                null}
                {(props.filterToggle && !['','Has any value','Has no value'].includes(props.filter.operatorSelect)) ? 
                (['Is any of','Contains'].includes(props.filter.operatorSelect)? 
                <div className="FilterPropVal">
                      <label>Enter single value or multiple comma separated values:</label>
                  <input className="PropValSelect" type="text" value={props.filter.propertyValueSelect}  onChange={this.updatePropertyValue} ></input>
                </div>  
                :
                <div className="FilterPropVal">
                    <Dropdown className="PropValSelect" options={props.elements.productValues} onChange={this.onSelectPropVal} value={props.filter.propertyValueSelect} placeholder="Select a property value"></Dropdown>
                </div> )
                  :
                  null}                
                  <div>
                 {
                  props.filterToggle && props.filter.operatorSelect?   
                  <button className="FilterClear" onClick={this.onFilterClear}>
                    clear filter
                  </button>
                  :
                  null
                 }
                </div>
            </div>
        ) 
    }
  }
  

export default ControlRow; 