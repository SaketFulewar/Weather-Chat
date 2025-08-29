function Child({inputEle}) {
    function handleClick(){        
        inputEle.current.style.backgroundColor = "white"
        inputEle.current.focus()
    }
    function handleDoubleClick(){
        inputEle.current.style.backgroundColor = "red"
    }
    return (
        <button onClick={handleClick} onDoubleClick={handleDoubleClick}>Click Me</button>
    );
}

export default Child;