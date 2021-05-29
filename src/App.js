import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import User from './User';
import Register from './Register'
import Signout from './Signout'
import Addprod from './Addprod'
import All from './All.component'
import Vproduct from './Vproduct.component'
import Cart from './Cart'

function App() {
  return (
    <Router>
      <div className="App ">
       <Navbar />
       <Switch>
       <Route exact path="/">
          <Home />
       </Route>
       <Route path="/user">
          <User />
       </Route>
       <Route path="/register">
         <Register />
       </Route>
       <Route path="/signout">
        <Signout />
       </Route>
       <Route path="/test">
        <Addprod />
       </Route>
       <Route path="/all" component={All}>
       </Route>
       <Route path="/product/:id" component={Vproduct}>
       </Route>
       <Route path="/cart">
         <Cart />
       </Route>
       </Switch>
       
      </div>
    </Router>
  );
}

export default App;
