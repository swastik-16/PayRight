import Avatar from "./Avatar";



export default function NavBar({name}) {
     return (
          <div className="flex justify-between p-2 bg-slate-200 items-center">
               <div>MoneyTM</div>
         <div className="flex items-center gap-2 mr-2">  <Avatar n={name[0]}/>
           <div>{name}</div></div>
          </div>
     )
}