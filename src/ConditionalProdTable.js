import React, {Component} from 'react';
import ProductList from './components/ProductList';
import datastore from './datastore';
import ControlRow from './components/ControlRow'; 



class ConditionalProdTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: datastore.getProducts(), 
      properties: datastore.getProperties(),
      operators: datastore.getOperators()
      // filterProducts: 
    };
    this.onSelectOperator = this.onSelectOperator.bind(this)
    this.onSelectProperty = this.onSelectProperty.bind(this)
    this.onSelectPropertyVal = this.onSelectPropertyVal.bind(this)
  }
    onSelectProperty(property){}
    onSelectOperator(operator){}
    onSelectPropertyVal(propertyValue){}

    render() { 
      const [operators, products] = [this.state.operators, this.state.products]
      const propertiesList = this.state.properties.map((property) => property.name)

    return (
      <div className="ConditionalProdTable">
       <ControlRow properties={propertiesList} operators={operators} propertyValues={products}/>
       <ProductList products={products} headers={propertiesList}/>
      </div>
    );
  }
}

export default ConditionalProdTable;
