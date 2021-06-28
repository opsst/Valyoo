import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import User from './User';
import Register from './Register'
import Signout from './Signout'
import Addprod from './Addprod'
import All from './All.component'
import Vproduct from './Vproduct.component'
import Cart from './Cart.component'
import Transaction from './Transaction.component'
import Notpage from './Notpage'
import Profile from './Profile.component'
import Personal from './Personal.component'
import Address from './Address'
import Book from './Book'
import Bill from './Bill';

function App() {
  return (
    <Router>
      <div className="App">
       <Navbar className=""/>
       <div>
       <Switch>
       <Route exact path="/">
          <Home />
       </Route>
       <Route path="/user">
          <User />
       </Route>
       <Route path="/profile/:id" component={Profile}>
       </Route>
       <Route path="/personal/:id" component={Personal}>
       </Route>
       <Route path="/address/:id" component={Address}>
       </Route>
       <Route path="/transaction/:id" component={Bill}>
       </Route>
       <Route path="/book/:id" component={Book}>
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
       {/* <Route path="/all/" component={All}>
       </Route> */}
       <Route path="/all/:filter" component={All}>
       </Route>
       <Route path="/product/:id" component={Vproduct}>
       </Route>
       <Route path="/cart/:id" component={Cart}>
       </Route>
       <Route path="/checkout" component={Transaction}>
       </Route>
       <Route  component={Notpage}></Route>
       </Switch>
       </div>
       
       
      </div>
      <div className="mt-64">
      <Footer/>
      </div>
      
    </Router>
  );
}

export default App;
