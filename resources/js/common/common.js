export function setstate(obj,isMounted = false){
  if(isMounted){
    this.setState(obj);
  }
}
