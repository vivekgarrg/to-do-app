import {useState, useEffect} from 'react';
import './App.css';
import icon from './bars-icon.svg';

function App() {
     

  const [task, setTask] = useState('');
  const [data, setData] = useState('')
  const [taskDone, setTaskDone] = useState('')



  useEffect(()=>{
    let res = JSON.parse(localStorage.getItem("tasks"))
    let resDone = JSON.parse(localStorage.getItem("taskDone"))
    
         if(res!=null){
          let response = res.reverse();
          setData(response.map((elem, idx)=>{
                return(
                    <div className='one-item' key={idx}>
                      <input type='checkbox' onClick={(e) =>handleInput1(e,idx)} />
                      <p>{elem}</p>
                    </div>
             
                )
              }));
            }

              

          if(resDone!=null){
           setTaskDone(resDone.map((ele, idx)=>{
                  return(
                    <div className='two-item' key={idx}>
                      <input className='check' type="checkbox" checked={true} />
                      <p  className='text'>{ele}</p>
                    </div>
                  )
                    
              }));
      
            }


          })


 const handleInput1 =(e, id)=>{
  if(e.target.checked){
        let response = JSON.parse(localStorage.getItem("tasks"))
        const res = response.reverse()
        let newArr = res.filter((elem,idx)=>idx!=id)
        localStorage.setItem("tasks", JSON.stringify(newArr));
        let result = localStorage.getItem("taskDone");
            if(result == null){
              let parr = []
              parr.push(res[id])
              localStorage.setItem("taskDone",JSON.stringify(parr));
            }else{
              let arr = [...JSON.parse(result), res[id]]
              localStorage.setItem("taskDone",JSON.stringify(arr));
            }
      setTask('')
                    }
                    
      e.target.checked = false
}
  const handleInput=(e)=>{ 
        if(e.key==='Enter'){
          let result = localStorage.getItem("tasks");
                if(result == null){
                  let parr = []
                  parr.push(task)
                  localStorage.setItem("tasks",JSON.stringify(parr));
                  let finalResult = JSON.parse(localStorage.getItem('tasks'));
                  setTask('')
                  }else{
                    let arr = [...JSON.parse(result),task]
                    localStorage.setItem("tasks",JSON.stringify(arr));
                    let finalResult = JSON.parse(result);
                    setTask('')
                  }
      }
  }

  return (
  <div>
    <div className="wrapper">
      <div className="task-input">
        <img src={icon} alt="icon"/>
        <input type='text' value={task} onChange={(e)=>setTask(e.target.value)} onKeyDown={handleInput} placeholder="Add a new task.." />
      </div>
      <div className="task-heading">
        <div className="pending">
          <span >Tasks</span>
        </div>
        <div className='btn'>
        <button className="clear-btn">Clear All</button>
        </div>
      </div>
      <br/><hr/>
       <div className="task-box">
         {data==""&& taskDone==""?<p>You don't have any task here.</p>:<>{data}{taskDone}</>}
       </div>
      

    </div>


      </div>
     
      
  );
}

export default App;
