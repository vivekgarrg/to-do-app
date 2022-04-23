import {useState, useEffect} from 'react';
import './App.css';

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
                  <div key={idx}>
                      <input type='checkbox' onClick={(e) =>handleInput1(e,idx)} />
                      <h1>{elem}</h1>
                  </div>
                )
              }));
            }

              

          if(resDone!=null){
            const node  = document.querySelectorAll('.taskdone')[0]
            node.innerHTML = ""  
           setTaskDone(resDone.map((ele)=>{
                  let p = document.createElement('p')
                  p.innerText = ele;
                  node.insertBefore(p, node.firstChild);
                    
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
      <div className='heading'>
        <h1>To Do App</h1>
      </div>
      <div className='input-box'>
        <input type='text' value={task} onChange={(e)=>setTask(e.target.value)} onKeyDown={handleInput} />
      </div>
     
      <div className='task-list'>
            {data}
      </div>
      <div className='taskdone'>
           {taskDone}
      </div>
    </div>
  );
}

export default App;
