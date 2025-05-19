import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Banner from './components/Banner';
import PostsList from './components/PostsList';
const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        
        <main>
          <Routes>
            <Route 
              path="/" 
              element={
                <>
                  <Banner 
                    title="Ideas" 
                    subtitle="Where all our great things begin" 
                    backgroundImage="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80" 
                  />
                  <PostsList />
                </>
              } 
            />
            <Route 
              path="/ideas" 
              element={
                <>
                  <Banner 
                    title="Ideas" 
                    subtitle="Where all our great things begin" 
                    backgroundImage="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80" 
                  />
                  <PostsList />
                </>
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;