/*eslint-disable*/
import CuadroCombinado from './CuadroCombinado';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { apiBaseUrl } from '../utils/constants'
interface AYCProps {
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string>>;
  setAllRecetas: Dispatch<SetStateAction<any[]>>;
}
export default function AreasYCategorías({setCurrentPage, setLoading, setError, setAllRecetas }: AYCProps) {
  const [componentError, setComponentError] = useState<string>("");
  const [componentLoading, setComponentLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [areas, setAreas] = useState<any[]>([]);
  useEffect(() => {
    const getAreasAndCategories = async () => {
      try {
        setComponentError("");
        setComponentLoading(true);
        const [responseC, responseA] = await Promise.all([
          fetch(apiBaseUrl + "list.php?c=list"),
          fetch(apiBaseUrl + "list.php?a=list")
        ]);
        if (!responseC.ok || !responseA.ok) {
          setComponentError("Getting filters error");
          setComponentLoading(false);
          return;
        }
        const [dataC, dataA] = await Promise.all([responseC.json(), responseA.json()]);
        setCategories(dataC.meals);
        setAreas(dataA.meals);
      } catch (err: any) {
        setComponentError("Unexpected error");
      } finally {
        setComponentLoading(false);
      }
    }
    getAreasAndCategories();
  }, []);
  if (componentError) {
    return <p className='lead text-danger'>{componentError}</p>
  }
  if (componentLoading) {
    return <p className='lead'>Loading...</p>
  }
  return (
    <>
      {categories.length > 0 && areas.length > 0 &&
      <>
      <h2>Categories and areas</h2>
        <div className='d-flex justify-content-around g-2'>
          <CuadroCombinado setCurrentPage={setCurrentPage} setAllRecetas={setAllRecetas} setLoading={setLoading} setError={setError} data={categories} filterType={"c"} />
          <CuadroCombinado setCurrentPage={setCurrentPage} setAllRecetas={setAllRecetas} setLoading={setLoading} setError={setError} data={areas} filterType={"a"} />
        </div>
        </>
      }
    </>
  );
}
