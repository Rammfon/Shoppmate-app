
import './App.css';
import ShoppingListDetail from './components/ShoppingListDetail';
import Header from './components/Header';
import Footer from './components/Footer';






function App() {
  return (
    <div className="container">
    <Header />
    <div className="content">
      <ShoppingListDetail />
    </div>
    <Footer />
  </div>
);
}

export default App;
