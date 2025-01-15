import Image from "next/image";
import RadarChart from "./views/RadarChart";

export default function Home() {
  return (
    <div className="w-full grid place-items-center">
        <div className="mt-[10%]">
          <RadarChart Title="Test Chart" Color="#abc432" Size="4" Data={{"house": 1, "car": .1, "plane": .15, "plane2": 1, "plane3": .75, "plane4": [4,6], "plane5": 1, "plane6": 1}}/>
        </div>
    </div>
  );
}
