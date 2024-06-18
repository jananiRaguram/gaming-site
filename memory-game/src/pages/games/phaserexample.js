import '../../styles/phaser.css';
import React, { useRef } from "react";

function PhaserExample() {

    const randomposition0 = useRef({
        position: 'absolute',
        top: String(Math.random() * (100 - 50) + 70)+ "vh",
        left: '60%',
        zIndex: -1,
        transform: 'translate(-50vh, -50vh)'
    });

    const randomposition6 = useRef({
        position: 'absolute',
        top:  "130vh",
        left: '60%',
        zIndex: -1,
        transform: 'translate(-50vh, -50vh)'
    });

    const randomposition1 = useRef({
        position: 'absolute',
        top: String(Math.random() * (100 - 50) + 70)+ "vh",
        left: '40%',
        zIndex: -1,
        transform: 'translate(-50vh, -50vh)'
    });

    const randomposition2= useRef({
        position: 'absolute',
        top: String(Math.random() * (100 - 50) + 70)+ "vh",
        left: '30%',
        zIndex: -1,
        transform: 'translate(-50vh, -50vh)'
    });

    const randomposition3= useRef({
        position: 'absolute',
        top: String(Math.random() * (100 - 50) + 70)+ "vh",
        left: '110%',
        zIndex: -1,
        transform: 'translate(-50vh, -50vh)'
    });

    const randomposition4= useRef({
        position: 'absolute',
        top: String(Math.random() * (100 - 50) + 70)+ "vh",
        left: '100%',
        zIndex: -1,
        transform: 'translate(-50vh, -50vh)'
    });

    const randomposition5= useRef({
        position: 'absolute',
        top: String(Math.random() * (100 - 50) + 70)+ "vh",
        left: '35%',
        zIndex: -1,
        transform: 'translate(-50vh, -50vh)'
    });

 
  return (
    <>
      <section>
        <div className="homepaneldisplay3">
            <div className="hovertexthidden "  style={randomposition1.current}>Who knows, you could come across something important here.</div>
            <h1  className="lefttextflashlight hovertexthidden" style={randomposition0.current} >Looks like the lights are gone!</h1>
            <div className="hovertexthidden " style={randomposition2.current}>Nice try, keep looking!</div>
            <div className="hovertexthidden " style={randomposition6.current}>This is your sign to go to another page.</div>
            <div className="hovertexthidden " style={randomposition4.current}>Turn me on when its dark at night. My brightness beats out candlelight.</div>
            <div className="hovertexthidden " style={randomposition3.current}>Maybe there is a clue on every page.</div>
            <div className="hovertexthidden " style={randomposition5.current}>There is still more to find.</div>
        </div>
      </section>
    </>
  );
}








export default PhaserExample;


 
