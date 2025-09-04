import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import back from "./assets/back.svg"
import main from "../backend/mainData/main.json"
const data = main;

const ayamGeprek = ["paha atas", "paha bawah", "sayap", "dada"];
const level = [1, 2, 3, 4, 5];
const sambel = ["matah", "bawang", "pedas", "korek"];
const MenuCustom = ({judul,  masukan}) => {

    const [show, setShow] = useState(false);
    const [value, setValue] = useState("Pilih...");
    const handleShow = () => setShow((prev) => !prev);

    function bagianAyam(item) {
        setValue(item);
        setShow(false);
    }   
    return (
        <div className="flex justify-between">
            <h1>{judul}</h1>
            <div className="flex flex-col bg-white rounded-lg outline-1 pl-3">
                <input className="focus:outline-none w-30 rounded-lg" type="text" value={value} onClick={handleShow} readOnly/>
                    {show ? (
                    <div className="flex flex-col">
                            {masukan.map((item, i) => (
                            <div key={i} onClick={() => bagianAyam(item)} className="flex flex-col">
                                {item}
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
        </div>
    )
}

const Opsional = ({judul}) => {
    const [check, setCheck] = useState(false);

    function handleCehck() {
    //     if (check == false) {
    //     console.log(judul);
    // }
    // setCheck((prev) => !prev);
    // console.log(check);
    }

    return (
        <div className="flex justify-between px-3">
            <h1>{judul}</h1>
            <input type="checkbox" className="w-5 rounded-lg accent-[#6750A4]" onChange={handleCehck} />
        </div>
    )
}

const PilihanKupon = ({nama, gambar, valueKupon, setValueKupon, setKupon}) => {
    function handleValueKupon() {
        setValueKupon(nama);
        setKupon(false);
    }

    return (
        <div className="flex p-2 outline-1 rounded-lg mt-10">
            <img src={gambar} alt=""  />
            <div className="flex justify-between w-full relative">
                <div className="ml-5 max-w-40">
                    <h1 className="font-bold text-[20px] truncate">{nama}</h1>
                    <h1>{nama}</h1>
                </div>
                <button onClick={handleValueKupon} className="bg-[#B6F500] rounded-xl h-7 font-bold text-white w-30 absolute right-0 bottom-2">pilih kupon</button>
            </div>
        </div>
    )
}

const Kupon = ({kupon, setKupon, valueKupon, setValueKupon}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [startY, setStartY] = useState(0);    
    const [currentY, setCurrentY] = useState(0);  

    const kuponRef = useRef(null);
    const currentYref = useRef(0);

    const handleDragStart = (e) => {
        setIsDragging(true);
        setStartY(e.clientY || e.touches[0].clientY);
        setCurrentY(0);
    }

    const handleDragging = (e) => {
        if (!isDragging) return;
        const currentClientY = e.clientY || e.touches[0].clientY;
        const deltaY = currentClientY - startY;
        // setCurrentY(deltaY);
        currentYref.current = deltaY;

        if(kuponRef.current) {
            kuponRef.current.style.transform = `translateY(${deltaY}px)`;
        }
    }

    const handleDragEnd = () => {
        if(!isDragging) return;
        setIsDragging(false);

        const kuponHeight = kuponRef.current.offsetHeight;

        if (currentYref.current > kuponHeight * 0.2) {
            setKupon(false);
        } else {
            if (kuponRef.current) {
                kuponRef.current.style.transform = `translateY(0px)`;
            }
        }
        setCurrentY(0);
    }

    useEffect(() => {
        if (isDragging) {
            window.addEventListener("mousemove", handleDragging);
            window.addEventListener("mouseup", handleDragEnd);
            window.addEventListener("touchmove", handleDragging);
            window.addEventListener("touchend", handleDragEnd);
        } return () => {
            window.removeEventListener("mousemove", handleDragging);
            window.removeEventListener("mouseup", handleDragEnd);
            window.removeEventListener("touchmove", handleDragging);
            window.removeEventListener("touchend", handleDragEnd);
        }
    }, [isDragging]);

    useEffect(() => {
        if (kupon && kuponRef.current) {
            kuponRef.current.style.transform = `translateY(0px)`;
        }
    }, [kupon]);

    function resetKupon() {
        setValueKupon("");
        setKupon(false);
    }

    // console.log(currentY);

    return (
        <div style={{ transform: `translateY(${currentY}px)`}} onMouseDown={handleDragStart} onTouchStart={handleDragStart} ref={kuponRef} className={`overflow-auto w-full fixed left-0 p-5 bottom-0 bg-white outline-1 rounded-tr-[20px] rounded-tl-[20px] z-30 h-100 transition-all duration-200 ${kupon ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>
            <div className="bg-gray-300 w-20 h-2 rounded-full mx-auto cursor-grab"></div>
            <div>
                {data.kupon.map((item, i) => (
                    <PilihanKupon key={i} nama={item["nama-kupon"]} gambar={item.poster} valueKupon={valueKupon} setValueKupon={setValueKupon} setKupon={setKupon} />
                ))}
            </div>
            <button onClick={resetKupon} className="bg-red-500 font-bold text-white w-30 py-2 mt-5 rounded-xl">hapus kupon</button>
        </div>
    )
}

const Nota = () => {
    const { nama } = useParams();
    const [kupon, setKupon] = useState(false);
    const [valueKupon, setValueKupon] = useState("");   


    function handleKupon() {
        setKupon((prev) => !prev);
        console.log("click")
    }

    return (
        <div className="p-5 bg-[#FFFADC]">
            {/* {kupon ? <Kupon kupon={kupon} /> : null} */}
            <Kupon kupon={kupon} setKupon={setKupon} valueKupon={valueKupon} setValueKupon={setValueKupon} />
            {/* <div className="w-full h-full absolute z-0 left-0 top-0"></div> */}
            <div className="relative z-10">
                    <div className="flex">
                    <Link to='/'><img src={back} alt="back" className="z-20 relative" /></Link>
                    <h1 className="ml-5 relative bottom-1 font-bold text-[30px]">{nama}</h1>
                </div>

                <div className="z-30 bg-white w-full outline-[1px] p-3 mt-5 rounded-lg ">
                    <h1 className="font-bold text-[30px]">{nama}</h1> 
                    <div className="flex gap-5 flex-col">
                        <MenuCustom judul="ayam bagian" masukan={ayamGeprek}/>
                        <MenuCustom judul="level" masukan={level}/>
                        <MenuCustom judul="jenis sambel" masukan={sambel}/>
                        <div className="flex justify-between">
                            <h1>jumlah:</h1>
                            <input className="outline-1 rounded-lg w-33 pl-3 placeholder-black" placeholder="pilih..." type="number" max="100"  />
                        </div>
                    </div>

                    <div className="mt-5">
                        <h1 className="font-bold">opsional</h1>
                        <div className="w-full outline-1 rounded-lg bg-white mt-2 flex gap-3 flex-col py-2">
                            <Opsional judul={"air mineral + 5k"}/>
                            <Opsional judul={"extra sambal + 5k"}/>
                            <Opsional judul={"extra nasi + 5k"}/>
                            <Opsional judul={"extra lalapan sayur + 5k"}/>
                            <Opsional judul={"tahu tempe + 10k"}/>
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    <h1 className="font-bold text-[30px]">KUPON</h1>
                    <div className="bg-white p-3 flex justify-between rounded-lg outline-1">
                        <input type="text" className="outline-1 rounded-lg bg-[#DFDFDF] pl-3" value={valueKupon} placeholder="pilih kupon..." readOnly />
                        <button onClick={handleKupon} className="bg-[#B6F500] font-bold text-white w-30 h-10 rounded-lg">Pilih kupon</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Nota;