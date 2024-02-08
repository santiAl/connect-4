export function Square({value}){
    if (value == 0){
        return <div className="cell"> </div>
    }
    if(value == 1 ){
        return <div className="cell_one">  </div>
    }
    if(value == 2 ){
        return <div className="cell_two">  </div>
    }
    if(value == 3 ){
        return <div className="cell_one_preview">  </div>
    }
    if(value == 4 ){
        return <div className="cell_two_preview">  </div>
    }
    
}