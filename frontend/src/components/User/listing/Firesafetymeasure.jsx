import React, { useState } from 'react';

const FireSafetyMeasures = ({data, handleChange}) => {
  const [selectedMeasures, setSelectedMeasures] = useState(data.fireSafety ? data.fireSafety : []);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherValue, setOtherValue] = useState('');

  const predefinedMeasures = ['Fire Extinguisher', 'Fire Sensors', 'Sprinklers'];

  console.log(selectedMeasures)
   const toggleMeasure = (measure) => {
    
    setSelectedMeasures(prev => 
      prev.includes(measure) 
        ? prev.filter(m => m !== measure)
        : [...prev, measure]
    )

      handleChange({
        target: {
          name: 'fireSafety',
          value: selectedMeasures
        }
      })
    
  };

  const addOtherMeasure = () => {
    if (otherValue.trim()) {
      setSelectedMeasures(prev => [...prev, otherValue.trim()]);
      setOtherValue('');
      setShowOtherInput(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Fire safety measures include</h3>
      
      <div className="flex flex-wrap gap-3">
        {predefinedMeasures.map((measure) => (
          <button
            key={measure}
            type="button"
            onClick={() => toggleMeasure(measure)}
            className={`px-2 py-2 text-sm font-medium rounded-full border transition-all duration-200 flex items-center gap-2
              ${selectedMeasures.includes(measure)
                ? "bg-pink-100 text-pink-700 border border-pink-500  shadow-sm"
                : "text-gray-900 bg-white border border-gray-300 hover:bg-gray-50"
              }
            `}
          >
            <span className={` ${selectedMeasures.includes(measure) ? 'text-pink-500' : 'text-gray-400'}`}>
              {selectedMeasures.includes(measure) ? '✓' : ''}
            </span>
            {measure}
          </button>
        ))}
        
        {/* Display additional selected measures that aren't in predefined list */}
        {selectedMeasures
          .filter(measure => !predefinedMeasures.includes(measure))
          .map((measure) => (
            <button
              key={measure}
              type="button"
              onClick={() => toggleMeasure(measure)}
              className="px-2 py-1  font-medium rounded-full  bg-pink-100 text-pink-700 border border-pink-500  shadow-sm transition-all duration-200 flex items-center gap-2"
            >
              <span className="">✓</span>
              {measure}
            </button>
          ))
        }
      </div>

      {!showOtherInput ? (
        <button
          type="button"
          onClick={() => setShowOtherInput(true)}
          className="text-gray-500 text-sm font-medium hover:text-gray-700 transition-colors duration-200 flex items-center gap-2"
        >
          <span className="text-lg">+</span>
          Fire Hose
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <span className="text-lg text-gray-500">+</span>
          <input
            type="text"
            placeholder="Enter fire safety measure"
            value={otherValue}
            onChange={(e) => setOtherValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addOtherMeasure();
              } else if (e.key === 'Escape') {
                setShowOtherInput(false);
                setOtherValue('');
              }
            }}
            className="px-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            autoFocus
          />
          <button
            type="button"
            onClick={addOtherMeasure}
            className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => {
              setShowOtherInput(false);
              setOtherValue('');
            }}
            className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default FireSafetyMeasures;