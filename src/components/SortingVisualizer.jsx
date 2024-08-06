import React, { useState, useEffect } from 'react';
import './SortingVisualizer.css';
import { bubbleSort, mergeSort, quickSort } from '../sortingAlgorithms';

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [animationSpeed, setAnimationSpeed] = useState(10);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const newArray = [];
    for (let i = 0; i < 100; i++) {
      newArray.push(randomIntFromInterval(5, 500));
    }
    setArray(newArray);
  };

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const visualizeSort = (algorithm) => {
    let animations;
    switch (algorithm) {
      case 'bubble':
        animations = bubbleSort(array.slice());
        break;
      case 'merge':
        animations = mergeSort(array.slice());
        break;
      case 'quick':
        animations = quickSort(array.slice());
        break;
      default:
        return;
    }

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('bar');
      const [barOneIdx, barTwoIdx, type] = animations[i];
      if (type === 'compare') {
        setTimeout(() => {
          arrayBars[barOneIdx].style.backgroundColor = 'red';
          arrayBars[barTwoIdx].style.backgroundColor = 'red';
        }, i * animationSpeed);
        setTimeout(() => {
          arrayBars[barOneIdx].style.backgroundColor = 'teal';
          arrayBars[barTwoIdx].style.backgroundColor = 'teal';
        }, (i + 1) * animationSpeed);
      } else if (type === 'swap') {
        setTimeout(() => {
          const [barOneHeight, barTwoHeight] = [arrayBars[barOneIdx].style.height, arrayBars[barTwoIdx].style.height];
          arrayBars[barOneIdx].style.height = barTwoHeight;
          arrayBars[barTwoIdx].style.height = barOneHeight;
        }, i * animationSpeed);
      } else if (type === 'overwrite') {
        setTimeout(() => {
          const [barIdx, newHeight] = [barOneIdx, barTwoIdx];
          arrayBars[barIdx].style.height = `${newHeight}px`;
        }, i * animationSpeed);
      }
    }
  };


  return (
    <div>
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="bar"
            key={idx}
            style={{
              height: `${value}px`,
              backgroundColor: 'teal',
              width: '5px',
              display: 'inline-block',
              margin: '0 1px'
            }}
          ></div>
        ))}
      </div>
      <div className="btns">
        <button onClick={resetArray}>Generate New Array</button>
        <button onClick={() => visualizeSort('bubble')}>Bubble Sort</button>
        <button onClick={() => visualizeSort('merge')}>Merge Sort</button>
        <button onClick={() => visualizeSort('quick')}>Quick Sort</button>
      </div>
      <div>
        <label htmlFor="speedRange">Animation Time: {animationSpeed}</label>
        <input
          id="speedRange"
          type="range"
          min="1"
          max="50"
          value={animationSpeed}
          onChange={(e) => setAnimationSpeed(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default SortingVisualizer;
