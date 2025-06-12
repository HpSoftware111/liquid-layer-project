import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
// import Modal from "../components/Modal";
import { AiOutlineCalculator } from "react-icons/ai";
import { Button, Modal } from 'flowbite-react';

import ModalComponent from "../components/Modal"
const StakingSquare = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openModal, setOpenModal] = useState();

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };
    
    const handleModal = (data) => {
        setOpenModal(data);
    }

    const props = { openModal, setOpenModal };

    return (
        <div>
            <div className="h-auto rounded-2xl border border-emerald-200">
                <div className="flex">
                    <div className="pl-4 text-white mr-16">
                        <p className="text-base mt-2">Staking Pool: Earn LDR/Stake LDR</p>
                        <div className="flex">
                            <span className="font-bold text-4xl mr-4 mt-2">15.00%</span>
                            <span className="font-bold text-4xl mr-3 mt-2">APY</span>
                            <button className="mt-4 text-4xl hover:bg-violet-700 active:bg-violet-700 focus:outline-none"
                                onClick={() => setOpenModal('default')}>
                                <AiOutlineCalculator />
                            </button>
                            <ModalComponent isShow={props.openModal} parentCallback={handleModal}/>
                        </div>
                        <div className="mt-2 text-xl">
                            <span className="mr-2">Lock Duration:</span>
                            <span>Flexible</span>
                        </div>
                        <div className="mt-2 text-base">
                            <span className="mr-2">Deposit Fee:</span>
                            <span>0.00%</span>
                        </div>
                        <div className="text-base">
                            <span className="mr-2">Withraw Fee:</span>
                            <span>2.00%</span>
                        </div>
                    </div>
                    <div className="ml-48 mt-6 relative">
                        <div className="bg-white border h-8 w-8 rounded-full absolute ml-8">
                            <img src={logo} className="" />
                        </div>
                        <div className="border rounded-full h-12 w-12 static mt-4">
                            <img src={logo} className="" />
                        </div>
                    </div>
                </div>
                <div className="flex border rounded-2xl m-4 h-auto text-white bg-gray-700">
                    <div className="m-2 mr-30">
                        <p className="ml-2 text-xl">LDR EARNED</p>
                        <p className="ml-2 text-3xl font-bold">0.000</p>
                        <p className="ml-2 text-base">$0.000</p>
                    </div>
                    <div className="ml-40 h-auto items-center items-center justify-center">

                        <button type="button" className="text-white-700 mt-10 border border-gray-500
                                    nonactive focus:ring-4 font-medium text-2xl rounded-lg text-sm px-5 py-2.5 text-center ml-20 mb-2 
                                   ">Boost </button>

                    </div>
                </div>
                <div className="flex border rounded-2xl m-4 h-auto text-white bg-gray-700">
                    <div className="m-2 mr-32">
                        <p className="ml-2 text-xl">LDR Staked</p>
                        <p className="ml-2 text-3xl font-bold">0.000</p>
                        <p className="ml-2 text-base">$0.000</p>
                    </div>

                </div>
                <Link className="flex items-center justify-center border rounded-2xl m-4 h-auto text-white bg-gray-700 bg-gradient-to-r from-green-400 via-yellow-400 to-red-400">
                    <p className='text-2xl p-2'> Connect Wallet </p>
                </Link>

                <div className="mb-4 text-white">
                    <div className="flex items-center justify-center p-4 cursor-pointer" onClick={toggleAccordion}>
                        <div className="text-lg font-medium">Details</div>
                        <svg className={`w-6 h-6 transition-transform duration-300 transform ${isOpen ? 'rotate-180' : ''}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </div>
                    {isOpen && (
                        <div className="pl-4 pr-4 pb-1 pt-2">
                            <div className='p-2 h-12'>
                                <span className='float-left text-xl'>Total Staked:</span>
                                <span className='float-right text-xl'>Ends in</span>
                            </div>
                            <div className='p-2 h-12'>
                                <span className='float-left text-xl'>710,296.8423 LDR</span>
                                <span className='float-right text-xl'>1606d 0h 29m 15s</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default StakingSquare;