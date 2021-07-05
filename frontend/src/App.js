import React, { Component } from 'react'
import Header from './component/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import FavoriteCharacters from './component/favorite/FavoriteCharacters';
import Main from './component/main/Main';

export class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <BrowserRouter>
          <Switch>
            <Route exact path='/'>
              <Main />
            </Route>
            <Route exact path='/favorite'>
              <FavoriteCharacters />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
