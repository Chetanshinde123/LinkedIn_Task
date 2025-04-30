
"use client";

import React, { useEffect, useState } from "react";
import { fetchProducts } from "@/app/lib/api";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import NavBar from "../../component";

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

const PRODUCTS_PER_PAGE = 6;

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortOption, setSortOption] = useState("");
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * PRODUCTS_PER_PAGE,
        currentPage * PRODUCTS_PER_PAGE
    );

    useEffect(() => {
        async function getData() {
            setLoading(true);
            const data = await fetchProducts();
            setProducts(data);
            setFilteredProducts(data);
            const uniqueCategories = ["All", ...Array.from(new Set(data.map(p => p.category)))];
            setCategories(uniqueCategories);
            setLoading(false);
        }
        getData();
    }, []);

    useEffect(() => {
        let updated = [...products];

        if (searchQuery) {
            updated = updated.filter(product =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedCategory !== "All") {
            updated = updated.filter(product => product.category === selectedCategory);
        }

        if (sortOption === "price-asc") {
            updated.sort((a, b) => a.price - b.price);
        } else if (sortOption === "price-desc") {
            updated.sort((a, b) => b.price - a.price);
        } else if (sortOption === "title-asc") {
            updated.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortOption === "title-desc") {
            updated.sort((a, b) => b.title.localeCompare(a.title));
        }

        setFilteredProducts(updated);
        setCurrentPage(1); // reset to page 1 after filtering/sorting
    }, [searchQuery, selectedCategory, sortOption, products]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <>
            <NavBar />
            <div className="p-8">
                {/* Filters */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Search by title..."
                        className="border px-4 py-2 rounded-md w-full md:w-1/3"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />

                    <div className="flex flex-wrap gap-4">

                        <select
                            value={selectedCategory}
                            onChange={e => setSelectedCategory(e.target.value)}
                            className="border px-4 py-2 rounded-md"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>

                        <select
                            value={sortOption}
                            onChange={e => setSortOption(e.target.value)}
                            className="border px-4 py-2 rounded-md"
                        >
                            <option value="">Sort By</option>
                            <option value="price-asc">Price: Low → High</option>
                            <option value="price-desc">Price: High → Low</option>
                            <option value="title-asc">Title: A → Z</option>
                            <option value="title-desc">Title: Z → A</option>
                        </select>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="min-h-[700px]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {loading
                            ? Array.from({ length: 6 }).map((_, index) => (
                                <div key={index} className="animate-pulse p-4 border rounded-md space-y-4 bg-white">
                                    <div className="bg-gray-200 h-40 w-full rounded"></div>
                                    <div className="h-4 bg-gray-200 w-3/4 rounded"></div>
                                    <div className="h-4 bg-gray-200 w-1/2 rounded"></div>
                                    <div className="h-4 bg-gray-200 w-1/3 rounded"></div>
                                </div>
                            ))
                            : paginatedProducts.map(product => (
                                <Link
                                    href={`/products/${product.id}`}
                                    key={product.id}
                                    className="group relative border border-gray-200 p-4 rounded-md bg-white transition-all duration-300
                      hover:shadow-xl hover:-translate-y-1 hover:border-transparent
                      before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent
                      before:to-black/10 before:opacity-0 before:transition-opacity before:duration-300
                      before:rounded-md hover:before:opacity-100"
                                >
                                    {/* Product Image with zoom effect */}
                                    <div className="overflow-hidden rounded-md mb-4">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-full h-40 object-contain transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>

                                    {/* Product Info */}
                                    <div className="relative z-10">
                                        <h2 className="text-lg font-semibold mb-1 group-hover:text-blue-600 transition-colors">
                                            {product.title}
                                        </h2>
                                        <p className="text-sm text-gray-500 mb-1">{product.category}</p>

                                        {/* Price with subtle animation */}
                                        <div className="flex items-center justify-between">
                                            <p className="font-bold text-blue-600 transition-transform group-hover:scale-105">
                                                ${product.price}
                                            </p>
                                            {/* Add to cart button that slides in on hover */}
                                            <button
                                                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300
                            text-white bg-blue-600 px-3 py-1 rounded-full text-sm
                            transform translate-x-2 group-hover:translate-x-0 transition-transform"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    // Handle add to cart logic
                                                }}
                                            >
                                                Add to cart
                                            </button>
                                        </div>
                                    </div>

                                    {/* Quick view overlay (appears on hover) */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0
                          group-hover:opacity-100 transition-opacity duration-300 bg-black/10 rounded-md">
                                        <span className="bg-white px-4 py-2 rounded-full font-medium shadow-md">
                                            Quick View
                                        </span>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>


                {/* Pagination */}
                {
                    !loading && totalPages > 1 && (
                        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-8">
                            <div className="flex flex-1 justify-between sm:hidden">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Showing <span className="font-medium">{(currentPage - 1) * PRODUCTS_PER_PAGE + 1}</span> to{" "}
                                        <span className="font-medium">
                                            {Math.min(currentPage * PRODUCTS_PER_PAGE, filteredProducts.length)}
                                        </span>{" "}
                                        of <span className="font-medium">{filteredProducts.length}</span> results
                                    </p>
                                </div>
                                <div>
                                    <nav
                                        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                                        aria-label="Pagination"
                                    >
                                        <button
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                                        >
                                            <span className="sr-only">Previous</span>
                                            <ChevronLeftIcon className="size-5" aria-hidden="true" />
                                        </button>

                                        {Array.from({ length: totalPages }, (_, idx) => {
                                            const page = idx + 1;
                                            return (
                                                <button
                                                    key={page}
                                                    onClick={() => handlePageChange(page)}
                                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 ${page === currentPage
                                                        ? "z-10 bg-indigo-600 text-white"
                                                        : "text-gray-900 hover:bg-gray-50"
                                                        }`}
                                                >
                                                    {page}
                                                </button>
                                            );
                                        })}

                                        <button
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                                        >
                                            <span className="sr-only">Next</span>
                                            <ChevronRightIcon className="size-5" aria-hidden="true" />
                                        </button>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    )
                }

            </div >
        </>
    );
}
