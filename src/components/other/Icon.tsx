import React from "react";
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiFillPlusCircle,
  AiOutlineMail,
} from "react-icons/ai";
import {
  BiCalendarEvent,
  BiCurrentLocation,
  BiInfoCircle,
  BiMinusCircle,
  BiSearchAlt2,
  BiWater,
} from "react-icons/bi";
import { BsLayersHalf, BsLink45Deg } from "react-icons/bs";
import { CgMathMinus, CgMathPlus } from "react-icons/cg";
import { FiClock, FiPhone, FiUser, FiUsers } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoIosArrowDown, IoMdCalendar } from "react-icons/io";
import { IoCloseOutline, IoLocationSharp } from "react-icons/io5";
import {
  MdArrowBack,
  MdAttachFile,
  MdBusiness,
  MdEmail,
  MdExitToApp,
  MdKeyboardArrowDown,
  MdKeyboardBackspace,
  MdMoreVert,
  MdTune,
  MdViewModule,
  MdDone,
  MdMap,
  MdList,
} from "react-icons/md";
import { RiMap2Fill, RiTempColdLine } from "react-icons/ri";
import { TiThMenu } from "react-icons/ti";
import { VscVerified } from "react-icons/vsc";
export interface IconProps {
  name: string;
  className?: string;
  fun?: () => void;
}

const Icon = ({ name, className, fun }: IconProps) => {
  switch (name) {
    case "temp":
      return <RiTempColdLine className={className} />;
    case "layer":
      return <BsLayersHalf className={className} />;
    case "location":
      return <HiOutlineLocationMarker className={className} />;
    case "date":
      return <BiCalendarEvent className={className} />;
    case "info":
      return <BiInfoCircle className={className} />;
    case "water":
      return <BiWater className={className} />;
    case "verified":
      return <VscVerified className={className} />;
    case "plus":
      return <CgMathPlus className={className} />;
    case "minus":
      return <CgMathMinus className={className} />;
    case "search":
      return <BiSearchAlt2 className={className} />;
    case "Searchlocation":
      return <GoLocation className={className} />;
    case "MapLocation":
      return <IoLocationSharp className={className} />;
    case "filter":
      return <MdTune className={className} />;
    case "delete":
      return (
        <BiMinusCircle
          className={className}
          onClick={() => (fun ? fun() : null)}
        />
      );
    case "calendar":
      return <IoMdCalendar className={className} />;
    case "arrowDown":
      return (
        <AiFillCaretDown
          className={className}
          onClick={() => (fun ? fun() : null)}
        />
      );
    case "arrowUp":
      return (
        <AiFillCaretUp
          className={className}
          onClick={() => (fun ? fun() : null)}
        />
      );
    case "close":
      return (
        <IoCloseOutline
          className={className}
          onClick={() => (fun ? fun() : null)}
        />
      );
    case "map":
      return <RiMap2Fill className={className} />;
    case "current":
      return <BiCurrentLocation className={className} />;
    case "back":
      return <MdKeyboardBackspace className={className} />;
    case "backMobile":
      return <MdArrowBack className={className} />;
    case "phone":
      return <FiPhone className={className} />;
    case "email":
      return <MdEmail className={className} />;
    case "user":
      return <FiUser className={className} />;
    case "users":
      return <FiUsers className={className} />;
    case "modules":
      return <MdViewModule className={className} />;
    case "time":
      return <FiClock className={className} />;
    case "exit":
      return <MdExitToApp className={className} />;
    case "company":
      return <MdBusiness className={className} />;
    case "userEmail":
      return <AiOutlineMail className={className} />;
    case "dropdownArrow":
      return <MdKeyboardArrowDown className={className} />;
    case "connect":
      return <BsLink45Deg className={className} />;
    case "add":
      return <AiFillPlusCircle className={className} />;
    case "more":
      return <MdMoreVert className={className} />;
    case "menu":
      return <TiThMenu className={className} />;
    case "down":
      return <IoIosArrowDown className={className} />;

    case "attachment":
      return <MdAttachFile className={className} />;
    case "active":
      return <MdDone className={className} />;
    case "map":
      return <MdMap className={className} />;
    case "list":
      return <MdList className={className} />;
    default:
      return null;
  }
};

export default Icon;
