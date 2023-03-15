
export function getCenterDivWidth(layout, breakpoint){
    
    let lay = JSON.parse(layout.layouts);
    if(lay !== undefined && lay.length == 0){
        return 1000;
    }
    
    let max = 0;
    for(var i = 0; i < lay.length; i++){
        if(max < lay[i].w){
            max = lay[i].w;
        }
    }


    let oneW = parseInt((parseInt(window.innerWidth) / 13));
    console.log(oneW * max, breakpoint);
    if(oneW * max > breakpoint){
        return breakpoint;
    }
    return oneW * max;

}