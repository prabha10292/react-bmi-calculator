import './App.css';
import { useState } from 'react';

function App() {
  const [unit, setUnit] = useState("metric");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);  //initially no bmi
  const [error, setError]=useState("");

  function handleWeightChange(e) {
    setWeight(e.target.value);
    setBmi(null); //reset
    setError(""); 
  }

  function handleHeightChange(e) {
    setHeight(e.target.value);
    setBmi(null); 
    setError(""); 
  }

  function resetBMI(){
    setWeight("");
    setHeight("");
    setBmi(null);
    setError("");
  }

  function calculateBMI() {
    if(weight===""||height===""){
      setError("Please enter both weight and height.");
      setBmi(null);
      return;
    } if((Number(weight)<=0|| Number(height)<=0)){
      setError("Height and weight must be positive numbers.");
      setBmi(null);
      return;
    }
    let bmiresult;
    if(unit==="metric"){
      bmiresult=Number(weight)/((Number(height)/100)**2);
    }
    else{
      bmiresult=(Number(weight)*703)/(Number(height)**2);
    }
    setError("");
    setBmi(bmiresult.toFixed(1));
  }

  function getCategory(){
    if(bmi<18.5){
      return "Underweight";
    } else if(bmi<25){
      return "Normal weight";
    } else if(bmi<30){
      return "Overweight";
    } else{
      return "Obese";
    }
  }

  return (
    <div className="container">
      <h1>BMI Calculator</h1>
      <div className="unit-buttons">
        <button onClick={()=>setUnit("metric")}>Metric</button>
        <button onClick={()=>setUnit("imperial")}>Imperial</button>
      </div>
      <br />
      <br />

      <label>Enter Weight: ({unit==="metric"?"kg":"lbs"}):</label>
      <input
        type="number"
        value={weight}
        onChange={handleWeightChange}
      />
      <br />
      <br />
      <label>Enter Height:({unit==="metric"?"cm":"inches"}):</label>
      <input
        type="number"
        value={height}
        onChange={handleHeightChange}
      />
      <br />
      <br />
      <div className="button-container">
        <button onClick={calculateBMI}>Calculate BMI</button>
        <button onClick={resetBMI}>Reset</button>
      </div>
      {error!=""&&(
        <p style={{color:"red"}}>{error}</p>
      )}
      {bmi!=null &&(<div>
        <h2> Your BMI is: {bmi}</h2> 
        <p>Category: {getCategory()}</p>
      </div>)}
    </div>
  );
}

export default App;
