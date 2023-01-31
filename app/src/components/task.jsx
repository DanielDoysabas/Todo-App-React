import React from 'react';

export default function Task(prop){
    return (
        <>  
            <div className="task" >
                <div className="checkbox">
                    <div className='detail'>
                        {/* <input type="checkbox" /> */}
                        <div className="todoItem_svgBox__z1vm6" style="background: rgb(222, 223, 225);">
                            <svg viewBox="0 0 53 38" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke-miterlimit="10" stroke-width="6" d="M1.5 22L16 36.5L51.5 1" stroke-linejoin="round" stroke-linecap="round" opacity="0" pathLength="1" stroke-dashoffset="0px" stroke-dasharray="0px 1px"></path></svg>
                        </div>
                        <div className="label">
                            <h4>{prop.task}</h4>
                            <p htmlFor="">{prop.date}</p>
                        </div>
                    </div>
                    <div className="tools">
                        <button>
                            <span>Trash</span>
                        </button>
                        <button>
                            <span>Edit</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}