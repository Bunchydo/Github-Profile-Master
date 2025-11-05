export default function ProfileComponent(props: any) {
  return (
    <div
      className="box-border profile-info flex items-center justify-between  bg-[#111629] h-[20%] md:h-[80%] 
    p-[5%] rounded-[10px]  md:box-border md:p-[1%] md:w-[28%]"
    >
      <div className="leftside pr-[13%] border-r-solid border-r-white border-r-[2px] text-[#ced4e0]">
        {props.name}
      </div>
      <div className="rightside text-[#ced4e0] flex ">{props.otherInfo}</div>
    </div>
  );
}
