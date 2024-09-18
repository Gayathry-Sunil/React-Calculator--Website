import React, { useState, useEffect } from 'react';
import './Calculator.css'; // Import component-specific CSS

const Calculator = () => {
  const [input, setInput] = useState(''); // Current input
  const [previousInput, setPreviousInput] = useState(''); // Previous input and operator
  const [calculated, setCalculated] = useState(false); // Flag to handle calculation state
  const [error, setError] = useState(''); // Error message

  useEffect(() => {
    const handleKeyDown = (event) => {
      event.preventDefault(); // Prevent default behavior for specific keys

      const key = event.key;

      // Handle digit keys
      if (/[0-9]/.test(key)) {
        handleClick(key);
      }

      // Handle operators
      if (['+', '-', '*', '/'].includes(key)) {
        handleOperator(key);
      }

      // Handle special keys
      if (key === 'Enter') {
        handleEquals();
      }
      if (key === 'Backspace') {
        handleDelete();
      }
      if (key === 'Escape') {
        handleAC();
      }
      if (key === '%') {
        handleModulus();
      }
      if (key === '.') {
        handleClick(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [input, previousInput, error, calculated]);

  const handleClick = (value) => {
    if (error) {
      setInput(value);
      setPreviousInput('');
      setError('');
      setCalculated(false);
    } else {
      setInput(prev => prev + value);
    }
  };

  const handleDelete = () => {
    if (calculated) {
      // If calculated, clear everything
      setInput('');
      setPreviousInput('');
      setCalculated(false);
      setError('');
    } else if (error) {
      // If in error state, clear everything
      setInput('');
      setPreviousInput('');
      setError('');
    } else if (input) {
      // Delete last character from current input
      setInput(prev => prev.slice(0, -1));
    } else if (previousInput) {
      // Delete from previous input
      setPreviousInput(prev => {
        const lastOperatorIndex = Math.max(
          prev.lastIndexOf('+'),
          prev.lastIndexOf('-'),
          prev.lastIndexOf('*'),
          prev.lastIndexOf('/')
        );

        if (lastOperatorIndex >= 0) {
          // If there's an operator to remove
          return prev.slice(0, lastOperatorIndex);
        } else {
          return '';
        }
      });
    }
  };

  const handleAC = () => {
    setInput('');
    setPreviousInput('');
    setCalculated(false);
    setError('');
  };

  const handleModulus = () => {
    if (input && !error) {
      if (previousInput && !calculated) {
        setError('Invalid Expression');
        setInput('Error');
        return;
      }
      setPreviousInput(prev => prev + ' ' + input + ' %');
      setInput('');
      setCalculated(false);
      setError('');
    } else if (input === '') {
      setError('Invalid Expression');
      setInput('Error');
    }
  };

  const handleOperator = (operator) => {
    // Allow only + and - as the first input
    if (input === '' && (operator === '+' || operator === '-')) {
      setInput(operator);
      return;
    }
  
    // Proceed with other operators if there is a valid input
    if (input || previousInput) {
      if (/[0-9]$/.test(input) || previousInput) {
        setPreviousInput(prev => prev + ' ' + input + ' ' + operator);
        setInput('');
        setCalculated(false);
        setError('');
      } else {
        setError('Invalid Expression');
        setInput('Error');
      }
    } else {
      setError('Invalid Expression');
      setInput('Error');
    }
  };
  
  const handleEquals = () => {
    try {
      if (error) return;

      let fullExpression = `${previousInput} ${input}`;
      if (fullExpression.includes('%')) {
        fullExpression = fullExpression.replace(/(\d+)%/g, '($1 / 100)');
      }

      const result = eval(fullExpression);
      if (typeof result === 'number') {
        const formattedResult = new Intl.NumberFormat().format(result);
        setInput(formattedResult);
        setPreviousInput('');
        setCalculated(true);
        setError('');
      } else {
        setInput('Error');
        setError('Invalid Expression');
      }
    } catch (error) {
      setInput('Error');
      setError('Invalid Expression');
    }
  };

  return (
    <div className="calculator">
      <div className="heading">Calculator Loaded</div>
      <div className="display">
        <div className="previous-input">{previousInput}</div>
        <div className={`current-input ${error ? 'error' : ''}`}>{input}</div>
      </div>
      <div className="buttons">
        <button onClick={handleAC} className="btn ac">AC</button>
        <button onClick={handleDelete} className="btn del">DEL</button>
        <button onClick={() => handleOperator('/')} className="btn operator">/</button>
        <button onClick={() => handleOperator('*')} className="btn operator">*</button>
        <button onClick={() => handleClick('7')} className="btn">7</button>
        <button onClick={() => handleClick('8')} className="btn">8</button>
        <button onClick={() => handleClick('9')} className="btn">9</button>
        <button onClick={() => handleOperator('-')} className="btn operator">-</button>
        <button onClick={() => handleClick('4')} className="btn">4</button>
        <button onClick={() => handleClick('5')} className="btn">5</button>
        <button onClick={() => handleClick('6')} className="btn">6</button>
        <button onClick={() => handleOperator('+')} className="btn operator">+</button>
        <button onClick={() => handleClick('1')} className="btn">1</button>
        <button onClick={() => handleClick('2')} className="btn">2</button>
        <button onClick={() => handleClick('3')} className="btn">3</button>
        <button onClick={handleModulus} className="btn operator">%</button>
        <button onClick={handleEquals} className="btn equals">=</button>
        <button onClick={() => handleClick('0')} className="btn">0</button>
        <button onClick={() => handleClick('.')} className="btn">.</button>
      </div>
    </div>
  );
};

export default Calculator;
