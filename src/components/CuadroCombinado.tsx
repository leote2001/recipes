/*eslint-disable*/
"use client";
import React, { Dispatch, MouseEvent, SetStateAction} from 'react'
import { apiBaseUrl } from '../utils/constants';
interface ComboBoxProps {
    setCurrentPage: Dispatch<SetStateAction<number>>;
    setAllRecetas: Dispatch<SetStateAction<any[]>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
    setError: Dispatch<SetStateAction<string>>;
    data: any[];
    filterType: string;
}

export default function CuadroCombinado({setCurrentPage, setAllRecetas, setLoading, setError, data, filterType }: ComboBoxProps) {
    const getCOrA = async (e: MouseEvent<HTMLButtonElement>) => {
        const endpoint = filterType === "c" ? apiBaseUrl+"filter.php?c="+e.currentTarget.textContent : apiBaseUrl+"filter.php?a="+e.currentTarget.textContent; 
        try {
setError("");
setCurrentPage(1);
setLoading(true);
const response = await fetch(endpoint);
const data = await response.json();
setAllRecetas(data.meals);
console.log(data.meals);
        } catch (err: any) {
            setError("Unexpected error");
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <div className="container">
                {/* Accordion de Bootstrap */}
                <div className="accordion" id={`${filterType === "c" ? "accordionCategories" : "accordionAreas"}`}>
                    <div className="accordion-item">
                        <h3 className="accordion-header">
                            <button 
                                className="accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#${filterType === "c" ? "collapseCategories" : "collapseAreas"}`}
                                aria-expanded="false"
                                aria-controls={`${filterType === "c" ? "collapseCategories" : "collapseAreas"}`}
                            >
                                {filterType === "c" ? "Categories" : "Areas"}
                            </button>
                        </h3>
                        <div
                            id={`${filterType === "c" ? "collapseCategories" : "collapseAreas"}`}
                            className="accordion-collapse collapse"
                            data-bs-parent={`#${filterType === "c" ? "accordionCategories" : "accordionAreas"}`}
                        >
                            <div className="accordion-body">

                                {data.length > 0 &&
                                    <ul className='list-group'>
                                        {data.map((valor, index) => (
                                            <li key={index} className=' list-group-item'><button className='btn-primary' onClick={(e) => getCOrA(e)} type="button">{filterType === "c" ? valor.strCategory : valor.strArea}</button></li>
                                        ))}
                                    </ul>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
