import Image from "next/image";
import RadarChart from "./views/RadarChart";

export default function Home() {
  return (
    <div className="w-full grid place-items-center">
        <div className="mt-[10%]">
          {/* <RadarChart Color="bg-green-400 w-48 h-48"/> */}
          <RadarChart Size="4" Data=""/>
        </div>
    </div>
  );
}
