import { Link, BrowserRouter, Routes, Route } from "react-router-dom"
import Image from "./assets/landingPage.png"
import search from "./assets/search.svg"
import main from "../backend/mainData/main.json"

const data = main;

import Nota from "./nota";

const Container = ({ nama, harga, gambar }) => {
  return (
    <div className="bg-white outline-[1px] p-3 w-fit">
      <img src={gambar} className="w-35 h-35 object-cover" />
      <h1>{nama}</h1>
      <h1>{harga}</h1>
    </div>
  )
}

const Home = () => {
  return (
    <div className="bg-[#FFFADC] h-[100vh]">
      <div>
        <img className="w-full" src={Image} alt="image" />
        <div className="absolute top-15 text-center left-[50%] rigth-[50%] translate-x-[-50%]">
          <h1 className="font-bold text-[25px] text-[#EBFFB2] drop-shadow-md/50">Welcome to warung</h1>
          <button className="mt-5 bg-[#B6F500] text-white w-30 h-10 rounded-xl text-[23px] font-bold">explore</button>
        </div>
      </div>

    <div className="m-5">
        <div className="relative">
          <img className="absolute top-2 left-1" src={search} alt="search" />
          <input className="bg-white w-full pl-6 focus:outline-none h-7" placeholder="cari jenis makanan" type="text" />
      </div>
        <div className="flex justify-between mt-5">
          {data.menu.map((item, i) => (
            <Link key={i} to={`/nota/${item.nama}`} state={{ nama: item.nama }}><Container nama={item.nama} harga={item.harga} gambar={item.gambar} /></Link>
          ))}
        </div>
      </div>
    </div>
  )
}

const App = () => {
  return (
      <BrowserRouter basename="/theWarung">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nota/:nama" element={<Nota />} /> 
        </Routes>
      </BrowserRouter>
  )
}

export default App