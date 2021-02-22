import React, { Component } from 'react';
    import axios from 'axios';

    class Category extends Component {
      constructor(){
        super();
        this.state = {
          categoryName: ''
        };
      }

      onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      }

      onSubmit = (e) => {
        e.preventDefault();
      
        const { categoryName } = this.state;

        axios.post('http://localhost:5000/api/v1/category', { categoryName})
          .then((result) => {
            console.log(result);
            
          });
      }

      render() {
        const { categoryName} = this.state;
        return (
          <form onSubmit={this.onSubmit}>
            <label>CategoryName</label>
            <input
              type="text"
              name="categoryName"
              value={categoryName}
              onChange={this.onChange}
            />
            <button type="submit">Category-Submit</button>
          </form>
        );
      }
    }
  export default Category;