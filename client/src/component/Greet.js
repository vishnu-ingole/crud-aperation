import React, { Component } from 'react';
    import axios from 'axios';

    class Greet extends Component {
      constructor(){
        super();
        this.state = {
          productName: '',
          categoryId: '',
  
        };
      }

      onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      }

      onSubmit = (e) => {
        e.preventDefault();
      
        const { productName, categoryId} = this.state;

        axios.post('http://localhost:5000/api/v1/product', {productName,categoryId})
          .then((result) => {
            //access the results here....
          });
      }

      render() {
        const { productName ,categoryId} = this.state;
        return (
          <form onSubmit={this.onSubmit}>
            <label>ProductName</label>
            <input
              type="text"
              name="productName"
              value={productName}
              onChange={this.onChange}
            />
            <label>CatrgoryId</label>
            <input
              type="text"
              name="categoryId"
              value={categoryId}
              onChange={this.onChange}
            />
            
            <button type="submit">Submit</button>
          </form>
        );
      }
    }
  export default Greet;