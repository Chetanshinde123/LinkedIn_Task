
import { fetchProductById } from "@/app/lib/api";
import { Star, ArrowLeft } from "lucide-react";
import NavBar from "../../../component";
import Link from "next/link";
import { PageProps } from "@/app/types";
import { EventEmitter } from "events";
EventEmitter.defaultMaxListeners = 20;


export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    if (!id) {
        return (
            <div className="text-center py-20">
                <Link
                    href="/products"
                    className="mx-auto flex w-fit items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-gray-700 transition-all hover:gap-3 hover:bg-gray-200"
                >
                    <ArrowLeft size={18} />
                    <span>Back to Products</span>
                </Link>
                <p className="mt-6 text-red-500">Product ID is missing</p>
            </div>
        );
    }

    try {
        const product = await fetchProductById(id);

        return (
            <>
                <NavBar />
                <div className="p-6 md:p-12 max-w-6xl mx-auto">
                    {/* Back button with subtle animation */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors duration-200 mb-6 group"
                    >
                        <ArrowLeft
                            size={20}
                            className="group-hover:-translate-x-1 transition-transform duration-200"
                        />
                        <span className="text-sm font-medium">Back to Products</span>
                    </Link>

                    {/* Product Content Grid */}
                    <div className="grid gap-12 md:grid-cols-2">
                        {/* Image Gallery */}
                        <div className="space-y-4">
                            <div className="overflow-hidden rounded-xl bg-white shadow-md">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="h-[400px] w-full object-contain transition-transform duration-500 hover:scale-105"
                                />
                            </div>

                            {/* Thumbnail Gallery */}
                            <div className="flex gap-3">
                                {[...Array(3)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="cursor-pointer overflow-hidden rounded-md border transition-all hover:border-black hover:shadow-sm"
                                    >
                                        <img
                                            src={product.image}
                                            alt={`Thumbnail ${i + 1}`}
                                            className="h-20 w-20 object-cover transition-transform duration-300 hover:scale-110"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="space-y-5">
                            <h1 className="text-3xl font-bold tracking-tight">{product.title}</h1>
                            <p className="text-lg capitalize text-gray-600">{product.category}</p>

                            {/* Rating */}
                            <div className="flex items-center gap-2">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={20}
                                            fill={i < Math.round(product.rating.rate) ? "currentColor" : "none"}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-500">
                                    ({product.rating.count} reviews)
                                </span>
                            </div>

                            {/* Price */}
                            <p className="text-3xl font-bold text-green-600">${product.price}</p>

                            {/* Color Selector */}
                            <div className="pt-2">
                                <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-500">
                                    Color
                                </h4>
                                <div className="flex gap-3">
                                    {['bg-red-500', 'bg-blue-500', 'bg-yellow-400'].map((color) => (
                                        <button
                                            key={color}
                                            className={`h-8 w-8 rounded-full ${color} border-2 border-transparent ring-1 ring-gray-200 transition-all hover:border-black hover:ring-black`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Size Selector */}
                            <div className="pt-4">
                                <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-500">
                                    Size
                                </h4>
                                <div className="flex gap-3">
                                    {["S", "M", "L", "XL"].map((size) => (
                                        <button
                                            key={size}
                                            className="h-10 w-10 rounded border font-medium transition-all hover:border-black hover:bg-black hover:text-white"
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="pt-4">
                                <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-500">
                                    Description
                                </h4>
                                <p className="text-gray-700">{product.description}</p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-6">
                                {/* Add to Cart Button */}
                                <div className="flex gap-6">
                                    {/* Button 1: Add to Cart */}
                                    <button
                                        className="relative flex items-center justify-center w-[150px] h-[50px] px-6 overflow-hidden font-medium transition-all bg-indigo-500 rounded-xl group"
                                    >
                                        <span
                                            className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4"
                                        >
                                            <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                                        </span>
                                        <span
                                            className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4"
                                        >
                                            <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                                        </span>
                                        <span
                                            className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0"
                                        ></span>
                                        <span className="relative text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                                            Add to Cart
                                        </span>
                                    </button>

                                    {/* Button 2 */}
                                    <button className="w-[150px] h-[50px] flex items-center justify-center bg-black rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-white">
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    } catch (error) {
        return (
            <div className="text-center py-20">
                <Link
                    href="/products"
                    className="mx-auto flex w-fit items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-gray-700 transition-all hover:gap-3 hover:bg-gray-200"
                >
                    <ArrowLeft size={18} />
                    <span>Back to Products</span>
                </Link>
                <p className="mt-6 text-red-500">Product not found</p>
            </div>
        );
    }
}