
import { useEffect, useState } from "react";
import axios from "axios";

import ProductCard from "./ProductCard";
import "./ProductList.css";

const API_URL = "https://fakestoreapi.com/products";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [retry, setRetry] = useState(0);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchProducts() {
            try {
                setLoading(true);
                setError(null);

                const response = await axios.get(API_URL, {
                    signal: controller.signal
                });

                setProducts(response.data);
            } catch (err) {
                if (!controller.signal.aborted) {
                    console.error(err);
                    setError("Não foi possível carregar os produtos.");
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        fetchProducts();

        return () => controller.abort();
    }, [retry]);

    const handleViewDetails = (product) => {
        console.log("Produto selecionado:", product);
    };

    if (loading) {
        return (
            <div className="product-state">
                <div className="product-spinner"></div>
                <p>Carregando produtos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="product-state">
                <p>{error}</p>

                <button onClick={() => setRetry((prev) => prev + 1)}>
                    Tentar novamente
                </button>
            </div>
        );
    }

    if (!products.length) {
        return (
            <div className="product-state">
                <p>Nenhum produto encontrado.</p>
            </div>
        );
    }

    return (
        <section className="products-container">

            <header className="products-header">
                <div>
                    <h1>Nossos produtos</h1>
                    <p>Confira nossa seleção de produtos.</p>
                </div>

                <span className="products-count">
                    {products.length} produtos
                </span>
            </header>

            <div className="products-grid">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onViewDetails={handleViewDetails}
                    />
                ))}
            </div>

        </section>
    );
}
