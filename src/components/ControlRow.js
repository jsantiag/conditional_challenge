import React, {Component}from 'react';
import Dropdown from 'react-dropdown';


class ControlRow extends Component {
    constructor (props) {
        super(props)
        this.state = {
          propertySelect: '',
          operatorSelect: '', 
          propertyValueSelect: ''
        }
        this.onSelectProp = this.onSelectProp.bind(this)
        this.onSelectOp = this.onSelectOp.bind(this)
        // this.onSelectPropVal = this.onSelectPropVal.bind(this)
      }
    
      onSelectProp (property) {
        console.log('You selected ', property.label)
        this.setState({propertySelect: property})
      }
      onSelectOp (operator) {
        console.log('You selected ', operator.label)
        this.setState({operatorSelect: operator}) 
      }
    //   onSelectPropVal (option) {
    //     console.log('You selected ', option.label)
    //     this.setState({propertyValueSelect: option}) 
    //   }
      render () {
          const [defaultProperty, defaultOperation ] = [this.state.propertySelect, this.state.operatorSelect]
          console.log(this.props.operators)
          const operators = this.props.operators.map((op)=> op.text)

        //   defaultPropVal =this.state.propertyValueSelect
        //   const propVals = this.props.propertyValues.map((prod)=> prod.property_values.map((propval)=> propval.value))
         return(
            <div className="ControlRow">
                <div className="FilterProp">
                    <Dropdown className="PropertySelect" options={this.props.properties} onChange={this.onSelect} value={defaultProperty} placeholder="Select a property"></Dropdown>
                </div>
                <div className="FilterOp">
                    <Dropdown className="OperatorSelect" options={operators} onChange={this.onSelect} value={defaultOperation} placeholder="Select an operator"></Dropdown>
                </div>
                {/* <div className="FilterPropVal">
                    <Dropdown className="PropValSelect" propVals={propVals} onChange={this.onSelect} value={defaultPropVal} placeholder="Select a property value"></Dropdown>
                </div> */}
            </div>
        ) 
    }
  }
  

export default ControlRow; 