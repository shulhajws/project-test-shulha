import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
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
                    backgroundImage="/banner-image.jpg" 
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
                    backgroundImage="/banner-image.jpg" 
                  />
                  <PostsList />
                </>
              } 
            />
            {/* Add other routes as needed */}
          </Routes>
        </main>
      </div>
    </Router>
  );
};