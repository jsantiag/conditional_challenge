import React, {Component}from 'react';

// currently functioning list of products unfiltered  

class ProductList extends Component {
  
    render(){

      const [headers, products] = [this.props.headers, this.props.products] 
      return (
      <div className="ProductList">
        <table>

         <tbody className="Headers">
            <tr> 
              {headers.map((property)=> <th key={property.id}>{property.name}</th> )}
            </tr> 
          </tbody>

          <tbody className="Products">
            {products.map((product, i)=> 
            <tr key={i}>
            {product.property_values.map((prop_val, i)=> <td key={headers[i].id}>{prop_val.value}</td>)}
            </tr>)}
          </tbody>
        
       </table>
      </div>
    );
  }
}

export default ProductList;
