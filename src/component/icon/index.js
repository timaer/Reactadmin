import './index.css'

function Icon(props){
    const classname=props.className!==undefined?"svgClass "+props.className:"svgClass";
    return(
      <svg className={classname} onClick={props.onClick}><use xlinkHref={"#"+props.src} /></svg>
    );
}

export default Icon;