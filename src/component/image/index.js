function Image(props){
    const imgobj=props.src!=null? require("assets/img/"+props.src):'';
    const imagepath=imgobj!==''?imgobj["default"]:'';
    return(
       <img src={imagepath} alt={props.alt} className={props.className} />
    );
}

export default Image;