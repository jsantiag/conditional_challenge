
import datastore from '../datastore';
// import { generateKeyPair } from 'crypto';

const relationships = {
    string: ['Equals', 'Has any value', 'Has no value', 'Is any of', 'Contains'],
    number: ['Equals', 'Is greater than', 'Is less than', 'Has any value', 'Has no value', 'Is any of'],
    enumerated: ['Equals', 'Has any value', 'Has no value', 'Is any of']
}

const helperfunc = {
    'Equals': function equals(prop = '', propVal = '') {
        //using == to be type insensitive, dont want to convert numbers to string for the sake of checking against user inputs
        // eslint-disable-next-line eqeqeq
        return prop == propVal
    }, 
    'Is any of': function isAnyOf(prop, propvals) {
        if (typeof(propvals) === 'string'){
            propvals = propvals.toLowerCase().split(',')
        }
        // expects an array of propvalues to check against an individual propvalue
        return propvals.includes(prop)
    },
    'Contains': function contains(prop, propvals) {
        console.log(prop, propvals)
        const reg = new RegExp(prop, 'gi');
        return propvals.match(reg) !== null 
    },
    'Is greater than': function greaterThan(prop = '', propVal = '') {
        let val = Number(propVal)
        return prop < val
    },
    'Is less than': function lessThan(prop = '', propVal = '') {
        let val = Number(propVal)
        return prop > val
    }
}

function propertyLookup(property) {
    let props = datastore.properties
    const classifier = props.filter((item) => item.name === property).shift().type
    const id = props.filter((item) => item.name === property).shift().id

    // eslint-disable-next-line no-unused-vars
    const propertyFound = { classifier, id }
    return propertyFound
}


export const filterOperators = (property) => {
    return relationships[propertyLookup(property).classifier]
}



export function filterProductVals(property) {
    let products = datastore.products
    let propID = propertyLookup(property).id

    const result = []
    for (let i = 0, l = products.length; i < l; i++) {
        products[i].property_values.map((propval) =>
            propval.property_id !== propID ? null : result.push(products[i].property_values[propID].value))
    }
    let unique = [...new Set(result)]; 

    return unique
}


export function filterProducts(property, operator, propval) {
    console.log(operator)
    const products = datastore.getProducts();
    const propID = propertyLookup(property).id;
    const productList = [];
    for (let i = 0, l = products.length; i < l; i++) {
        if (operator !== ("Has any value" || "Has no value")) {
            const op = helperfunc[operator];
            console.log(op);
            (products[i].property_values.map(propvals => propvals.property_id === propID && op(propval,products[i].property_values[propID].value) ? productList.push(products[i]) : null )
            );
        } else if (operator === "Has any value") { 
            products[i].property_values.map(propvals => propvals.property_id === propID ? productList.push(products[i]) : null ); 

        } else if (operator === "Has no value") { 
            const filtered = products[i].property_values.filter(propvals=> propvals.property_id !== propID);
            // eslint-disable-next-line no-unused-expressions
            (filtered.length === products[i].property_values.length) ? productList.push(products[i]) : null 
        }
      }
      
      return productList;

    }


