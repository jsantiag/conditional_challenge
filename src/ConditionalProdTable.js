/* eslint-disable no-undef */
import React, {Component} from 'react';
import ProductList from './components/ProductList';
import datastore from './datastore';
import ControlRow from './components/ControlRow'; 
import './styling/conditonal-product-table.css';
import {filterOperators,filterProductVals, filterProducts} from './utils/filters.js';



class ConditionalProdTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: datastore.getProducts(), 
      properties: datastore.getProperties(),
      operators: datastore.getOperators(),
      productValues: '',
      filterOn: false,
      filter: 
      {
        propertySelect: '',
        operatorSelect: '', 
        propertyValueSelect: ''
      }
    }   
    this.handleSelectProperty = this.handleSelectProperty.bind(this)
    this.handleSelectOperator = this.handleSelectOperator.bind(this)
    this.handleSelectPropertyVal = this.handleSelectPropertyVal.bind(this)
    this.handleClearFilter = this.handleClearFilter.bind(this)
    this.handleInputPropertyVal = this.handleInputPropertyVal.bind(this)
  }

     initialState = {
      products: datastore.getProducts(), 
      properties: datastore.getProperties(),
      operators: datastore.getOperators(),
      productValues:'',
      filterOn: false,
      filter: 
      {
        propertySelect: '',
        operatorSelect: '', 
        propertyValueSelect: ''
      }
    };

    handleSelectProperty(property){
      this.setState({
        operators: filterOperators(property.value),
        productValues: filterProductVals(property.value),
        filterOn: true,
        filter:{
          propertySelect:property.value,
          operatorSelect: this.state.filter.operatorSelect
        }
      })
    };
    handleInputPropertyVal(event){
      const state = this.state.filter
      this.setState({
        products: filterProducts(state.propertySelect, state.operatorSelect, event.target.value),
        filter:{
          propertySelect: this.state.filter.propertySelect,
          propertyValueSelect: event.target.value,
          operatorSelect: this.state.filter.operatorSelect
        }
      })
    }

    handleSelectOperator(operator){
      operator.value === ("Has any value" || "Has no value") ? 
      this.setState({
        products: filterProducts(state.propertySelect, state.operatorSelect),
        filter:{
          propertySelect: this.state.filter.propertySelect,
          operatorSelect:operator.value
        }
      })
      : 
      this.setState({
        
        filter:{
          propertySelect: this.state.filter.propertySelect,
          operatorSelect:operator.value
        }
      })
      // this.getPropValList()
    };
    handleSelectPropertyVal(propertyValue){
      const state = this.state.filter
      this.setState({
        products: filterProducts(state.propertySelect, state.operatorSelect, propertyValue.value),
        filter:{
          propertySelect: this.state.filter.propertySelect,
          propertyValueSelect: propertyValue.value,
          operatorSelect: this.state.filter.operatorSelect
        }
      })
    };
    handleClearFilter(){
      this.setState(this.initialState)
    }


    render() { 
      console.log(this.state)

      const [filter,filterToggle] = [this.state.filter, this.state.filterOn]
      const elements = {
        operators : this.state.operators, 
        properties : this.state.properties.map((property) => property.name), 
        productValues : this.state.productValues
      }
      const eventHandlers = {
        updatePropertyValue: this.handleInputPropertyVal,
        onSelectProperty:this.handleSelectProperty, 
        onSelectOperator:this.handleSelectOperator, 
        onSelectPropertyVal:this.handleSelectPropertyVal, 
        onFilterClear: this.handleClearFilter
      }
    return (
      <div className="ConditionalProdTable">
       <ControlRow elements={elements} handlers={eventHandlers} filter={filter} filterToggle={filterToggle}/>
       <ProductList products={this.state.products} headers={elements.properties}/>
      </div>
    );
  }
}

export default ConditionalProdTable;
