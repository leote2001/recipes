"use client"
/*eslint-disable*/
import React, { FormEvent, useState } from 'react'
import { apiBaseUrl } from '../utils/constants';
import Resultados from './Resultados';
import AreasYCategorías from './AreasYCategorías';
export default function Search_Filter() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [allRecetas, setAllRecetas] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setCurrentPage(1);
      setError("");
      setLoading(true);
      const response = await fetch(apiBaseUrl + "search.php?s=" + search);
      const data = await response.json();
      const recetas = data.meals;
      if (!recetas) {
        setError("No results");
        setLoading(false);
        return;
      }
      setAllRecetas(recetas);
      console.log(data.meals);
      setSearch("");
    } catch (err: any) {
      setError("Unexpected error");
    } finally {
      setLoading(false);
    }
    console.log(search);
  }
  return (
    <>
    <h2>Search</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label className='form-label' htmlFor="search">Search recipe</label>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search recipe by name or ingredient' className='form-control' type="search" name='search' id='search' />
        </div>
        <button disabled={search === ""} className="btn-primary" type='submit'>Search</button>
      </form>
      <AreasYCategorías setCurrentPage={setCurrentPage} setLoading={setLoading} setError={setError} setAllRecetas={setAllRecetas}/>
      <Resultados currentPage={currentPage} setCurrentPage={setCurrentPage} array={allRecetas} error={error} loading={loading}/>
    </>
  );
}
