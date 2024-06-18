import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Amardeep from './pages/about/amardeep';
import Ameer from './pages/about/ameer';
import Mohammad from './pages/about/mohammad';
import Natalie from './pages/about/natalie';
import Janani from './pages/about/janani';
import Nitin from './pages/about/nitin';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Matchgame from './pages/Matchgame';
import Instructions from './pages/Instructions';
import Endgame from './pages/Endgame';
import Gamestats from './pages/Gamestats';
import CardSelection from './pages/CardSelection';
import ComingSoon from './pages/comingSoon';
import PhaserExample from './pages/games/phaserexample';
import Pixi from './pages/games/Pixi';
import Game from './pages/game';
import Cipher from './pages/Cipher';
import PrivateRoute from './components/PrivateRoute';
import SolvedEnd from './pages/SolvedEnd';
import SolvedEndVigenere from './pages/SolvedEndVigenere';
import PasswordProtectedPage from './pages/transfer';
import Vigenere from './pages/Vigenere';
import CipherDoor from './pages/CipherDoor';
import BuzzWordsStart from './pages/games/buzz-words/BuzzWordsStart';
import BuzzInstructions from './pages/games/buzz-words/BuzzInstructions';
import BuzzEndgame from './pages/games/buzz-words/BuzzEndgame';
import BuzzWordsGame from './pages/games/buzz-words/BuzzGame';
import WordSearchStart from './pages/games/word-search/WordSearchStart';
import WordSearchInstructions from './pages/games/word-search/WordSearchInstructions';
import WordSearch from './pages/games/word-search/WordSearch';
import WordSearchSelection from './pages/games/word-search/WordSearchSelection';
import WordSearchEnd from './pages/games/word-search/WordSearchEnd';
import BuzzWordsSelection from './pages/games/buzz-words/BuzzWordSelection';

const App = () => {
  const token = localStorage.getItem('token');
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/matchgame" element={<Matchgame/>} />
          <Route path="/about/amardeep" element={<Amardeep/>} />
          <Route path="/about/ameer" element={<Ameer/>} />
          <Route path="/about/mohammad" element={<Mohammad/>} />
          <Route path="/about/natalie" element={<Natalie/>} />
          <Route path="/about/janani" element={<Janani/>} />
          <Route path="/about/nitin" element={<Nitin/>} />
          <Route path="/instructions" element={<Instructions/>} />
          <Route path="/gameover" element={<Endgame/>} />
          <Route path="/game-stats" element={<Gamestats/>} />
          <Route path="/game" element={<Game/>} />
          <Route path="/cardSelection" element={<CardSelection/>}/>
          <Route path="/comingsoon" element={<ComingSoon/>}/>
          <Route path="/cipher" element={<Cipher/>}/>
          {/* <Route path="/solved" element={<SolvedEnd/>}/> */}
          {token ? <Route path={`/${token}`} element={<PrivateRoute Component={SolvedEnd}/>}/> : <Route path={`/${token}`} element={<Home/>}/>}
          <Route path="/games/phaser-demo" element={<PhaserExample/>}/>
          <Route path="/games/pixi-demo" element={<Pixi/>}/>
          <Route path="/vigenere" element={<Vigenere/>}/>
          <Route path="/solvedendvigenere" element={<SolvedEndVigenere/>}/>
          <Route path="/qRpLmNoStU" element={<PasswordProtectedPage/>}/>
          <Route path="/cipherdoor" element={<CipherDoor/>}/>
          <Route path="/buzzwords" element={<BuzzWordsGame/>} />
          <Route path="/buzzwords-start" element={<BuzzWordsStart/>} />
          <Route path="/buzzwords-instructions" element={<BuzzInstructions/>} />
          <Route path="/buzzwords-gameover" element={<BuzzEndgame/>} />
          <Route path='/buzzwords-selection' element={<BuzzWordsSelection/>} />
          <Route path="/wordsearch-start" element={<WordSearchStart/>} />
          <Route path="/wordsearch-gameover" element={<WordSearchEnd/>} />
          <Route path="/wordsearch-instructions" element={<WordSearchInstructions/>} />
          <Route path="/wordsearch" element={<WordSearch/>} />
          <Route path="/wordsearch-selection" element={<WordSearchSelection/>} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
};


export default App;



