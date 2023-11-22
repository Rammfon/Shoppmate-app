import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShoppingListDetail from './components/ShoppingListDetail';
import ShoppingListOverview from './components/ShoppingListOverview';
import Header from './components/Header';
import Footer from './components/Footer';
import "./App.css"

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <div className="content">
        <Routes>
  <Route path="/" element={<ShoppingListOverview />} />
  <Route path= "/api/shopping-lists/:id" element={<ShoppingListDetail />} />
</Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );  
}

export default App;
