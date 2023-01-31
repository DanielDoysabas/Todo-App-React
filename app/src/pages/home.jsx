import React from 'react';
import Task from '../components/task';
import axios from 'axios';
import { useEffect,useRef,useState } from 'react';

export default function Home(){

    const dataFetchedRef = useRef(false);
    const taskname = useRef(null)
    const status = useRef(null)

    const formData = {task: "", id: "", date: ""}

    const [notask, setnotask] = useState(true);
    const [isViewModal, setisViewModal] = useState(false);
    const [ismodal, setismodal] = useState("none");
    const [tasks, setTasks] = useState([]);
    
    const fetchtasks = () => {
        axios.get("http://localhost:80/api/").then(
            response => {
                const a = response.data;
                setTasks(a);
                setnotask(false);
            }
            ).catch( function(error){
                setnotask(true);
            }
            );
    }
    
    const posttask = (event) =>{
        event.preventDefault();
        const timeStamp = new Date().getTime();

        formData.task = taskname.current.value||"";
        formData.status = taskname.current.value||"";
        formData.date = timeStamp||"";

        axios.post('http://localhost:80/api/',formData)
        .then(function (response) {
            console.log(response);
        })
    }

    useEffect(
        () => {
            if (dataFetchedRef.current) return;
            dataFetchedRef.current = true;
            fetchtasks();
        }
    )
            
    const ViewTaskDetails = () => {
        (isViewModal) ? setisViewModal(false) : setisViewModal(true)

        if(ismodal==="none"){
            setismodal("block")
        }else{
            setismodal("none")
        }
    }

    const Addtask = () => {
        return (
            <>
                <div className={"modal " +ismodal} id='myModal'>
                    <div className="modal-content">
                        <div className="modal-head">
                            Add TODO
                        </div>
                        <div className="modal-body">
                            <form onSubmit={posttask}>
                                <div className="form">
                                    <div className="form-group">
                                        <label htmlFor="">
                                            Title
                                        </label>
                                        <input name='taskname' id='taskname' type="text" className='task-input' ref={taskname}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">
                                            Status
                                        </label>
                                        <select name="status" id="status" ref={status}>
                                            <option value="">Incomplete</option>
                                            <option value="">Complete</option>
                                        </select>
                                    </div>
                                    <div className="form-tools">
                                        <button type='submit' className='btn btn-primary'>
                                            Save Task
                                        </button>
                                        <button type='button' className='btn btn-default' onClick={ViewTaskDetails}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    const NoTask = () => {
        return (
            <>
                <div className="box">
                    <h3>No TODOS</h3>
                </div>
            </>
        )
    }

    return (
            <>
                <div className="container">
                    {isViewModal && <Addtask/>}
                    <div className="head">
                        <h1>TODO LIST</h1>
                    </div>
                    <div className="functions">
                        <div className="btn">
                            <button className='btn-primary' onClick={ViewTaskDetails}>
                                Add Task
                            </button>
                        </div>
                        <div className="filter">
                            <select className='select-filter' name="" id="">
                                <option value="">All</option>
                            </select>
                        </div>
                    </div>
                    <div className="body">
                        <div className="list">
                            <div className="task-list">
                                {   
                                    tasks.map(
                                        (proptask) => {
                                            return (
                                                (proptask) ? <Task key={proptask.id} task={proptask.task} date={proptask.date}/> : <NoTask/>
                                            )
                                        }
                                    )
                                }
                                {
                                    notask && <NoTask/>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
}