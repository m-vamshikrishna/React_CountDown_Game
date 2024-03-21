import { forwardRef, useImperativeHandle, useRef } from "react"
import { createPortal } from "react-dom";
const ResultModal = forwardRef(function ({targetTime,remainingTime,onReset},ref)
{
    const dialog = useRef();
    const score = Math.floor((1 - remainingTime/(targetTime*1000))*100);
    const userLost = remainingTime<=0;
    useImperativeHandle(ref,()=>{
        return{
            open(){
                dialog.current.showModal();
            }
        }
    })
    return createPortal(<dialog ref={dialog} className="result-modal" onClose={onReset}>
    <h2>{userLost?"You Lost":`Your Score is ${score}`}</h2>
    <p>The target time was <strong>{targetTime}</strong></p>
    <p>You Stopped the Timer <strong>{remainingTime/1000} Seconds Left.</strong></p>
    <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
    </form>
    </dialog>,document.getElementById('modal'));
})
export default ResultModal;