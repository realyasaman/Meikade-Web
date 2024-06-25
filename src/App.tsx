import React from 'react';
import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom';
import './App.css';
import './index.css';
import { Poets } from "./pages/Poets";
import { useState, createContext } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Poet } from './pages/Poet';
import { Book } from './pages/Book';
import { PoemsBook } from './pages/PoemsBook';
import { Poem } from './pages/Poem';
import { Home } from './pages/Home';

export const AppContext = createContext({} as any);

function App() {

  const client = new QueryClient({defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
    }
  }});

  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <AppContext.Provider value={{}}>
          <Router>
            <Routes>
              <Route path = "/poets" element = {<Poets />} />
              <Route path = "/poet/:poet_id" element = {<Poet />} />
              <Route path = "/poet/:poet_id/book/:book_id" element = {<Book />} />
              <Route path = "/poet/:poet_id/book/:poems_book_id/poems" element = {<PoemsBook />} />
              <Route path = "/poem/:poem_id" element = {<Poem />} />
              <Route path = "/" element = {<Home />} />
              
              {/* https://api.meikade.com/api/main/poem?poem_id=9363 
                  path = '/poem/:poem_id '*/}
            </Routes>
          </Router>
        </AppContext.Provider>
      </QueryClientProvider>

    </div>
  );

};

export default App;
