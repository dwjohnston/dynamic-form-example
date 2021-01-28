import logo from './logo.svg';
import './App.css';
import { useState } from 'react';


const MyTextInput = ({value, label, onChange}) => {

  return <label>{label}<input type ="text" value = {value} onChange = {(e) => onChange(e.target.value)}/></label>;
}

const MyCheckbox = ({isChecked, label, onChange}) => {

  return <label>{label}<input type ="checkbox" checked = {isChecked} onChange = {(e) => onChange(!isChecked)}/></label>;
}



const formItemMapper = {

  "text": {
    jsx: ({onChange, id, value }) => {
      return <MyTextInput value = {value} label = {id} onChange = {(value) => onChange(value, id)}/> 
    }
  }, 
  "checkbox": {
    jsx: ({onChange, id, value }) => {
      return <MyCheckbox isChecked = {value} label = {id} onChange = {(value) => onChange(value, id)}/> 
    }
  }
}

const DynamicForm = ({formItems, onChange, dynamicFormValues}) => {

  return <div> 
      {formItems.map((v) => {
        
        const Comp = formItemMapper[v.type].jsx; 
        return <Comp key = {v.id} onChange = {onChange} value = {dynamicFormValues[v.id]} id = {v.id}/> 

      })}

    </div> 
}






function App() {

  const [text, setText]= useState(""); 
  const [checked, setChecked] = useState(false); 

  const [dynamicForm, setDynamicForm] = useState({
  }); 

  const handleDynamicFormChange = (value, id) => {
    setDynamicForm({
      ...dynamicForm, 
      [id]: value
    }); 
  }

  return (
    <div className="App">

      <h1> direct usage</h1> 

      <MyTextInput label = "text box" value = {text} onChange = {setText}/> 
      <MyCheckbox label ="checkbox" isChecked = {checked} onChange = {setChecked}/> 


      <h1> Dyanmic form use </h1> 

      <pre> 
        {JSON.stringify(dynamicForm, null, 2)}
        </pre>

      <DynamicForm formItems = {[
        {
          type: "text", 
          id: "first name", 
        }, 
        {
          type: "text", 
          id: "last name"
        }, 
        {
          type: "checkbox", 
          id: "subscribe"
        }
      ]}
        dynamicFormValues = {dynamicForm}
        onChange = {handleDynamicFormChange}
      />

    </div>
  );
}

export default App;
