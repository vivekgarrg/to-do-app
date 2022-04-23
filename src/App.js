import {useState, useEffect} from 'react';
import './App.css';
import icon from './bars-icon.svg';
import del from './delete.png';

function App() {
     

  const [task, setTask] = useState('');
  const [data, setData] = useState('')
  const [taskDone, setTaskDone] = useState('')



  useEffect(()=>{
    let res = JSON.parse(localStorage.getItem("tasks"))  //Tasks-list
    let resDone = JSON.parse(localStorage.getItem("taskDone")) //Task-Done-List 
    
            if(res!=null){
              let response = res.reverse();
              setData(response.map((elem, idx)=>{
                    return(
                        <div className='one-item' key={idx}>
                          <input type='checkbox' onClick={(e) =>handleInput1(e,idx)} />
                          <p>{elem}</p>
                          <div className='delete'>
                          <img  width={20} height={20} src={del} onClick={()=>handleDelete1(idx)} style={{cursor:"pointer"}} />
                          </div>
                        </div>
                
                    )
                  }));
                }else{
                  setData('')
                }
          
              if(resDone!=null){
              setTaskDone(resDone.map((ele, idx)=>{
                      return(
                        <div className='two-item' key={idx}>
                          <input className='check' type="checkbox" checked={true} />
                          <p  className='text'>{ele}</p>
                          <div className='delete'>
                          <img  width={20} height={20} src={del} onClick={()=>handleDelete(idx)} style={{cursor:"pointer"}} />
                          </div>
                        </div>
                      )
                        
                  }));
          
                }else{
                  setTaskDone('')
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
      setTask('');
   }
    e.target.checked = false;
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
  const handleClear =()=>{
        localStorage.removeItem('tasks')
        localStorage.removeItem('taskDone')
        setTask('')
      }
  const handleDelete=(id)=>{
      let res = JSON.parse(localStorage.getItem("taskDone"));
      let newRes = res.filter((elem, indx)=> indx!==id)
      console.log(newRes)
      if(newRes.length>0){
        localStorage.setItem("taskDone", JSON.stringify(newRes));
      }else{
        localStorage.setItem("taskDone", JSON.stringify([]));
      }
      setTask('')
      setTaskDone('')
  }
  const handleDelete1=(id)=>{
    let res1 = JSON.parse(localStorage.getItem("tasks"));
    let res = res1.reverse();
      let newRes = res.filter((elem, indx)=> indx!==id)
      console.log(newRes)
      if(newRes.length>0){
        localStorage.setItem("tasks", JSON.stringify(newRes));
      }else{
        localStorage.setItem("tasks", JSON.stringify([]));
      }
      setTask('')
      setTaskDone('')
  }

  return (
  <div>
        <div className='navbar'>
          <h1>To-Do App</h1>
        </div>
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
            <button onClick={handleClear} className="clear-btn">Clear All</button>
            </div>
        </div>

                       <br/><hr/>

            <div className="task-box">
              {data==""&& taskDone==""?<p>You don't have any task here.</p>:<>{data}{taskDone}</>}
            </div>
              <p style={{textAlign:"center"}}>@Made By Vivek ❤️</p>
        </div>
    </div>
     
      
  );
}

export default App;
