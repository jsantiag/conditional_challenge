import React from 'react';
import '../styling/product-list.css'
// currently functioning list of products unfiltered  

const ProductList = (props) => {
      const [headers, products] = [props.headers, props.products] 
      const headerList = headers.map((property, i)=> <th key={`${property} ${i}`}>{property}</th>)
      const productList = products.map((prod,i)=> 
      <tr key={`product-${i}${prod.property_values[0].value}`}>
      {prod.property_values.map((prop_val, i)=> <td key={`${prop_val.value} ${headerList[i].id}`}>{prop_val.value}</td>)}
      </tr>)

      return (
      <div key={"ProductList-table"}className="ProductList">

        <table className="TableClass">

         <thead className="Headers">
            <tr key={'table-headers'}> 
              {headerList}
            </tr> 
          </thead>

          <tbody className="Products">
            {productList}
          </tbody>
        
       </table>
      </div>
    );
  }


export default ProductList;
