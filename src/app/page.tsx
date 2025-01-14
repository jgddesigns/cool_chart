import Image from "next/image";
import RadarChart from "./views/RadarChart";

export default function Home() {
  return (
    <div className="w-full grid place-items-center">
        <div className="mt-[10%]">
          {/* <RadarChart Color="bg-green-400 w-48 h-48"/> */}
          <RadarChart Title="Test Chart" Size="4" Data={{"house": .9, "car": .8, "plane": .8, "craft": .8, "craf": .7, "cra": .9, "cr": 1}}/>
         
        </div>
    </div>
  );
}
