import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Greet from './component/Greet'
import Category from './component/Category'

class App extends Component {

  state = {

    posts: []

  }



  doSomething = (e) => {
    axios.get(`http://localhost:5000/api/v1/product`)
    .then(response => response.data).then(
      (result) => {
        this.setState({
          posts: result.data
        });
      },
      (error) => {
        this.setState({ error });
      }
    )

  }
  
  render() {
    const result = this.state.posts.map(item => (<tr key={item.productId}>
      <td>{item.productId}</td>
      <td>{item.productName}</td>
      <td>{item.categoryName}</td>
      <td>{item.categoryId}</td>
      <td />
    </tr>))
      
      return (
        <div className="container">
          <h1>Simple Table</h1>
          <table>
            <thead>
              <tr>
                <th> ProductId</th>
                <th> ProductName</th>
                <th> CategoryName</th>
                <th> CategoryId</th>
              </tr>
            </thead>
            <tbody>
             
              {result}
            </tbody>
          </table>

          <Greet/>
          <br/>
          <Category/>
          <button onClick={this.doSomething}>FetchRecord</button>
        </div>
      );
    }
}

export default App;
